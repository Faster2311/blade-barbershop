import { REVIEWS } from '../data/client'
import { useRevealOnScroll } from './useRevealOnScroll'

export default function Reviews() {
  const root = useRevealOnScroll()
  return (
    <section ref={root} className="bg-ink py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="eyebrow mb-5 reveal">Відгуки</p>
          <h2 className="font-serif font-medium text-bone text-4xl md:text-5xl leading-tight reveal text-balance">
            Шість клієнтів, які <span className="italic text-brass">повернулись</span> і пояснили чому
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-brass/15">
          {REVIEWS.map((r, i) => (
            <article key={i} className="reveal bg-ink p-7 md:p-8 flex flex-col">
              <div className="flex items-center gap-1 text-brass mb-5" aria-label={`${r.rating} з 5`}>
                {Array.from({ length: r.rating }).map((_, k) => (
                  <span key={k} aria-hidden="true">★</span>
                ))}
              </div>
              <blockquote className="font-serif text-bone text-lg leading-snug flex-1 italic">
                «{r.text}»
              </blockquote>
              <footer className="mt-6 pt-5 border-t border-white/5">
                <p className="text-bone font-medium text-sm">{r.name}</p>
                <p className="text-bone-dim/70 text-xs uppercase tracking-widest-2 mt-1">{r.role}</p>
              </footer>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-bone-dim text-sm reveal">
          <span className="text-brass font-serif text-2xl align-middle">4.9</span>
          <span className="ml-2 align-middle">з 5 у Google · 850+ відгуків</span>
        </p>
      </div>
    </section>
  )
}
