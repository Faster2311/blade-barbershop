import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { CLIENT } from '../data/client'
import { useCart } from '../data/cart'

const NAV = [
  { to: '/services', label: 'Послуги' },
  { to: '/portfolio', label: 'Роботи' },
  { to: '/shop', label: 'Магазин' },
  { to: '/about', label: 'Про нас' },
  { to: '/contacts', label: 'Контакти' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { totalQty } = useCart()
  const { pathname } = useLocation()

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={
      'fixed top-0 inset-x-0 z-50 transition-all duration-300 ' +
      (scrolled || open
        ? 'bg-ink-800/95 backdrop-blur-md border-b border-brass/15'
        : 'bg-transparent')
    }>
      <div className="container-x">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" aria-label="На головну" className="flex items-baseline gap-2 group">
            <span className="font-serif text-2xl md:text-3xl font-medium text-bone tracking-tight">Blade</span>
            <span className="hidden sm:inline text-[10px] uppercase tracking-widest-2 text-brass/80 group-hover:text-brass transition-colors">
              Barbershop · {CLIENT.city}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Головна навігація">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  'text-sm font-sans tracking-wide transition-colors ' +
                  (isActive ? 'text-brass' : 'text-bone-dim hover:text-bone')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="relative w-11 h-11 grid place-items-center text-bone-dim hover:text-brass transition-colors"
              aria-label={`Кошик, товарів: ${totalQty}`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalQty > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-brass text-ink-800 text-[10px] font-bold rounded-full grid place-items-center">
                  {totalQty}
                </span>
              )}
            </Link>

            <a href={CLIENT.telegram} target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex btn-brass text-xs">
              Запис у Telegram
            </a>

            <button
              type="button"
              className="lg:hidden w-11 h-11 grid place-items-center text-bone hover:text-brass transition-colors"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Закрити меню' : 'Відкрити меню'}
              aria-expanded={open}
            >
              {open ? (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path strokeLinecap="round" d="M4 8h16M4 16h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-brass/15 bg-ink-800">
          <nav className="container-x py-6 flex flex-col gap-1" aria-label="Мобільна навігація">
            {NAV.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  'flex items-center justify-between py-3.5 px-2 -mx-2 text-lg font-serif ' +
                  (isActive ? 'text-brass' : 'text-bone hover:text-brass')
                }
              >
                <span>{item.label}</span>
                <span className="text-[10px] font-sans tracking-widest-2 text-brass/40">{String(i + 1).padStart(2, '0')}</span>
              </NavLink>
            ))}
            <a
              href={CLIENT.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brass mt-4"
            >
              Запис у Telegram
            </a>
            <a
              href={`tel:${CLIENT.phoneRaw}`}
              className="btn-outline mt-2"
            >
              {CLIENT.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
