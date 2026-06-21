import { Link, useNavigate, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { PRODUCTS, CATEGORIES } from '../data/products'
import { useCart } from '../data/cart'

export default function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = PRODUCTS.find((p) => p.id === id)
  const { add, has } = useCart()

  if (!product) {
    return (
      <section className="bg-ink-800 min-h-[70vh] grid place-items-center pt-28 px-5">
        <div className="text-center">
          <p className="font-serif text-brass text-6xl mb-4">404</p>
          <h1 className="font-serif text-bone text-2xl md:text-3xl mb-4">Товар не знайдено</h1>
          <Link to="/shop" className="btn-brass">До магазину</Link>
        </div>
      </section>
    )
  }

  const category = CATEGORIES.find((c) => c.id === product.category)
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  return (
    <>
      <PageHero
        kicker={category?.label || 'Магазин'}
        title={product.title}
        lede={product.short}
        image={product.photo}
        crumbs={[{ label: 'Магазин', to: '/shop' }, { label: product.title }]}
      />

      <section className="bg-ink-800 py-12 md:py-20">
        <div className="container-x grid lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="aspect-square overflow-hidden bg-ink">
              <img
                src={`${import.meta.env.BASE_URL}photos/${product.photo}`}
                alt={product.title}
                className="w-full h-full object-cover"
                fetchpriority="high"
              />
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <p className="text-[11px] uppercase tracking-widest-2 text-brass/70 mb-3">{product.brand}</p>
            <h2 className="font-serif text-bone text-3xl md:text-4xl mb-5 leading-tight">{product.title}</h2>

            <div className="flex items-end gap-4 mb-6">
              {product.oldPrice && (
                <p className="text-bone-dim/60 text-xl line-through">{product.oldPrice} грн</p>
              )}
              <p className="font-serif text-5xl text-brass leading-none">{product.price} грн</p>
            </div>

            <p className="text-bone-dim text-base leading-relaxed mb-8">{product.description}</p>

            <dl className="grid grid-cols-2 gap-y-3 gap-x-6 mb-8 pb-8 border-b border-brass/15 text-sm">
              {product.volume && (<>
                <dt className="text-bone-dim/70 uppercase text-[11px] tracking-widest-2">Обʼєм</dt>
                <dd className="text-bone">{product.volume}</dd>
              </>)}
              <dt className="text-bone-dim/70 uppercase text-[11px] tracking-widest-2">Бренд</dt>
              <dd className="text-bone">{product.brand}</dd>
              <dt className="text-bone-dim/70 uppercase text-[11px] tracking-widest-2">Категорія</dt>
              <dd className="text-bone">{category?.label}</dd>
              <dt className="text-bone-dim/70 uppercase text-[11px] tracking-widest-2">Наявність</dt>
              <dd className="text-brass">У наявності</dd>
            </dl>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => add(product.id)}
                className="btn-brass flex-1 min-w-[180px]"
              >
                {has(product.id) ? '✓ Додано — додати ще' : 'Додати у кошик'}
              </button>
              <button
                type="button"
                onClick={() => { add(product.id); navigate('/cart') }}
                className="btn-outline flex-1"
              >
                Купити одразу
              </button>
            </div>

            <p className="text-xs text-bone-dim/60 mt-5">
              Замовлення оформлюється у Telegram. Самовивіз з барбершопу — безкоштовно. Доставка по Житомиру — 80 грн.
            </p>
          </div>
        </div>

        {related.length > 0 && (
          <div className="container-x mt-20 pt-12 border-t border-brass/15">
            <p className="eyebrow mb-5">З цієї ж категорії</p>
            <h2 className="font-serif text-bone text-2xl md:text-3xl mb-8">Може бути цікаво</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-brass/15">
              {related.map((r) => (
                <Link key={r.id} to={`/shop/${r.id}`} className="bg-ink p-6 group">
                  <div className="aspect-square overflow-hidden mb-5 -mx-6 -mt-6">
                    <img src={`${import.meta.env.BASE_URL}photos/${r.photo}`} alt={r.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="text-[10px] uppercase tracking-widest-2 text-brass/70 mb-2">{r.brand}</p>
                  <p className="font-serif text-lg text-bone group-hover:text-brass transition-colors leading-tight">{r.title}</p>
                  <p className="font-serif text-xl text-brass mt-3">{r.price} грн</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  )
}
