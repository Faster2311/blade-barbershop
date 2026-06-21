import PageHero from '../components/PageHero'
import { TEAM, STORY, VALUES, CLIENT } from '../data/client'

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="Про нас"
        title="Сім років з одним стандартом"
        lede="Відкрилися у 2018-му на Михайлівській з простою ідеєю — стригти як для себе. Без поспіху, шаблонів і нав'язування."
        image="pixabay_2165745.jpg"
        crumbs={[{ label: 'Про нас' }]}
      />

      {/* Story */}
      <section className="bg-ink-800 py-16 md:py-24">
        <div className="container-x grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-5">Історія</p>
            <h2 className="font-serif text-bone text-3xl md:text-4xl leading-tight text-balance">
              Чотири точки, у яких <span className="italic text-brass">змінювався</span> барбершоп
            </h2>
          </div>
          <ol className="lg:col-span-8 divide-y divide-brass/15 border-y border-brass/15">
            {STORY.map((s) => (
              <li key={s.year} className="py-6 md:py-8 grid grid-cols-12 gap-4 md:gap-8">
                <p className="col-span-3 md:col-span-2 font-serif text-3xl md:text-4xl text-brass leading-none">{s.year}</p>
                <div className="col-span-9 md:col-span-10">
                  <h3 className="font-serif text-xl md:text-2xl text-bone mb-2">{s.title}</h3>
                  <p className="text-bone-dim text-base leading-relaxed">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Team */}
      <section className="bg-ink py-16 md:py-24 border-t border-brass/15">
        <div className="container-x">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow mb-5">Команда</p>
            <h2 className="font-serif text-bone text-3xl md:text-5xl leading-tight text-balance">
              Троє <span className="italic text-brass">барберів</span> з різною спеціалізацією
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-brass/15">
            {TEAM.map((m) => (
              <article key={m.name} className="bg-ink overflow-hidden">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={`${import.meta.env.BASE_URL}photos/${m.photo}`}
                    alt={`${m.name} — ${m.role}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <p className="text-[11px] uppercase tracking-widest-2 text-brass mb-2">{m.role}</p>
                  <h3 className="font-serif text-3xl text-bone mb-3">{m.name}</h3>
                  <p className="text-bone-dim text-sm leading-relaxed mb-2">{m.exp}</p>
                  <p className="text-bone-dim text-sm leading-relaxed">
                    <span className="text-brass/70 text-xs uppercase tracking-widest-2 mr-2">Спеціалізація:</span>
                    {m.spec}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-ink-800 py-16 md:py-24 border-t border-brass/15">
        <div className="container-x">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow mb-5">Принципи</p>
            <h2 className="font-serif text-bone text-3xl md:text-5xl leading-tight text-balance">
              Чотири речі, на яких тримається <span className="italic text-brass">сервіс</span>
            </h2>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brass/15">
            {VALUES.map((v, i) => (
              <li key={v.title} className="bg-ink p-7 md:p-8">
                <p className="font-mono text-xs text-brass/50 mb-4">/ {String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-serif text-2xl text-bone mb-3">{v.title}</h3>
                <p className="text-bone-dim text-sm leading-relaxed">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink py-16 border-t border-brass/15">
        <div className="container-x text-center">
          <p className="font-serif text-2xl md:text-3xl text-bone max-w-2xl mx-auto mb-6 text-balance">
            Заходь познайомитись — <span className="italic text-brass">кава за нашим столом</span> завжди безкоштовна.
          </p>
          <a href={CLIENT.telegram} target="_blank" rel="noopener noreferrer" className="btn-brass">
            Записатись у Telegram
          </a>
        </div>
      </section>
    </>
  )
}
