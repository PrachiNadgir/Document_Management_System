import ChartCard from './ChartCard'

function BarChartCard({ items }) {
  return (
    <ChartCard title="Sentiment analysis" subtitle="Bar chart placeholder">
      <div className="flex min-h-48 items-end gap-4 pt-2">
        {items.map((item) => (
          <div key={item.label} className="flex flex-1 flex-col items-center gap-3">
            <div className="flex h-40 w-full items-end rounded-[1.6rem] bg-slate-100 px-2">
              <div
                className="w-full rounded-t-[1.4rem] bg-gradient-to-t from-[#0b1730] via-[#24508e] to-[#5da3ea]"
                style={{ height: `${item.value}%` }}
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-stone-700">{item.label}</p>
              <p className="text-xs text-stone-400">{item.value}%</p>
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}

export default BarChartCard
