import ChartCard from './ChartCard'

function PieChartCard({ items }) {
  return (
    <ChartCard title="Category distribution" subtitle="Pie chart placeholder">
      <div className="space-y-3 pt-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className={`h-3 w-3 rounded-full ${item.color}`} />
            <span className="w-20 text-sm text-stone-500">{item.label}</span>
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }} />
            </div>
            <span className="text-sm font-medium text-stone-500">{item.value}%</span>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}

export default PieChartCard
