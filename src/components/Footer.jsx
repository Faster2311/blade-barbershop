import { Link } from 'react-router-dom'
import { CLIENT } from '../data/client'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink border-t border-brass/15">
      <div className="container-x py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-serif text-3xl text-bone">Blade</span>
              <span className="text-[10px] uppercase tracking-widest-2 text-brass">Barbershop</span>
            </div>
            <p className="text-bone-dim text-sm leading-relaxed max-w-sm">
              Чоловічий барбершоп у центрі Житомира. Стрижемо з 2018 року, без вихідних і поспіху. Сім років з одним стандартом.
            </p>
            <p className="text-bone-dim text-sm mt-4">{CLIENT.promo}.</p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow mb-4">Навігація</p>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Головна' },
                { to: '/services', label: 'Послуги' },
                { to: '/portfolio', label: 'Роботи' },
                { to: '/shop', label: 'Магазин' },
                { to: '/about', label: 'Про нас' },
                { to: '/contacts', label: 'Контакти' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-bone-dim hover:text-brass text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow mb-4">Контакти</p>
            <ul className="space-y-2.5 text-sm">
              <li className="text-bone-dim">м. {CLIENT.city}<br />{CLIENT.address}</li>
              <li><a href={`tel:${CLIENT.phoneRaw}`} className="text-bone hover:text-brass transition-colors">{CLIENT.phone}</a></li>
              <li className="text-bone-dim">{CLIENT.workHours}</li>
              <li className="text-bone-dim">Без вихідних і свят</li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow mb-4">Месенджери</p>
            <ul className="space-y-2.5 text-sm">
              <li><a href={CLIENT.telegram} target="_blank" rel="noopener noreferrer" className="text-bone hover:text-brass transition-colors">Telegram</a></li>
              <li><a href={CLIENT.viber} className="text-bone hover:text-brass transition-colors">Viber</a></li>
              <li><a href={CLIENT.instagram} target="_blank" rel="noopener noreferrer" className="text-bone hover:text-brass transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-bone-dim/70">
          <p>© {year} Barbershop Blade. Стрижемо у Житомирі з {CLIENT.founded} року.</p>
          <p className="font-mono">Михайлівська 14 · 50.255 N · 28.658 E</p>
        </div>
      </div>
    </footer>
  )
}
