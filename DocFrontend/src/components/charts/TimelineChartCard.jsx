import ChartCard from './ChartCard'

function TimelineChartCard({ items }) {
  const maxValue = Math.max(...items.map((item) => item.value))

  return (
    <ChartCard title="Uploads over time" subtitle="Timeline placeholder">
      <div className="space-y-4 pt-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-4">
            <span className="w-8 text-sm text-stone-500">{item.label}</span>
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-stone-500">{item.value}</span>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}

export default TimelineChartCard
