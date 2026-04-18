const axios = require('axios');
const { translateText } = require('./openaiService');

const HF_API = 'https://api-inference.huggingface.co/models';
const HF_ZERO_SHOT_MODELS = [
  'facebook/bart-large-mnli',
  'MoritzLaurer/deberta-v3-large-zeroshot-v2.0',
];
const HF_NER_MODELS = [
  'dslim/bert-base-NER',
  'Jean-Baptiste/roberta-large-ner-english',
];
const getHFHeaders = () => {
  const token = String(process.env.HUGGINGFACE_API_TOKEN || '').trim();
  const hasHFToken = !!token && token !== 'hf_...' && token.startsWith('hf_');

  return hasHFToken
    ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    : null;
};

const categoriseDocument = async (text, language = 'en') => {
  let snippet = text.slice(0, 1500);
  const candidateLabels = [
    'financial report',
    'legal document',
    'research paper',
    'news article',
    'product documentation',
    'marketing content',
    'medical document',
    'academic paper',
    'business proposal',
    'personal letter',
    'technical specification',
  ];

  const hfHeaders = getHFHeaders();
  if (!hfHeaders) return fallbackCategorise(text);

  if (language && language !== 'en') {
    try {
      snippet = await translateText(snippet, 'en');
    } catch (_error) {}
  }

  for (const model of HF_ZERO_SHOT_MODELS) {
    try {
      const response = await axios.post(
        `${HF_API}/${model}`,
        {
          inputs: snippet,
          parameters: { candidate_labels: candidateLabels, multi_label: true },
        },
        { headers: hfHeaders, timeout: 30000 }
      );

      const results = response.data;
      if (!results || !Array.isArray(results.labels) || !Array.isArray(results.scores)) {
        continue;
      }

      const categories = results.labels
        .map((label, i) => ({ label, score: results.scores[i] }))
        .filter((item) => typeof item.label === 'string' && typeof item.score === 'number')
        .filter((item) => item.score > 0.25)
        .slice(0, 4)
        .map((item) => item.label);

      if (categories.length > 0) {
        return categories;
      }
    } catch (err) {
      if (err.response?.status !== 404) {
        console.error(`HuggingFace categorisation error (${model}):`, err.message);
      }
    }
  }

  return fallbackCategorise(text);
};

const extractEntities = async (text, language = 'en') => {
  let snippet = text.slice(0, 512);

  const hfHeaders = getHFHeaders();
  if (!hfHeaders) return fallbackEntities(text);

  if (language && language !== 'en') {
    try {
      snippet = await translateText(snippet, 'en');
    } catch (_error) {}
  }

  for (const model of HF_NER_MODELS) {
    try {
      const response = await axios.post(
        `${HF_API}/${model}`,
        { inputs: snippet },
        { headers: hfHeaders, timeout: 30000 }
      );

      const entities = normalizeEntities(response.data);
      if (entities.length > 0) {
        return entities.slice(0, 10);
      }
    } catch (err) {
      if (err.response?.status !== 404) {
        console.error(`HuggingFace NER error (${model}):`, err.message);
      }
    }
  }

  return fallbackEntities(text);
};

const fallbackCategorise = (text) => {
  const lower = text.toLowerCase();
  const categories = [];

  if (/revenue|profit|quarter|fiscal|earnings|retention|yoy/.test(lower)) categories.push('financial report');
  if (/whereas|hereinafter|liability|agreement|clause|party/.test(lower)) categories.push('legal document');
  if (/abstract|methodology|hypothesis|conclusion|experiment/.test(lower)) categories.push('research paper');
  if (/product|feature|specification|api|integration|release/.test(lower)) categories.push('technical specification');
  if (/customer|market|campaign|brand|conversion/.test(lower)) categories.push('marketing content');
  if (/proposal|roadmap|timeline|deliverable|stakeholder/.test(lower)) categories.push('business proposal');

  return categories.length > 0 ? categories.slice(0, 4) : ['general document'];
};

