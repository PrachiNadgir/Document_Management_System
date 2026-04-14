import ChartCard from './ChartCard'

function WordCloudCard({ words }) {
  return (
    <ChartCard title="Keywords" subtitle="Word cloud placeholder">
      <div className="flex flex-wrap gap-3 pt-2">
        {words.map((word, index) => (
          <span
            key={word}
            className="rounded-full bg-slate-100 px-4 py-2 text-stone-600"
            style={{ fontSize: `${0.9 + (index % 4) * 0.2}rem` }}
          >
            {word}
          </span>
        ))}
      </div>
    </ChartCard>
  )
}

export default WordCloudCard
