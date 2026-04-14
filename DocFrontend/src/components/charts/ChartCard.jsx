function ChartCard({ title, subtitle, children }) {
  return (
    <section className="rounded-[1.8rem] border border-stone-200 bg-white p-5 shadow-[0_20px_50px_-38px_rgba(15,23,42,0.35)]">
      <div className="mb-4">
        <h3 className="text-[1.1rem] font-semibold text-stone-800">{title}</h3>
        <p className="text-sm text-stone-400">{subtitle}</p>
      </div>
      {children}
    </section>
  )
}

export default ChartCard
