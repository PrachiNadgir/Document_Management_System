import { dashboardStats } from '../data/mockData'
import { useNavigate } from 'react-router-dom'

function DashboardPage({ documents = [] }) {
  const navigate = useNavigate();
  return (
    <div className="space-y-7">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-stone-950 sm:text-5xl">Good morning</h1>
          <p className="mt-3 text-base text-stone-500 sm:text-lg">Here&apos;s what&apos;s happening with your documents</p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/upload')}
          className="rounded-2xl bg-[#1d1a14] px-6 py-4 text-sm font-semibold text-white"
        >
          + New analysis
        </button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <article key={stat.label} className="rounded-[1.8rem] border border-stone-200 bg-white p-6">
            <p className="text-4xl font-light tracking-tight text-stone-900 sm:text-5xl">{stat.value}</p>
            <p className="mt-2 text-base text-stone-500">{stat.label}</p>
            <p className={`mt-4 text-sm font-semibold ${stat.tone}`}>{stat.hint}</p>
          </article>
        ))}
      </section>

      <section className="overflow-hidden rounded-[1.8rem] border border-stone-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-stone-100 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-semibold text-stone-900">Recent documents</h2>
          <div className="flex flex-wrap gap-3 text-sm">
            {['All', 'Summarized', 'Sentiment'].map((tab, index) => (
              <button
                key={tab}
                type="button"
                className={`rounded-full px-4 py-2 ${
                  index === 0 ? 'bg-[#1d1a14] text-white' : 'border border-stone-200 text-stone-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#f7f4ee] text-left text-xs uppercase tracking-[0.2em] text-stone-400">
              <tr>
                <th className="px-6 py-4">Document</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Mode</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.slice(0, 5).map((document) => (
                <tr key={document.id} className="border-t border-stone-100">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-50 text-rose-400">
                        {document.type}
                      </div>
                      <span className="font-medium text-stone-800">{document.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="rounded-full bg-stone-100 px-3 py-1 text-sm text-stone-500">
                      {document.type}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-sm text-amber-600">
                      {document.mode}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-stone-500">{document.uploadDate}</td>
                  <td className="px-6 py-5">
                    <button
                      type="button"
                      onClick={() => navigate(`/document/${document.id}`)}
                      className="rounded-xl border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
