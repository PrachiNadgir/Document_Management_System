import { analysisSummary, highlightedParagraphs } from '../data/mockData'

function DocumentDetailPage({ activeDocument }) {
  const highlightLegend = [
    { label: 'Highlights on', tone: 'border border-stone-200 bg-[#f7f4ee] text-stone-600', dot: '' },
    { label: 'Positive', tone: 'bg-emerald-50 text-emerald-600', dot: 'bg-emerald-500' },
    { label: 'Negative', tone: 'bg-rose-50 text-rose-600', dot: 'bg-rose-500' },
    { label: 'Key phrase', tone: 'bg-sky-50 text-sky-600', dot: 'bg-sky-500' },
    { label: 'Entity', tone: 'bg-amber-50 text-amber-600', dot: 'bg-amber-500' },
  ]

  const resultCards = [
    {
      title: 'Summary',
      accent: 'text-amber-700',
      iconBg: 'bg-amber-50',
      iconBorder: 'border-amber-200',
      body: (
        <p className="mt-4 text-base leading-9 text-stone-700">{analysisSummary.summary}</p>
      ),
    },
    {
      title: 'Sentiment',
      accent: 'text-rose-600',
      iconBg: 'bg-rose-50',
      iconBorder: 'border-rose-200',
      body: (
        <>
          <div className="mt-5 space-y-4">
            {analysisSummary.sentimentBreakdown.map((item) => {
              const [barTone, textTone] = item.tone.split(' ')

              return (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className={`font-medium ${textTone}`}>{item.label}</span>
                    <span className="text-stone-500">{item.value}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-stone-100">
                    <div className={`h-full rounded-full ${barTone}`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
          <p className="mt-5 text-sm font-medium text-emerald-600">Overall: Predominantly positive</p>
        </>
      ),
    },
    {
      title: 'Categories',
      accent: 'text-teal-700',
      iconBg: 'bg-teal-50',
      iconBorder: 'border-teal-200',
      body: (
        <div className="mt-4 flex flex-wrap gap-3">
          {analysisSummary.categories.map((item) => (
            <span key={item} className="rounded-full bg-[#f7f4ee] px-4 py-2 text-sm text-stone-700">
              {item}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: 'Key entities',
      accent: 'text-violet-700',
      iconBg: 'bg-violet-50',
      iconBorder: 'border-violet-200',
      body: (
        <div className="mt-4 flex flex-wrap gap-3">
          {analysisSummary.entities.map((item) => (
            <span key={item} className="rounded-full bg-[#eef2ff] px-4 py-2 text-sm text-[#2f67e9]">
              {item}
            </span>
          ))}
        </div>
      ),
    },
  ]

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <section className="space-y-6">
        <div className="flex flex-col gap-5 rounded-[1.8rem] border border-stone-200 bg-[#fbfaf7] p-5 shadow-[0_20px_60px_-50px_rgba(15,23,42,0.2)] sm:p-8 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-stone-950 sm:text-5xl">Document analysis</h1>
            <p className="mt-3 break-words text-base text-stone-500 sm:text-lg">
              {activeDocument.title} | 42KB | Uploaded just now
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              {highlightLegend.map((item) => (
                <span
                  key={item.label}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-medium ${item.tone}`}
                >
                  {item.dot ? <span className={`h-2 w-2 rounded-full ${item.dot}`} /> : null}
                  {item.label}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-600 shadow-sm">
              OK Analysed
            </span>
            <button
              type="button"
              className="rounded-2xl border border-stone-200 bg-white px-5 py-3 text-sm font-medium text-stone-700"
            >
              Export PDF
            </button>
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-stone-200 bg-white p-5 text-base leading-8 text-stone-700 shadow-[0_18px_48px_-42px_rgba(15,23,42,0.28)] sm:p-8 sm:text-xl sm:leading-10">
          {highlightedParagraphs.map((paragraph, index) => (
            <p key={index} className={index === 0 ? '' : 'mt-7'}>
              {paragraph.map((part, partIndex) => (
                <span
                  key={`${index}-${partIndex}`}
                  className={part.tone ? `rounded-[0.45rem] px-1.5 py-0.5 ${part.tone}` : ''}
                >
                  {part.text}
                </span>
              ))}
            </p>
          ))}
        </div>

        <div className="rounded-[1.8rem] border border-stone-200 bg-white p-5 shadow-[0_18px_48px_-42px_rgba(15,23,42,0.28)] sm:p-8">
          <h2 className="flex items-center gap-3 text-2xl font-semibold text-stone-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#eef2ff] text-[#2f67e9]">
              ?
            </span>
            Ask a question about this document
          </h2>
          <div className="mt-6 rounded-2xl bg-[#f7f4ee] p-4 text-sm text-stone-600 sm:text-base">
            Hello! I&apos;ve analysed your document. Ask me anything about it: key metrics,
            specific sections, or anything you&apos;re curious about.
          </div>
          <div className="mt-5 flex flex-col gap-3 lg:flex-row">
            <input
              type="text"
              placeholder="What drove the revenue growth?"
              className="flex-1 rounded-2xl border border-stone-200 bg-white px-5 py-4 text-base outline-none focus:border-[#2f67e9]"
            />
            <button
              type="button"
              className="rounded-2xl bg-[#2f67e9] px-6 py-4 text-base font-semibold text-white lg:self-start"
            >
              Ask
            </button>
          </div>
        </div>
      </section>

      <aside className="space-y-5">
        <section className="rounded-[1.8rem] border border-stone-200 bg-white p-5 shadow-[0_18px_48px_-42px_rgba(15,23,42,0.28)] sm:p-6">
          <h3 className="text-2xl font-semibold text-stone-900">Analysis results</h3>
        </section>
        {resultCards.map((card) => (
          <section
            key={card.title}
            className="rounded-[1.8rem] border border-stone-200 bg-white p-5 shadow-[0_18px_48px_-42px_rgba(15,23,42,0.28)] sm:p-6"
          >
            <h4 className="flex items-center gap-3 text-xl font-semibold text-stone-900">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-xl border text-xs font-bold ${card.iconBg} ${card.iconBorder} ${card.accent}`}
              >
                {card.title.slice(0, 1)}
              </span>
              {card.title}
            </h4>
            {card.body}
          </section>
        ))}
      </aside>
    </div>
  )
}

export default DocumentDetailPage
