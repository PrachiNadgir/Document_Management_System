import { pricingTiers } from '../data/mockData'

function PricingPage() {
  return (
    <div className="px-4 py-14 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-400">Pricing</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-stone-950 sm:text-5xl">
          Start free, scale when ready
        </h1>
        <p className="mt-5 text-lg text-stone-500 sm:text-xl">No credit card needed. Upgrade anytime.</p>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <article
              key={tier.name}
              className={`relative rounded-[2rem] border bg-white p-6 sm:p-8 ${
                tier.featured ? 'border-[#2f67e9] shadow-[0_0_0_2px_rgba(47,103,233,0.1)]' : 'border-stone-200'
              }`}
            >
              {tier.featured ? (
                <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2f67e9] px-4 py-2 text-sm font-semibold text-white">
                  Most popular
                </span>
              ) : null}
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">{tier.name}</p>
              <div className="mt-5 flex items-end gap-2">
                <span className="text-4xl font-black tracking-tight text-stone-950 sm:text-6xl">{tier.price}</span>
                <span className="pb-1 text-base text-stone-500 sm:pb-2 sm:text-lg">{tier.meta}</span>
              </div>
              <p className="mt-3 text-base text-stone-500 sm:text-lg">{tier.description}</p>
              <div className="mt-8 space-y-4">
                {tier.features.map((feature) => (
                  <div key={feature} className="border-b border-stone-100 pb-4 text-base text-stone-700">
                    {feature}
                  </div>
                ))}
              </div>
              <button
                type="button"
                className={`mt-8 w-full rounded-2xl px-5 py-4 text-base font-semibold ${
                  tier.featured ? 'bg-[#2f67e9] text-white' : 'border border-stone-200 text-stone-800'
                }`}
              >
                {tier.cta}
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PricingPage
