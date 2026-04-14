import BarChartCard from '../components/charts/BarChartCard'
import PieChartCard from '../components/charts/PieChartCard'
import TimelineChartCard from '../components/charts/TimelineChartCard'
import WordCloudCard from '../components/charts/WordCloudCard'
import FilterDropdown from '../components/ui/FilterDropdown'
import { analyticsData, filterOptions } from '../data/mockData'
import { useNavigate } from 'react-router-dom'

function AnalyticsPage({ filters,onFilterChange }) {
  const navigate = useNavigate();
  return (
    <div className="grid gap-6 lg:grid-cols-[264px_minmax(0,1fr)]">
      <aside className="rounded-[1.8rem] bg-[#171d31] p-4 text-white shadow-[0_28px_70px_-40px_rgba(15,23,42,0.85)] sm:p-5">
        <p className="px-2 text-[11px] uppercase tracking-[0.35em] text-slate-400">Workspace filters</p>
        <h2 className="px-2 pt-3 text-[1.7rem] font-semibold leading-tight text-white sm:text-[2rem]">
          Refine your document view
        </h2>

        <div className="mt-8 space-y-4">
          <FilterDropdown
            label="Categories"
            value={filters.category}
            options={filterOptions.category}
            onChange={(value) => onFilterChange({ ...filters, category: value })}
            variant="dark"
          />
          <FilterDropdown
            label="Sentiment"
            value={filters.sentiment}
            options={filterOptions.sentiment}
            onChange={(value) => onFilterChange({ ...filters, sentiment: value })}
            variant="dark"
          />
          <FilterDropdown
            label="Date range"
            value={filters.dateRange}
            options={filterOptions.dateRange}
            onChange={(value) => onFilterChange({ ...filters, dateRange: value })}
            variant="dark"
          />
        </div>

        <div className="mt-8">
          <p className="px-2 text-[11px] uppercase tracking-[0.35em] text-slate-400">Quick actions</p>
          <div className="mt-4 space-y-3">
            <button
              type="button"
              onClick={() => navigate('/upload')}
              className="w-full rounded-2xl bg-[#5a9be0] px-4 py-3 text-sm font-semibold text-white"
            >
              Upload document
            </button>
            <button
              type="button"
              onClick={() => navigate('/collaboration')}
              className="w-full rounded-2xl border border-slate-600 bg-[#283047] px-4 py-3 text-sm font-semibold text-white"
            >
              View shared docs
            </button>
            <button
              type="button"
              className="w-full rounded-2xl border border-slate-600 bg-[#283047] px-4 py-3 text-sm font-semibold text-white"
            >
              Open analytics
            </button>
          </div>
        </div>
      </aside>

      <div className="space-y-5">
        <section className="rounded-[2rem] border border-[#f0e1b0] bg-[linear-gradient(135deg,#fff4c6_0%,#fff7da_35%,#fffaf0_100%)] px-5 py-6">
          <p className="text-xs uppercase tracking-[0.35em] text-[#cb8d2d]">Analytics</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 sm:text-[2.25rem]">
            Visual insights for your workspace
          </h1>
          <p className="mt-4 max-w-4xl text-[15px] leading-7 text-stone-500">
            These chart placeholders mirror category, sentiment, timeline, and keyword views.
            They are ready to be swapped for Recharts or Chart.js when you want real visualizations.
          </p>
          <p className="mt-5 text-sm text-stone-400">
            Active filters: {filters.category}, {filters.sentiment}, {filters.dateRange}
          </p>
        </section>

        <div className="grid gap-5 xl:grid-cols-2">
          <PieChartCard items={analyticsData.categories} />
          <BarChartCard items={analyticsData.sentiment} />
          <TimelineChartCard items={analyticsData.uploads} />
          <WordCloudCard words={analyticsData.keywords} />
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage
