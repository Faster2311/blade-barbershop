import { Link } from 'react-router-dom'
import { PORTFOLIO } from '../data/client'
import { useRevealOnScroll } from './useRevealOnScroll'

export default function PortfolioPreview() {
  const root = useRevealOnScroll()
  const items = PORTFOLIO.slice(0, 6)
  return (
    <section ref={root} className="bg-ink-800 py-20 md:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-14">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5 reveal">Роботи</p>
            <h2 className="font-serif font-medium text-bone text-4xl md:text-5xl leading-tight reveal text-balance">
              Шість стрижок — щоб ти бачив, <span className="italic text-brass">як виглядає результат</span>
            </h2>
          </div>
          <Link to="/portfolio" className="btn-outline reveal">Усе портфоліо</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-brass/15">
          {items.map((p, i) => (
            <figure
              key={p.photo}
              className={
                'reveal relative bg-ink overflow-hidden group ' +
                (i === 0 ? 'md:row-span-2 md:col-span-1 aspect-square md:aspect-auto' : 'aspect-square')
              }
            >
              <img
                src={`${import.meta.env.BASE_URL}photos/${p.photo}`}
                alt={p.caption}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-800/90 via-ink-800/10 to-transparent" />
              <figcaption className="absolute bottom-3 left-4 right-4">
                <p className="text-[10px] uppercase tracking-widest-2 text-brass mb-1">{p.tag}</p>
                <p className="font-serif text-bone text-base md:text-lg leading-tight">{p.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
