import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import { userDataContext } from "../Context/userDataContext";

function DocumentDetailPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { serverURL } = useContext(userDataContext);
  const [documentData, setDocumentData] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [asking, setAsking] = useState(false);
  const [error, setError] = useState("");
  const requestedAnalysisId = searchParams.get("analysisId");

  useEffect(() => {
    let isMounted = true;
    let pollTimeout = null;

    const loadDocument = async (showLoader = true) => {
      if (showLoader) {
        setLoading(true);
      }
      setError("");

      try {
        const documentPromise = axios.get(`${serverURL}/api/documents/${id}`, {
          withCredentials: true,
        });

        const analysisPromise = requestedAnalysisId
          ? axios.get(`${serverURL}/api/analysis/${requestedAnalysisId}`, {
              withCredentials: true,
            })
          : axios.get(`${serverURL}/api/analysis?documentId=${id}&limit=1`, {
              withCredentials: true,
            });

        const [documentRes, analysisRes] = await Promise.all([
          documentPromise,
          analysisPromise,
        ]);

        if (!isMounted) return;

        const loadedDocument = documentRes.data?.data?.document || null;
        let loadedAnalysis = requestedAnalysisId
          ? analysisRes.data?.data?.analysis || null
          : analysisRes.data?.data?.analyses?.[0] || null;

        if (!requestedAnalysisId && loadedAnalysis?._id) {
          const analysisDetailRes = await axios.get(
            `${serverURL}/api/analysis/${loadedAnalysis._id}`,
            { withCredentials: true }
          );
          loadedAnalysis = analysisDetailRes.data?.data?.analysis || loadedAnalysis;
        }

        setDocumentData(loadedDocument);
        setAnalysis(loadedAnalysis);
        setAnswer(loadedAnalysis?.qaHistory?.at(-1)?.answer || "");

        if (loadedAnalysis?.status === "processing") {
          pollTimeout = setTimeout(() => loadDocument(false), 2500);
        }
      } catch (loadError) {
        if (!isMounted) return;
        setError(
          loadError.response?.data?.message ||
            "Failed to load document details."
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadDocument();

    return () => {
      isMounted = false;
      if (pollTimeout) {
        clearTimeout(pollTimeout);
      }
    };
  }, [id, requestedAnalysisId, serverURL]);

  const textParagraphs = useMemo(() => {
    const text = String(documentData?.extractedText || "").trim();
    if (!text) return [];
    return text.split(/\n\s*\n/).filter(Boolean);
  }, [documentData?.extractedText]);

  const highlightTerms = useMemo(
    () => buildHighlightTerms(analysis),
    [analysis]
  );

  const sentimentBreakdown = [
    { label: "Positive", value: analysis?.sentiment?.positive || 0 },
    { label: "Neutral", value: analysis?.sentiment?.neutral || 0 },
    { label: "Negative", value: analysis?.sentiment?.negative || 0 },
  ];

  const handleAsk = async () => {
    if (!analysis?._id || !question.trim()) return;

    setAsking(true);

    try {
      const response = await axios.post(
        `${serverURL}/api/analysis/${analysis._id}/qa`,
        { question },
        { withCredentials: true }
      );

      setAnswer(response.data?.data?.answer || "");
      setQuestion("");
    } catch (askError) {
      setAnswer(
        askError.response?.data?.message || "Could not answer that question."
      );
    } finally {
      setAsking(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-stone-500">Loading document...</div>;
  }

  if (error || !documentData) {
    return (
      <div className="p-6 text-center text-red-500">
        {error || "Document not found"}
      </div>
    );
  }

  const highlightLegend = [
    { label: "Highlights on", tone: "border border-stone-200 bg-[#f7f4ee] text-stone-600" },
    { label: "Positive", tone: "bg-emerald-50 text-emerald-600" },
    { label: "Negative", tone: "bg-rose-50 text-rose-600" },
    { label: "Key phrase", tone: "bg-sky-50 text-sky-600" },
    { label: "Entity", tone: "bg-amber-50 text-amber-600" },
  ];

  const resultCards = [
    {
      title: "Summary",
      body: (
        <p className="mt-4 text-base leading-9 text-stone-700">
          {analysis?.status === "processing"
            ? "Summary is being generated..."
            : analysis?.summary || "Summary is not available yet."}
        </p>
      ),
    },
    {
      title: "Sentiment",
      body: (
        <div className="mt-5 space-y-4">
          {sentimentBreakdown.map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex justify-between text-sm">
                <span>{item.label}</span>
                <span>{item.value}%</span>
              </div>
              <div className="h-2 rounded bg-gray-200">
                <div
                  className="h-full rounded bg-blue-500"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Categories",
      body: (
        <div className="mt-4 flex flex-wrap gap-2">
          {(analysis?.categories?.length
            ? analysis.categories
            : [
                analysis?.status === "processing"
                  ? "Categories are being generated..."
                  : "No categories yet",
              ]).map((item) => (
            <span key={item} className="rounded-full bg-gray-100 px-3 py-1">
              {item}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: "Keywords",
      body: (
        <div className="mt-4 flex flex-wrap gap-2">
          {(analysis?.keywords?.length
            ? analysis.keywords
            : [
                analysis?.status === "processing"
                  ? "Keywords are being generated..."
                  : "No keywords yet",
              ]).map((item) => (
            <span key={item} className="rounded-full bg-sky-100 px-3 py-1">
              {item}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: "Entities",
      body: (
        <div className="mt-4 flex flex-wrap gap-2">
          {(analysis?.entities?.length
            ? analysis.entities
            : [
                {
                  value:
                    analysis?.status === "processing"
                      ? "Entities are being generated..."
                      : "No entities yet",
                },
              ]).map((item) => (
            <span
              key={item.value}
              className="rounded-full bg-blue-100 px-3 py-1"
            >
              {item.value}
            </span>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_350px]">
      <section className="space-y-6">
        <div className="rounded-xl border bg-white p-6">
          <h1 className="text-3xl font-bold">Document Analysis</h1>

          <p className="mt-2 text-gray-500">
            {documentData.originalName} |{" "}
            {new Date(documentData.createdAt).toLocaleDateString()}
          </p>

          {analysis?.status === "processing" ? (
            <p className="mt-3 text-sm text-amber-600">
              Analysis is still running. Results will appear automatically.
            </p>
          ) : null}

          {analysis?.status === "failed" ? (
            <p className="mt-3 text-sm text-rose-600">
              {analysis.errorMessage || "Analysis failed."}
            </p>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-2">
            {highlightLegend.map((item) => (
              <span
                key={item.label}
                className={`rounded-full px-3 py-1 text-sm ${item.tone}`}
              >
                {item.label}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6">
          {textParagraphs.length > 0 ? (
            textParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className="mb-4 whitespace-pre-wrap leading-8 text-stone-700"
              >
                {renderHighlightedParagraph(paragraph, highlightTerms)}
              </p>
            ))
          ) : (
            <p className="text-stone-500">
              No extracted text is available for this document yet.
            </p>
          )}
        </div>

        <div className="rounded-xl border bg-white p-6">
          <h2 className="text-xl font-semibold">Ask about this document</h2>

          <input
            placeholder="Ask something..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="mt-4 w-full rounded border p-3"
          />

          <button
            onClick={handleAsk}
            disabled={!analysis?._id || asking}
            className="mt-3 rounded bg-blue-600 px-5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {asking ? "Asking..." : "Ask"}
          </button>

          {answer ? (
            <div className="mt-4 rounded-xl bg-stone-50 p-4 text-sm leading-7 text-stone-700">
              {answer}
            </div>
          ) : null}
        </div>
      </section>

      <aside className="space-y-4">
        <h2 className="text-xl font-semibold">Analysis Results</h2>

        {resultCards.map((card) => (
          <div key={card.title} className="rounded-xl border bg-white p-4">
            <h3 className="font-semibold">{card.title}</h3>
            {card.body}
          </div>
        ))}
      </aside>
    </div>
  );
}

export default DocumentDetailPage;

function buildHighlightTerms(analysis) {
  const terms = [];

  for (const keyword of analysis?.keywords || []) {
    if (keyword) {
      terms.push({
        value: keyword,
        kind: "keyword",
        className: "rounded px-1 bg-sky-50 text-sky-700",
      });
    }
  }

  for (const entity of analysis?.entities || []) {
    if (entity?.value) {
      terms.push({
        value: entity.value,
        kind: "entity",
        className: "rounded px-1 bg-amber-50 text-amber-700",
      });
    }
  }

  for (const word of POSITIVE_WORDS) {
    terms.push({
      value: word,
      kind: "positive",
      className: "rounded px-1 bg-emerald-50 text-emerald-700",
      wholeWord: true,
    });
  }

  for (const word of NEGATIVE_WORDS) {
    terms.push({
      value: word,
      kind: "negative",
      className: "rounded px-1 bg-rose-50 text-rose-700",
      wholeWord: true,
    });
  }

  return dedupeHighlightTerms(terms).sort((a, b) => b.value.length - a.value.length);
}

function dedupeHighlightTerms(terms) {
  const seen = new Set();

  return terms.filter((term) => {
    const key = `${term.kind}:${String(term.value).toLowerCase()}`;
    if (!term.value || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function renderHighlightedParagraph(text, terms) {
  if (!terms.length) return text;

  const segments = [];
  let cursor = 0;

  while (cursor < text.length) {
    const match = findNextHighlight(text, cursor, terms);

    if (!match) {
      segments.push(text.slice(cursor));
      break;
    }

    if (match.start > cursor) {
      segments.push(text.slice(cursor, match.start));
    }

    segments.push(
      <span key={`${match.start}-${match.end}-${match.term.kind}`} className={match.term.className}>
        {text.slice(match.start, match.end)}
      </span>
    );

    cursor = match.end;
  }

  return segments;
}

function findNextHighlight(text, fromIndex, terms) {
  const lower = text.toLowerCase();
  let bestMatch = null;

  for (const term of terms) {
    const termLower = term.value.toLowerCase();
    let start = lower.indexOf(termLower, fromIndex);

    while (start !== -1) {
      const end = start + termLower.length;

      if (!term.wholeWord || isWholeWordBoundary(text, start, end)) {
        if (
          !bestMatch ||
          start < bestMatch.start ||
          (start === bestMatch.start && end - start > bestMatch.end - bestMatch.start)
        ) {
          bestMatch = { start, end, term };
        }
        break;
      }

      start = lower.indexOf(termLower, start + 1);
    }
  }

  return bestMatch;
}

function isWholeWordBoundary(text, start, end) {
  const prev = start > 0 ? text[start - 1] : "";
  const next = end < text.length ? text[end] : "";
  return !/[A-Za-z0-9]/.test(prev) && !/[A-Za-z0-9]/.test(next);
}

const POSITIVE_WORDS = [
  "good",
  "great",
  "excellent",
  "strong",
  "smooth",
  "reliable",
  "effective",
  "helpful",
  "clear",
  "improved",
  "positive",
  "success",
  "efficient",
];

const NEGATIVE_WORDS = [
  "bad",
  "poor",
  "unsatisfactory",
  "frustrating",
  "difficult",
  "unreliable",
  "incomplete",
  "errors",
  "glitches",
  "confusing",
  "disappointing",
  "waste",
  "negative",
  "failed",
  "short",
];
