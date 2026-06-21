import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { CLIENT } from '../data/client'

export default function Hero() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('[data-h="image"]', { scale: 1.08, duration: 1.6, ease: 'power2.out' })
        .from('[data-h="meta-top"]', { y: -10, opacity: 0, duration: 0.6 }, 0.2)
        .from('[data-h="rule"]', { scaleX: 0, transformOrigin: 'left', duration: 0.6 }, 0.3)
        .from('[data-h="kicker"]', { y: 12, opacity: 0, duration: 0.5 }, 0.4)
        .from('[data-h="title-row"]', { y: 50, opacity: 0, duration: 0.8, stagger: 0.1 }, 0.5)
        .from('[data-h="lede"]', { y: 18, opacity: 0, duration: 0.6 }, 0.9)
        .from('[data-h="cta"]', { y: 12, opacity: 0, duration: 0.5, stagger: 0.08 }, 1.0)
        .from('[data-h="bottom"]', { y: 30, opacity: 0, duration: 0.7 }, 1.1)
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative min-h-[100svh] bg-ink overflow-hidden flex flex-col">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div data-h="image" className="absolute inset-0 will-change-transform">
          <img
            src={`${import.meta.env.BASE_URL}photos/pixabay_10297388.webp`}
            alt=""
            className="w-full h-full object-cover"
            fetchpriority="high"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(13,14,16,0.95) 0%, rgba(13,14,16,0.55) 35%, rgba(13,14,16,0.65) 70%, rgba(13,14,16,0.98) 100%)',
          }}
        />
      </div>

      {/* Top meta bar */}
      <div data-h="meta-top" className="relative z-10 pt-24 md:pt-28">
        <div className="container-x flex items-center justify-between text-[10px] uppercase tracking-widest-2 text-brass font-mono">
          <span>EST · {CLIENT.founded}</span>
          <span className="hidden sm:inline">{CLIENT.city.toUpperCase()} · UA</span>
          <span>50.255 N · 28.658 E</span>
        </div>
      </div>

      {/* Centered editorial title */}
      <div className="relative z-10 flex-1 flex items-end pb-16 md:pb-24">
        <div className="container-x w-full">
          <div className="max-w-5xl">
            <span data-h="rule" className="block w-20 h-px bg-brass mb-7" />
            <p data-h="kicker" className="eyebrow mb-6">
              Чоловічий барбершоп · {CLIENT.address}
            </p>

            <h1 className="font-serif font-black text-bone leading-[0.95] tracking-tight">
              <span data-h="title-row" className="block text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem]">
                Стрижка
              </span>
              <span data-h="title-row" className="block text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem]">
                без поспіху,
              </span>
              <span data-h="title-row" className="block text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] text-brass italic">
                бритва без сюрпризів
              </span>
            </h1>

            <p data-h="lede" className="mt-9 text-bone-dim text-lg md:text-xl font-sans leading-relaxed max-w-2xl">
              Сім років стрижемо чоловіків Житомира на Михайлівській. Без шаблонів, без нав'язування, без черг на дзвінок. Пиши у Telegram — слот за 5 хвилин.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a data-h="cta" href={CLIENT.telegram} target="_blank" rel="noopener noreferrer" className="btn-brass">
                Записатись у Telegram
              </a>
              <a data-h="cta" href={`tel:${CLIENT.phoneRaw}`} className="btn-outline">
                {CLIENT.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom stat strip */}
      <div data-h="bottom" className="relative z-10 border-t border-brass/20 bg-ink-800/85 backdrop-blur-sm">
        <div className="container-x py-5 grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-8">
          <div className="border-r border-brass/15 pr-4 md:pr-8">
            <p className="font-serif text-3xl md:text-4xl text-brass font-black leading-none">-20%</p>
            <p className="text-[10px] uppercase tracking-widest-2 text-bone-dim mt-2 font-mono">Перший візит</p>
          </div>
          <div className="border-r border-brass/15 pr-4 md:pr-8">
            <p className="font-serif text-3xl md:text-4xl text-brass font-black leading-none">365</p>
            <p className="text-[10px] uppercase tracking-widest-2 text-bone-dim mt-2 font-mono">Днів на рік</p>
          </div>
          <div className="md:border-r md:border-brass/15 md:pr-8">
            <p className="font-serif text-3xl md:text-4xl text-brass font-black leading-none">10–22</p>
            <p className="text-[10px] uppercase tracking-widest-2 text-bone-dim mt-2 font-mono">Графік</p>
          </div>
          <div className="hidden md:block">
            <p className="font-serif text-3xl md:text-4xl text-brass font-black leading-none">№ 14</p>
            <p className="text-[10px] uppercase tracking-widest-2 text-bone-dim mt-2 font-mono">Михайлівська</p>
          </div>
        </div>
      </div>
    </section>
  )
}
