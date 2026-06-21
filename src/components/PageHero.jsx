import { Link } from 'react-router-dom'

export default function PageHero({ kicker, title, lede, image, crumbs = [] }) {
  return (
    <section className="relative pt-28 md:pt-36 pb-16 md:pb-20 overflow-hidden bg-ink">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {image && (
          <img
            src={`${import.meta.env.BASE_URL}photos/${image}`}
            alt=""
            className="w-full h-full object-cover opacity-40"
            fetchpriority="high"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(11,12,13,0.85) 0%, rgba(19,20,22,0.95) 65%, rgba(19,20,22,1) 100%)',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-brass/30" />
      </div>

      <div className="relative z-10 container-x">
        {crumbs.length > 0 && (
          <nav aria-label="Хлібні крихти" className="flex flex-wrap items-center gap-2 text-xs font-sans text-bone-dim/60 mb-8">
            <Link to="/" className="hover:text-brass transition-colors">Головна</Link>
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="text-brass/40">/</span>
                {c.to ? (
                  <Link to={c.to} className="hover:text-brass transition-colors">{c.label}</Link>
                ) : (
                  <span className="text-brass">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {kicker && <p className="eyebrow mb-5">{kicker}</p>}
        <h1 className="font-serif font-medium text-5xl sm:text-6xl md:text-7xl text-bone leading-[1.05] tracking-tight max-w-4xl text-balance">
          {title}
        </h1>
        <span className="rule mt-7 mb-6" />
        {lede && (
          <p className="font-sans text-bone-dim text-base md:text-lg max-w-2xl leading-relaxed text-pretty">
            {lede}
          </p>
        )}
      </div>
    </section>
  )
}
