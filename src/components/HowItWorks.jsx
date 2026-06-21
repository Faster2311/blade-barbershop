import { HOW_STEPS, CLIENT } from '../data/client'
import { useRevealOnScroll } from './useRevealOnScroll'

export default function HowItWorks() {
  const root = useRevealOnScroll()
  return (
    <section ref={root} className="bg-ink py-20 md:py-28">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5 reveal">Як це працює</p>
            <h2 className="font-serif font-medium text-bone text-4xl md:text-5xl leading-tight reveal text-balance">
              Від <span className="italic text-brass">«хочу постригтись»</span> до крісла — чотири кроки
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end">
            <p className="text-bone-dim text-base md:text-lg leading-relaxed reveal">
              Без дзвінків, без «передзвонимо за годину», без передоплати. Найзручніше — Telegram. Відповідаємо за 5 хвилин у робочий час.
            </p>
          </div>
        </div>

        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-brass/15">
          {HOW_STEPS.map((s) => (
            <li key={s.n} className="reveal bg-ink p-7 md:p-8 relative">
              <p className="font-serif text-6xl text-brass/30 leading-none mb-4">{s.n}</p>
              <h3 className="font-serif text-2xl text-bone mb-3">{s.title}</h3>
              <p className="text-bone-dim text-sm leading-relaxed">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 text-center reveal">
          <a href={CLIENT.telegram} target="_blank" rel="noopener noreferrer" className="btn-brass">
            Почати з повідомлення →
          </a>
        </div>
      </div>
    </section>
  )
}
