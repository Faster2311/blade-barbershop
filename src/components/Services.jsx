import { Link } from 'react-router-dom'
import { SERVICES, CLIENT } from '../data/client'
import { useRevealOnScroll } from './useRevealOnScroll'

export default function Services() {
  const root = useRevealOnScroll()
  return (
    <section ref={root} id="services" className="bg-ink-800 py-20 md:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5 reveal">Прайс</p>
            <h2 className="font-serif font-medium text-bone text-4xl md:text-5xl leading-tight reveal text-balance">
              Послуги і <span className="italic text-brass">ціни</span>
            </h2>
            <p className="mt-5 text-bone-dim text-base md:text-lg max-w-xl reveal">
              Ціна на сайті = ціна у касі. Жодних доплат «за складність» чи «довшу бороду».
            </p>
          </div>
          <Link to="/services" className="btn-outline reveal">Усі послуги</Link>
        </div>

        <ul className="divide-y divide-brass/15 border-y border-brass/15">
          {SERVICES.map((s, i) => (
            <li key={s.id} className="reveal">
              <div className="grid md:grid-cols-12 gap-5 py-7 md:py-8 group">
                <p className="md:col-span-1 font-mono text-xs text-brass/60 self-center">{String(i + 1).padStart(2, '0')}</p>
                <div className="md:col-span-5">
                  <h3 className="font-serif text-2xl md:text-3xl text-bone group-hover:text-brass transition-colors">{s.title}</h3>
                  <p className="text-bone-dim/70 text-xs uppercase tracking-widest-2 mt-2">{s.duration}</p>
                </div>
                <p className="md:col-span-4 text-bone-dim text-sm leading-relaxed self-center">{s.description.split('.')[0]}.</p>
                <div className="md:col-span-2 flex md:flex-col md:items-end items-center justify-between md:justify-center gap-2">
                  <p className="font-serif text-3xl text-brass">{s.price} <span className="text-base text-bone-dim">грн</span></p>
                  <a
                    href={CLIENT.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-widest-2 text-bone-dim hover:text-brass transition-colors"
                    aria-label={`Записатись на: ${s.title}`}
                  >
                    Запис →
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-xs text-bone-dim/60 text-center reveal">
          Перший візит — мінус 20% від суми. Скажи у Telegram, що вперше.
        </p>
      </div>
    </section>
  )
}
