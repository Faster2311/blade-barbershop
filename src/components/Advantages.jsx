import { ADVANTAGES, CLIENT } from '../data/client'
import { useRevealOnScroll } from './useRevealOnScroll'

export default function Advantages() {
  const root = useRevealOnScroll()
  return (
    <section ref={root} className="relative bg-ink py-20 md:py-28 overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-brass/5 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="container-x relative">
        <div className="max-w-3xl mb-14 md:mb-20">
          <p className="eyebrow mb-5 reveal">Чому Blade</p>
          <h2 className="font-serif font-medium text-bone text-4xl md:text-5xl leading-tight reveal text-balance">
            Шість речей, які <span className="italic text-brass">тримають</span> сім років стандарту
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-brass/15">
          {ADVANTAGES.map((a, i) => (
            <article key={a.title} className="bg-ink p-8 lg:p-10 reveal group hover:bg-ink-700 transition-colors duration-300">
              <p className="font-mono text-xs text-brass/50 mb-5 tracking-widest">/ {String(i + 1).padStart(2, '0')}</p>
              <h3 className="font-serif text-2xl md:text-3xl text-bone mb-4 leading-tight">{a.title}</h3>
              <p className="text-bone-dim text-sm leading-relaxed">{a.text}</p>
              <span className="block mt-6 w-6 h-px bg-brass/40 group-hover:w-16 transition-all duration-500" />
            </article>
          ))}
        </div>

        <div className="mt-14 text-center reveal">
          <a href={CLIENT.telegram} target="_blank" rel="noopener noreferrer" className="btn-brass">
            Записатись зі знижкою -20%
          </a>
        </div>
      </div>
    </section>
  )
}
