import { useNavigate } from 'react-router-dom'
function LibraryPage({ documents = [], loading = false }) {
  const navigate = useNavigate();
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-stone-950 sm:text-5xl">Document library</h1>
          <p className="mt-3 text-base text-stone-500 sm:text-lg">All your analysed documents</p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/upload')}
          className="rounded-2xl bg-[#1d1a14] px-6 py-4 text-sm font-semibold text-white"
        >
          + New analysis
        </button>
      </div>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {!loading && documents.length === 0 ? (
          <div className="rounded-[1.8rem] border border-stone-200 bg-white p-8 text-stone-500">
            No documents found yet. Upload your first file to start analysing.
          </div>
        ) : null}
        {documents.map((document) => (
          <button
            key={document.id}
            type="button"
            onClick={() => navigate(`/document/${document.id}`)}
            className="rounded-[1.8rem] border border-stone-200 bg-white p-6 text-left transition hover:-translate-y-0.5 hover:shadow-md sm:p-8"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f7f4ee] text-sm font-semibold text-stone-500">
              {document.type}
            </div>
            <h2 className="mt-7 break-words text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">{document.title}</h2>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full bg-amber-50 px-3 py-1 text-sm text-amber-600">
                {document.mode}
              </span>
              <span className="text-sm text-stone-400">{document.uploadDate}</span>
            </div>
          </button>
        ))}
      </section>
    </div>
  )
}

export default LibraryPage
