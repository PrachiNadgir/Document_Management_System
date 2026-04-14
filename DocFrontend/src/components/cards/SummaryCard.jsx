function SummaryCard({ title, value, accent }) {
  return (
    <article className={`rounded-3xl p-5 text-white shadow-sm ${accent}`}>
      <p className="text-sm text-white/80">{title}</p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
    </article>
  )
}

export default SummaryCard
