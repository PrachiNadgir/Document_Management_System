import { heroFeatures, pricingTiers, workflowSteps } from '../data/mockData'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/layout/Footer'

function HomePage({ }) {
  const navigate = useNavigate()

  return (
    <>
    <div className="px-4 py-8 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="border-b border-stone-200 pb-14 pt-8 text-center sm:pb-20 sm:pt-14">
          <p className="inline-flex rounded-full border border-[#d9def8] bg-[#f5f7ff] px-4 py-2 text-sm font-medium text-[#2f67e9]">
            AI-powered document intelligence
          </p>
          <h1 className="mx-auto mt-8 max-w-4xl text-4xl font-black leading-tight tracking-tight text-stone-950 sm:text-5xl lg:text-7xl">
            Understand any document,
            <span className="block text-[#2f67e9]">instantly</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-stone-500 sm:mt-8 sm:text-xl sm:leading-9">
            Upload a PDF, Word doc, or text file and get categorization, summaries, sentiment
            analysis, entity extraction, and more in seconds.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="rounded-2xl bg-[#1d1a14] px-8 py-4 text-base font-semibold text-white"
            >
              Start for free
            </button>
            <button
              type="button"
              onClick={() => navigate('/pricing')}
              className="rounded-2xl border border-stone-200 bg-white px-8 py-4 text-base font-medium text-stone-700"
            >
              See pricing
            </button>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
            {heroFeatures.map((item) => (
              <span key={item} className="text-base text-stone-500">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="border-b border-stone-200 py-14 text-center sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-400">Try it now</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-stone-950 sm:text-5xl">Drop your document</h2>
          <div className="mx-auto mt-10 max-w-3xl rounded-[2rem] border border-dashed border-stone-300 bg-white px-5 py-10 sm:mt-12 sm:px-8 sm:py-16">
            <p className="text-2xl font-semibold text-stone-900 sm:text-3xl">Drag &amp; drop your document here</p>
            <p className="mt-3 text-base text-stone-500 sm:text-lg">or click to browse up to 50MB</p>
            <div className="mt-8 flex justify-center gap-3 text-sm">
              {['.txt', '.pdf', '.docx'].map((type) => (
                <span key={type} className="rounded-full bg-stone-100 px-4 py-2 text-stone-600">
                  {type}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => navigate('/upload')}
              className="mt-8 rounded-2xl bg-[#1d1a14] px-8 py-4 text-base font-semibold text-white"
            >
              Choose file
            </button>
          </div>
        </section>

        <section className="border-b border-stone-200 py-14 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-400">How it works</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-stone-950 sm:text-5xl">Three steps to insight</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {workflowSteps.map((step) => (
              <article key={step.id}>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1d1a14] text-lg font-semibold text-white">
                  {step.id}
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-stone-900 sm:text-3xl">{step.title}</h3>
                <p className="mt-4 text-base leading-7 text-stone-500 sm:text-lg sm:leading-8">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-400">Pricing</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-stone-950 sm:text-5xl">Start free, scale when ready</h2>
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
                <button
                  type="button"
                  onClick={() => navigate(tier.featured ? '/dashboard' : '/pricing')}
                  className={`mt-8 w-full rounded-2xl px-5 py-4 text-base font-semibold ${
                    tier.featured ? 'bg-[#2f67e9] text-white' : 'border border-stone-200 text-stone-800'
                  }`}
                >
                  {tier.cta}
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>

    <Footer />
    </>
    
  )
  
}

export default HomePage