const fallbackEntities = (text) => {
  const entities = [];
  const seen = new Set();

  const addEntity = (type, value) => {
    if (!value) return;
    const trimmed = value.trim();
    const key = `${type}:${trimmed.toLowerCase()}`;
    if (!trimmed || seen.has(key)) return;
    seen.add(key);
    entities.push({ type, value: trimmed });
  };

  const dates = text.match(/\b(Q[1-4]\s*\d{4}|\d{4}|(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4})\b/g);
  if (dates) dates.slice(0, 4).forEach((date) => addEntity('Date', date));

  const metrics = text.match(/\b\d+(?:\.\d+)?%|\$\d[\d,]*(?:\.\d+)?[BMK]?\b/g);
  if (metrics) metrics.slice(0, 4).forEach((metric) => addEntity('Metric', metric));

  const people = text.match(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g);
  if (people) people.slice(0, 4).forEach((person) => addEntity('Person', person));

  const regions = text.match(/\b(?:North America|South America|Europe|Asia Pacific|APAC|EMEA|LATAM|United States|India|China|Germany|France|UK)\b/g);
  if (regions) regions.slice(0, 4).forEach((region) => addEntity('Region', region));

  const orgs = text.match(/\b[A-Z][A-Za-z]+(?:\s[A-Z][A-Za-z]+)*\s(?:Inc|Ltd|LLC|Corp|Corporation|Company)\b/g);
  if (orgs) orgs.slice(0, 3).forEach((org) => addEntity('Organization', org));

  return entities.slice(0, 10);
};

function mergeEntityTokens(items) {
  const merged = [];

  for (const item of items) {
    if (!item || typeof item.word !== 'string') continue;

    const label = normalizeEntityLabel(item);
    const previous = merged[merged.length - 1];
    const currentWord = normalizeTokenWord(item.word);

    if (!currentWord) continue;

    if (previous && previous.label === label && shouldMergeEntity(previous, item, currentWord)) {
      if (item.word.startsWith('##')) {
        previous.word += currentWord;
      } else if (needsTightJoin(currentWord)) {
        previous.word += currentWord;
      } else {
        previous.word += ` ${currentWord}`;
      }

      if (typeof item.end === 'number') {
        previous.end = item.end;
      }
      continue;
    }

    merged.push({
      label,
      word: currentWord,
      start: typeof item.start === 'number' ? item.start : null,
      end: typeof item.end === 'number' ? item.end : null,
    });
  }

  return merged.map((item) => ({ entity_group: item.label, word: item.word }));
}

function shouldMergeEntity(previous, item, currentWord) {
  if (!previous || !item || !currentWord) return false;
  if (item.word.startsWith('##')) return true;
  if (hasContiguousOffsets(previous, item)) return true;
  if (needsTightJoin(currentWord)) return true;
  return isLikelyEntityContinuation(currentWord);
}

function hasContiguousOffsets(previous, item) {
  return (
    typeof previous.end === 'number' &&
    typeof item.start === 'number' &&
    item.start - previous.end <= 1
  );
}

function isLikelyEntityContinuation(word) {
  return /^[A-Z0-9][A-Za-z0-9.&'-]*$/.test(word);
}

function needsTightJoin(word) {
  return /^['’.-]/.test(word) || /^[,.;:!?)]$/.test(word);
}

function normalizeTokenWord(word) {
  return String(word || '')
    .replace(/^##/, '')
    .trim();
}

function normalizeEntityLabel(item) {
  return item.entity_group || item.entity?.replace('B-', '').replace('I-', '') || 'Entity';
}

function cleanEntityValue(value) {
  return String(value || '')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/\s+(['’.-])/g, '$1')
    .replace(/([(\[])\s+/g, '$1')
    .replace(/##/g, '')
    .trim();
}

function normalizeEntities(payload) {
  const typeMap = { PER: 'Person', ORG: 'Organization', LOC: 'Location', MISC: 'Topic' };
  const seen = new Set();
  const entities = [];
  const rawEntities = Array.isArray(payload) ? payload : [];
  const mergedEntities = mergeEntityTokens(rawEntities);

  for (const ent of mergedEntities) {
    const label = normalizeEntityLabel(ent);
    const value = cleanEntityValue(ent.word);
    const key = `${label}:${value.toLowerCase()}`;

    if (!value || seen.has(key)) continue;

    seen.add(key);
    entities.push({ type: typeMap[label] || label, value });
  }

  return entities;
}

module.exports = { categoriseDocument, extractEntities };
