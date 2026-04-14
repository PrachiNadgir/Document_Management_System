function DocumentCard({ document, onView }) {
  const sentimentStyles = {
    Positive: 'bg-emerald-100 text-emerald-700',
    Neutral: 'bg-amber-100 text-amber-700',
    Negative: 'bg-rose-100 text-rose-700',
  }

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600">
              {document.category}
            </span>
            <span className={`rounded-full px-3 py-1 font-medium ${sentimentStyles[document.sentiment]}`}>
              {document.sentiment}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{document.title}</h3>
            <p className="text-sm text-slate-500">Uploaded {document.uploadDate}</p>
          </div>
          <p className="text-sm leading-6 text-slate-600">{document.summary}</p>
        </div>
        <div className="flex flex-wrap gap-3 xl:justify-end">
          <button
            type="button"
            onClick={() => onView(document.id)}
            className="rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-white"
          >
            View
          </button>
          <button
            type="button"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700"
          >
            Share
          </button>
          <button
            type="button"
            className="rounded-full border border-rose-200 px-4 py-2 text-sm font-medium text-rose-600"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}

export default DocumentCard
