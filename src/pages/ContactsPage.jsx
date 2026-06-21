import PageHero from '../components/PageHero'
import ContactForm from '../components/ContactForm'
import { CLIENT } from '../data/client'

const CHANNELS = [
  { label: 'Адреса', value: 'м. Житомир\nвул. Михайлівська 14', link: null },
  { label: 'Телефон', value: CLIENT.phone, link: `tel:${CLIENT.phoneRaw}` },
  { label: 'Графік', value: 'Щодня 10:00 — 22:00\nБез вихідних і свят', link: null },
  { label: 'Telegram', value: CLIENT.telegramHandle, link: CLIENT.telegram },
  { label: 'Viber', value: CLIENT.phone, link: CLIENT.viber },
  { label: 'Instagram', value: CLIENT.instagramHandle, link: CLIENT.instagram },
]

export default function ContactsPage() {
  return (
    <>
      <PageHero
        kicker="Контакти"
        title="Як до нас потрапити"
        lede="Найшвидший спосіб — Telegram, відповідаємо за 5 хвилин у робочий час. Або заповни форму — передзвонимо протягом 30 хвилин."
        image="pixabay_2345701.jpg"
        crumbs={[{ label: 'Контакти' }]}
      />

      <section className="bg-ink-800 py-16 md:py-24">
        <div className="container-x grid lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Channels */}
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5">Канали звʼязку</p>
            <h2 className="font-serif text-bone text-3xl md:text-4xl leading-tight mb-8 text-balance">
              Шість способів написати або <span className="italic text-brass">прийти</span>
            </h2>

            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-7">
              {CHANNELS.map((c) => (
                <li key={c.label}>
                  <p className="text-[11px] uppercase tracking-widest-2 text-brass mb-2">{c.label}</p>
                  {c.link ? (
                    <a
                      href={c.link}
                      target={c.link.startsWith('http') ? '_blank' : undefined}
                      rel={c.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-bone hover:text-brass transition-colors text-base break-words"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-bone text-base whitespace-pre-line">{c.value}</p>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-10 p-6 border border-brass/20 bg-ink">
              <p className="eyebrow mb-2">Швидкий запис</p>
              <p className="font-serif text-bone text-2xl leading-tight mb-4">Telegram = 5 хвилин і слот твій</p>
              <a href={CLIENT.telegram} target="_blank" rel="noopener noreferrer" className="btn-brass w-full">
                Написати у Telegram
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-ink border border-brass/15 p-7 md:p-10">
              <p className="eyebrow mb-2">Форма заявки</p>
              <h2 className="font-serif text-bone text-3xl md:text-4xl mb-2">Передзвонимо за 30 хвилин</h2>
              <p className="text-bone-dim text-sm mb-7">У робочий час. Поза часом — наступного ранку.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-ink relative border-t border-brass/15">
        <iframe
          src={CLIENT.googleMapEmbed}
          title="Карта Barbershop Blade на Михайлівській 14"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[420px] md:h-[520px] grayscale contrast-110"
        />
        <div className="absolute top-6 left-6 md:top-10 md:left-10 bg-ink/95 border border-brass/30 px-5 py-4 max-w-xs">
          <p className="text-[10px] uppercase tracking-widest-2 text-brass mb-1">Тут</p>
          <p className="font-serif text-bone text-xl leading-tight">вул. Михайлівська 14</p>
          <p className="text-bone-dim text-xs mt-1">Житомир · у дворі за аркою</p>
        </div>
      </section>
    </>
  )
}
