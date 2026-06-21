import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { PRODUCTS, CATEGORIES } from '../data/products'
import { useCart } from '../data/cart'

const SORTS = [
  { id: 'recommended', label: 'Рекомендовані' },
  { id: 'price-asc', label: 'Дешевші спочатку' },
  { id: 'price-desc', label: 'Дорожчі спочатку' },
]

export default function ShopPage() {
  const [cat, setCat] = useState('all')
  const [sort, setSort] = useState('recommended')
  const { add, has } = useCart()

  const items = useMemo(() => {
    let xs = cat === 'all' ? [...PRODUCTS] : PRODUCTS.filter((p) => p.category === cat)
    if (sort === 'price-asc') xs.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') xs.sort((a, b) => b.price - a.price)
    return xs
  }, [cat, sort])

  return (
    <>
      <PageHero
        kicker="Магазин"
        title="Догляд, інструмент і подарунки"
        lede="Косметика і інструмент, які ми використовуємо у барбершопі. Перевірені бренди — Reuzel, American Crew, Proraso — плюс власна лінійка Blade."
        image="pixabay_1007875.jpg"
        crumbs={[{ label: 'Магазин' }]}
      />

      <section className="bg-ink-800 py-12 md:py-20">
        <div className="container-x">
          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10 pb-6 border-b border-brass/15">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCat(c.id)}
                  className={
                    'px-4 py-2 text-sm transition-colors min-h-[40px] ' +
                    (cat === c.id
                      ? 'bg-brass text-ink-800'
                      : 'text-bone-dim hover:text-brass border border-brass/20')
                  }
                >
                  {c.label}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-3 text-sm">
              <span className="text-bone-dim text-[11px] uppercase tracking-widest-2">Сортувати:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="field !py-2 !text-sm min-w-[180px]"
              >
                {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </label>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-brass/15">
            {items.map((p) => (
              <article key={p.id} className="bg-ink flex flex-col">
                <Link to={`/shop/${p.id}`} className="relative aspect-square overflow-hidden group block">
                  <img
                    src={`${import.meta.env.BASE_URL}photos/${p.photo}`}
                    alt={p.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {p.badge && (
                    <span className="absolute top-3 left-3 bg-brass text-ink-800 text-[10px] uppercase tracking-widest-2 px-2.5 py-1.5">
                      {p.badge}
                    </span>
                  )}
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-[10px] uppercase tracking-widest-2 text-brass/70 mb-2">{p.brand}</p>
                  <Link to={`/shop/${p.id}`} className="font-serif text-xl text-bone hover:text-brass transition-colors mb-3 leading-tight">
                    {p.title}
                  </Link>
                  <p className="text-bone-dim text-sm leading-relaxed mb-5 flex-1">{p.short}</p>
                  <div className="flex items-end justify-between gap-3 pt-4 border-t border-white/5">
                    <div>
                      {p.oldPrice && (
                        <p className="text-bone-dim/50 text-sm line-through leading-none">{p.oldPrice} грн</p>
                      )}
                      <p className="font-serif text-2xl text-brass leading-none mt-1">{p.price} грн</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => add(p.id)}
                      className={has(p.id) ? 'btn-outline text-xs' : 'btn-brass text-xs'}
                      aria-label={`Додати у кошик: ${p.title}`}
                    >
                      {has(p.id) ? '✓ У кошику' : 'У кошик'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {items.length === 0 && (
            <p className="text-center text-bone-dim py-16">У цій категорії товарів поки немає.</p>
          )}
        </div>
      </section>
    </>
  )
}
