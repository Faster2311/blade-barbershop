import { PROBLEMS } from '../data/client'
import { useRevealOnScroll } from './useRevealOnScroll'

export default function Problem() {
  const root = useRevealOnScroll()
  return (
    <section ref={root} className="bg-ink-800 py-20 md:py-28">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10 mb-12 md:mb-16">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5 reveal">Знайомі ситуації?</p>
            <h2 className="font-serif font-medium text-bone text-4xl md:text-5xl leading-tight reveal">
              Чому стара перукарня — <span className="italic text-brass">вже не варіант</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-bone-dim text-lg leading-relaxed reveal">
              За сім років роботи ми почули від клієнтів сотні історій про невдалі стрижки. Ось шість, які повторюються найчастіше. Якщо хоча б одна знайома — приходь, у нас інакше.
            </p>
          </div>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-brass/15">
          {PROBLEMS.map((p, i) => (
            <li
              key={p.title}
              className="reveal border-b border-r border-brass/15 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0 p-7"
            >
              <p className="font-mono text-xs text-brass/60 mb-3">{String(i + 1).padStart(2, '0')} / 06</p>
              <h3 className="font-serif text-2xl text-bone mb-3">{p.title}</h3>
              <p className="text-bone-dim text-sm leading-relaxed">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
