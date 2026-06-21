import { useMemo, useState } from 'react'
import PageHero from '../components/PageHero'
import { PORTFOLIO, CLIENT } from '../data/client'

export default function PortfolioPage() {
  const tags = useMemo(() => ['Усі', ...new Set(PORTFOLIO.map((p) => p.tag))], [])
  const [active, setActive] = useState('Усі')
  const items = active === 'Усі' ? PORTFOLIO : PORTFOLIO.filter((p) => p.tag === active)

  return (
    <>
      <PageHero
        kicker="Архів"
        title="Реальні роботи майстрів Blade"
        lede="Більше двох тисяч стрижок за сім років. Ось дюжина — щоб ти бачив, як виглядають фейд, кроп, класика і борода в наших руках."
        image="pixabay_1453064.jpg"
        crumbs={[{ label: 'Портфоліо' }]}
      />

      <section className="bg-ink-800 py-12 md:py-16">
        <div className="container-x">
          <div className="flex flex-wrap items-center gap-2 mb-10 md:mb-12 pb-6 border-b border-brass/15">
            <span className="text-[11px] uppercase tracking-widest-2 text-bone-dim mr-3">Фільтр:</span>
            {tags.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setActive(t)}
                className={
                  'px-4 py-2 text-sm font-sans transition-colors min-h-[40px] ' +
                  (active === t
                    ? 'bg-brass text-ink-800'
                    : 'text-bone-dim hover:text-brass border border-brass/20 hover:border-brass/40')
                }
              >
                {t}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-brass/15">
            {items.map((p) => (
              <figure key={p.photo} className="relative aspect-[3/4] bg-ink overflow-hidden group">
                <img
                  src={`${import.meta.env.BASE_URL}photos/${p.photo}`}
                  alt={p.caption}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-800/95 via-ink-800/20 to-transparent" />
                <figcaption className="absolute bottom-3 left-3 right-3">
                  <p className="text-[9px] uppercase tracking-widest-2 text-brass mb-1">{p.tag}</p>
                  <p className="font-serif text-bone text-sm md:text-base leading-tight">{p.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          {items.length === 0 && (
            <p className="text-center text-bone-dim py-12">Робіт у цій категорії поки немає.</p>
          )}
        </div>
      </section>

      <section className="bg-ink py-16 md:py-20 border-t border-brass/15">
        <div className="container-x text-center">
          <p className="font-serif text-2xl md:text-3xl text-bone text-balance max-w-2xl mx-auto mb-6">
            Сподобалась робота? <span className="italic text-brass">Збережи й покажи майстру</span> при записі.
          </p>
          <a href={CLIENT.telegram} target="_blank" rel="noopener noreferrer" className="btn-brass">
            Записатись з референсом
          </a>
        </div>
      </section>
    </>
  )
}
