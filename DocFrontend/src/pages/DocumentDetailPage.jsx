import { useParams } from "react-router-dom";
import { analysisSummary, highlightedParagraphs, documents } from "../data/mockData";

function DocumentDetailPage() {
  const { id } = useParams();

  // ✅ find document dynamically
  const activeDocument = documents.find(
    (doc) => doc.id.toString() === id
  );

  // ✅ fallback
  if (!activeDocument) {
    return (
      <div className="p-6 text-center text-red-500">
        Document not found
      </div>
    );
  }

  const highlightLegend = [
    { label: "Highlights on", tone: "border border-stone-200 bg-[#f7f4ee] text-stone-600" },
    { label: "Positive", tone: "bg-emerald-50 text-emerald-600", dot: "bg-emerald-500" },
    { label: "Negative", tone: "bg-rose-50 text-rose-600", dot: "bg-rose-500" },
    { label: "Key phrase", tone: "bg-sky-50 text-sky-600", dot: "bg-sky-500" },
    { label: "Entity", tone: "bg-amber-50 text-amber-600", dot: "bg-amber-500" },
  ];

  const resultCards = [
    {
      title: "Summary",
      body: (
        <p className="mt-4 text-base leading-9 text-stone-700">
          {analysisSummary.summary}
        </p>
      ),
    },
    {
      title: "Sentiment",
      body: (
        <div className="mt-5 space-y-4">
          {analysisSummary.sentimentBreakdown.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-2">
                <span>{item.label}</span>
                <span>{item.value}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded">
                <div
                  className="h-full bg-blue-500 rounded"
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
          {analysisSummary.categories.map((item) => (
            <span key={item} className="bg-gray-100 px-3 py-1 rounded-full">
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
          {analysisSummary.entities.map((item) => (
            <span key={item} className="bg-blue-100 px-3 py-1 rounded-full">
              {item}
            </span>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_350px]">

      {/* LEFT */}
      <section className="space-y-6">

        {/* HEADER */}
        <div className="border rounded-xl p-6 bg-white">
          <h1 className="text-3xl font-bold">Document Analysis</h1>

          <p className="mt-2 text-gray-500">
            {activeDocument.title} | {activeDocument.uploadDate}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {highlightLegend.map((item) => (
              <span
                key={item.label}
                className={`px-3 py-1 rounded-full text-sm ${item.tone}`}
              >
                {item.label}
              </span>
            ))}
          </div>
        </div>

        {/* DOCUMENT CONTENT */}
        <div className="border rounded-xl p-6 bg-white">
          {highlightedParagraphs.map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph.map((part, i) => (
                <span
                  key={i}
                  className={part.tone ? `px-1 ${part.tone}` : ""}
                >
                  {part.text}
                </span>
              ))}
            </p>
          ))}
        </div>

        {/* AI CHAT */}
        <div className="border rounded-xl p-6 bg-white">
          <h2 className="text-xl font-semibold">
            Ask about this document
          </h2>

          <input
            placeholder="Ask something..."
            className="mt-4 w-full border p-3 rounded"
          />

          <button className="mt-3 bg-blue-600 text-white px-5 py-2 rounded">
            Ask
          </button>
        </div>

      </section>

      {/* RIGHT SIDE */}
      <aside className="space-y-4">
        <h2 className="text-xl font-semibold">Analysis Results</h2>

        {resultCards.map((card) => (
          <div key={card.title} className="border rounded-xl p-4 bg-white">
            <h3 className="font-semibold">{card.title}</h3>
            {card.body}
          </div>
        ))}
      </aside>

    </div>
  );
}

export default DocumentDetailPage;