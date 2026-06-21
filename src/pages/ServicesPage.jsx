import PageHero from '../components/PageHero'
import { SERVICES, CLIENT } from '../data/client'

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Меню"
        title="Послуги барбершопу Blade"
        lede="Класичне меню чоловічого барбершопу. Ціна на сайті дорівнює ціні у касі. Перший візит — мінус 20%, скажи у Telegram, що вперше."
        image="pixabay_1851535.jpg"
        crumbs={[{ label: 'Послуги' }]}
      />

      <section className="bg-ink-800 py-16 md:py-24">
        <div className="container-x grid lg:grid-cols-2 gap-px bg-brass/15">
          {SERVICES.map((s, i) => (
            <article key={s.id} className="bg-ink p-8 md:p-10 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <p className="font-mono text-xs text-brass/60 tracking-widest">{String(i + 1).padStart(2, '0')} / {String(SERVICES.length).padStart(2, '0')}</p>
                <p className="text-[11px] uppercase tracking-widest-2 text-bone-dim">{s.duration}</p>
              </div>
              <div className="aspect-[16/10] overflow-hidden mb-6 -mx-8 md:-mx-10 -mt-2">
                <img
                  src={`${import.meta.env.BASE_URL}photos/${s.photo}`}
                  alt={s.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-bone mb-4 leading-tight">{s.title}</h2>
              <p className="text-bone-dim text-base leading-relaxed mb-6">{s.description}</p>

              <ul className="space-y-2 mb-7">
                {s.includes.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-sm text-bone-dim">
                    <span className="text-brass mt-1.5 shrink-0" aria-hidden="true">—</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6 border-t border-brass/15 flex items-center justify-between gap-4">
                <p className="font-serif text-4xl text-brass">{s.price} <span className="text-base text-bone-dim">грн</span></p>
                <a href={CLIENT.telegram} target="_blank" rel="noopener noreferrer" className="btn-brass" aria-label={`Записатись на: ${s.title}`}>
                  Записатись
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="container-x mt-14 text-center">
          <p className="font-serif text-bone text-2xl md:text-3xl max-w-2xl mx-auto text-balance mb-6">
            Не знаєш, що обрати? <span className="italic text-brass">Напиши у Telegram</span> — підкажемо за стилем життя.
          </p>
          <a href={CLIENT.telegram} target="_blank" rel="noopener noreferrer" className="btn-brass">
            Запитати у Telegram
          </a>
        </div>
      </section>
    </>
  )
}
