const fetch = require("node-fetch");

const HF_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

/* ---------------- SUMMARY ---------------- */
const summariseDocument = async (text) => {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: text.slice(0, 1000),
        }),
      }
    );

    const data = await response.json();

    // Debug (remove later)
    console.log("HF SUMMARY RESPONSE:", data);

    if (Array.isArray(data) && data[0]?.summary_text) {
      return data[0].summary_text;
    }

    return fallbackSummary(text);

  } catch (err) {
    console.error("HF summary error:", err);
    return fallbackSummary(text);
  }
};

/* ---------------- SENTIMENT ---------------- */
const analyseSentiment = async (text) => {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: text.slice(0, 500),
        }),
      }
    );

    const data = await response.json();

    console.log("HF SENTIMENT RESPONSE:", data);

    const result = data?.[0];
    if (!result) return fallbackSentiment();

    const score = Math.round(result.score * 100);

    if (result.label === "POSITIVE") {
      return {
        overall: "positive",
        positive: score,
        neutral: 0,
        negative: 100 - score,
      };
    } else {
      return {
        overall: "negative",
        positive: 100 - score,
        neutral: 0,
        negative: score,
      };
    }

  } catch (err) {
    console.error("HF sentiment error:", err);
    return fallbackSentiment();
  }
};

/* ---------------- KEYWORDS ---------------- */
const extractKeywords = async (text) => {
  return text.split(" ").slice(0, 6);
};

/* ---------------- HIGHLIGHTS ---------------- */
const highlightSentiment = async (text) => {
  const positive = ["good","great","excellent","smooth","helpful","fast"];
  const negative = ["bad","poor","slow","error","issue","difficult"];

  return text.split(/\s+/).map((word) => {
    const clean = word.toLowerCase().replace(/[^a-z]/g, "");

    if (positive.includes(clean)) {
      return { word, sentiment: "positive" };
    }

    if (negative.includes(clean)) {
      return { word, sentiment: "negative" };
    }

    return { word, sentiment: "neutral" };
  });
};

/* ---------------- TRANSLATE ---------------- */
const translateText = async (text) => text;

/* ---------------- READABILITY ---------------- */
const readabilityScore = (text) => {
  const words = text.split(/\s+/).length;
  const sentences = text.split(/[.!?]/).length;
  return Math.round((words / sentences) * 10) / 10;
};

/* ---------------- FALLBACKS ---------------- */

const fallbackSummary = (text) => {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim());
  return sentences.slice(0, 3).join(". ") + ".";
};

const fallbackSentiment = () => ({
  overall: "neutral",
  positive: 40,
  neutral: 40,
  negative: 20,
});

/* ---------------- EXPORT ---------------- */

module.exports = {
  summariseDocument,
  analyseSentiment,
  extractKeywords,
  highlightSentiment,
  translateText,
  readabilityScore,
};