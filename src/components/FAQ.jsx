import { useState } from 'react'
import { FAQ as ITEMS } from '../data/client'
import { useRevealOnScroll } from './useRevealOnScroll'

export default function FAQ() {
  const root = useRevealOnScroll()
  const [open, setOpen] = useState(0)

  return (
    <section ref={root} className="bg-ink-800 py-20 md:py-28">
      <div className="container-x grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-5 reveal">Питання · відповіді</p>
          <h2 className="font-serif font-medium text-bone text-4xl md:text-5xl leading-tight reveal text-balance">
            Що питають <span className="italic text-brass">перед першим візитом</span>
          </h2>
          <p className="mt-6 text-bone-dim text-sm leading-relaxed reveal">
            Якщо твого питання нема — напиши у Telegram. Адміністратор відповідає за 5 хвилин у робочий час.
          </p>
        </div>

        <ul className="lg:col-span-8 divide-y divide-brass/15 border-y border-brass/15">
          {ITEMS.map((item, i) => {
            const isOpen = open === i
            return (
              <li key={i} className="reveal">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-start justify-between gap-6 text-left py-6 group min-h-[64px]"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-5 flex-1">
                    <span className="font-mono text-xs text-brass/60 mt-2 shrink-0 w-8">{String(i + 1).padStart(2, '0')}</span>
                    <span className={'font-serif text-xl md:text-2xl leading-snug transition-colors ' + (isOpen ? 'text-brass' : 'text-bone group-hover:text-brass')}>
                      {item.q}
                    </span>
                  </div>
                  <span className={'shrink-0 mt-2 font-mono text-xl text-brass transition-transform ' + (isOpen ? 'rotate-45' : '')} aria-hidden="true">+</span>
                </button>
                {isOpen && (
                  <div className="pb-7 pl-13 pr-8 ml-13">
                    <p className="text-bone-dim text-base leading-relaxed">{item.a}</p>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
