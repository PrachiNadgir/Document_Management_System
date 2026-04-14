function UploadCard({ fileName, progress, previewText }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">Upload status</p>
          <p className="text-sm text-slate-500">{fileName || 'No file selected yet'}</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
          {progress}%
        </span>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-sky-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-5 rounded-2xl bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-900">Extracted text preview</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {previewText || 'Text preview will appear here before AI processing begins.'}
        </p>
      </div>
    </section>
  )
}

export default UploadCard
