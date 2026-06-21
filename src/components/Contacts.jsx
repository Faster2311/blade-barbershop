import { CLIENT } from '../data/client'
import { useRevealOnScroll } from './useRevealOnScroll'

const CHANNELS = [
  { label: 'Адреса', value: 'м. Житомир\nвул. Михайлівська 14', link: null, icon: '↳' },
  { label: 'Телефон', value: CLIENT.phone, link: `tel:${CLIENT.phoneRaw}`, icon: '☏' },
  { label: 'Графік', value: 'Щодня 10:00 — 22:00\nБез вихідних і свят', link: null, icon: '⌒' },
  { label: 'Telegram', value: CLIENT.telegramHandle, link: CLIENT.telegram, icon: '⤳' },
  { label: 'Viber', value: CLIENT.phone, link: CLIENT.viber, icon: '⤳' },
  { label: 'Instagram', value: CLIENT.instagramHandle, link: CLIENT.instagram, icon: '◎' },
]

export default function Contacts() {
  const root = useRevealOnScroll()
  return (
    <section ref={root} id="kontakty" className="bg-ink py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-2xl mb-12 md:mb-14">
          <p className="eyebrow mb-5 reveal">Контакти</p>
          <h2 className="font-serif font-medium text-bone text-4xl md:text-5xl leading-tight reveal text-balance">
            <span className="italic text-brass">Михайлівська 14</span>, у дворі за аркою
          </h2>
          <p className="mt-5 text-bone-dim text-base reveal">
            Орієнтир — вхід поряд з «Сильпо». Парковка у дворі — два місця прямо біля входу.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-px bg-brass/15">
          <ul className="lg:col-span-5 bg-ink p-7 md:p-9 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7">
            {CHANNELS.map((c) => (
              <li key={c.label} className="reveal">
                <p className="text-[11px] uppercase tracking-widest-2 text-brass mb-2 flex items-center gap-2">
                  <span aria-hidden="true">{c.icon}</span>{c.label}
                </p>
                {c.link ? (
                  <a
                    href={c.link}
                    target={c.link.startsWith('http') ? '_blank' : undefined}
                    rel={c.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-bone hover:text-brass transition-colors text-base font-sans break-words"
                  >
                    {c.value}
                  </a>
                ) : (
                  <p className="text-bone text-base whitespace-pre-line">{c.value}</p>
                )}
              </li>
            ))}
          </ul>

          <div className="lg:col-span-7 bg-ink relative min-h-[320px] md:min-h-[420px] reveal">
            <iframe
              src={CLIENT.googleMapEmbed}
              title="Карта Barbershop Blade у Житомирі"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full grayscale contrast-110"
            />
            <div className="absolute top-4 left-4 bg-ink/95 border border-brass/30 px-4 py-3 max-w-xs">
              <p className="text-[10px] uppercase tracking-widest-2 text-brass mb-1">тут</p>
              <p className="font-serif text-bone text-lg leading-tight">Михайлівська 14</p>
              <p className="text-bone-dim text-xs mt-1">Житомир</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
