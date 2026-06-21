import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { PRODUCTS } from '../data/products'
import { useCart } from '../data/cart'
import { CLIENT } from '../data/client'

const DELIVERY = [
  { id: 'pickup', label: 'Самовивіз — Михайлівська 14', price: 0 },
  { id: 'city', label: 'Доставка по Житомиру', price: 80 },
  { id: 'nova', label: 'Нова Пошта по Україні', price: 90 },
]

function sanitize(input) {
  return String(input).replace(/[<>]/g, '').trim().slice(0, 400)
}

export default function CartPage() {
  const { items, add, dec, remove, clear, totalQty } = useCart()
  const [delivery, setDelivery] = useState(DELIVERY[0].id)
  const [form, setForm] = useState({ name: '', phone: '', city: '', np: '', comment: '', hp: '' })
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)

  const enriched = items
    .map((it) => ({ ...it, product: PRODUCTS.find((p) => p.id === it.id) }))
    .filter((it) => it.product)

  const subtotal = enriched.reduce((s, it) => s + it.product.price * it.qty, 0)
  const shipping = DELIVERY.find((d) => d.id === delivery)?.price || 0
  const total = subtotal + shipping

  const update = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }))
    setErrors((e) => ({ ...e, [k]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Введи імʼя'
    if (!/^\+?[\d\s\-()]{9,}$/.test(form.phone.trim())) e.phone = 'Телефон +380...'
    if (delivery === 'city' && !form.city.trim()) e.city = 'Адреса доставки'
    if (delivery === 'nova' && !form.np.trim()) e.np = 'Місто і номер відділення'
    return e
  }

  const submit = (e) => {
    e.preventDefault()
    if (form.hp.trim()) return
    if (enriched.length === 0) return
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    const _order = {
      items: enriched.map((it) => ({ id: it.id, qty: it.qty, title: it.product.title, price: it.product.price })),
      delivery,
      subtotal, shipping, total,
      contact: {
        name: sanitize(form.name),
        phone: sanitize(form.phone),
        city: sanitize(form.city),
        np: sanitize(form.np),
        comment: sanitize(form.comment),
      },
    }
    // No backend wired — Telegram is the funnel. Open confirmation, then offer Telegram for handoff.
    setDone(true)
    clear()
  }

  if (done) {
    return (
      <>
        <PageHero
          kicker="Замовлення"
          title="Дякуємо!"
          lede="Замовлення прийняли. Передзвонимо протягом 30 хвилин, узгодимо деталі доставки і оплати."
          image="pixabay_5212054.jpg"
          crumbs={[{ label: 'Кошик', to: '/cart' }, { label: 'Замовлено' }]}
        />
        <section className="bg-ink-800 py-16">
          <div className="container-x text-center max-w-xl mx-auto">
            <p className="text-bone-dim mb-7">
              Якщо потрібно прискорити — напиши у Telegram, скажи що щойно оформив замовлення, оператор підтягне.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={CLIENT.telegram} target="_blank" rel="noopener noreferrer" className="btn-brass">
                Написати у Telegram
              </a>
              <Link to="/shop" className="btn-outline">Повернутись у магазин</Link>
            </div>
          </div>
        </section>
      </>
    )
  }

  if (enriched.length === 0) {
    return (
      <>
        <PageHero
          kicker="Кошик"
          title="Кошик порожній"
          lede="Поки що порожньо. Заходь у магазин — є власні олії для бороди і набори для гоління."
          image="pixabay_3134807.jpg"
          crumbs={[{ label: 'Кошик' }]}
        />
        <section className="bg-ink-800 py-20 text-center">
          <Link to="/shop" className="btn-brass">До магазину</Link>
        </section>
      </>
    )
  }

  return (
    <>
      <PageHero
        kicker="Кошик"
        title="Ваш кошик"
        lede={`У кошику ${totalQty} ${totalQty === 1 ? 'товар' : totalQty < 5 ? 'товари' : 'товарів'}. Перевірте і оформіть замовлення.`}
        image="pixabay_3134807.jpg"
        crumbs={[{ label: 'Кошик' }]}
      />

      <section className="bg-ink-800 py-12 md:py-20">
        <div className="container-x grid lg:grid-cols-12 gap-10">
          {/* Items + form */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <ul className="divide-y divide-brass/15 border-y border-brass/15">
              {enriched.map((it) => (
                <li key={it.id} className="py-5 grid grid-cols-12 gap-4 items-center">
                  <Link to={`/shop/${it.id}`} className="col-span-3 sm:col-span-2 aspect-square overflow-hidden">
                    <img src={`${import.meta.env.BASE_URL}photos/${it.product.photo}`} alt={it.product.title} className="w-full h-full object-cover" loading="lazy" />
                  </Link>
                  <div className="col-span-9 sm:col-span-5">
                    <p className="text-[10px] uppercase tracking-widest-2 text-brass/70 mb-1">{it.product.brand}</p>
                    <Link to={`/shop/${it.id}`} className="font-serif text-lg text-bone hover:text-brass transition-colors leading-tight block">
                      {it.product.title}
                    </Link>
                  </div>
                  <div className="col-span-7 sm:col-span-2 flex items-center gap-1">
                    <button type="button" onClick={() => dec(it.id)} className="w-9 h-9 border border-brass/30 text-brass hover:bg-brass/10" aria-label="Зменшити">−</button>
                    <span className="w-10 text-center text-bone">{it.qty}</span>
                    <button type="button" onClick={() => add(it.id)} className="w-9 h-9 border border-brass/30 text-brass hover:bg-brass/10" aria-label="Збільшити">+</button>
                  </div>
                  <div className="col-span-5 sm:col-span-3 text-right">
                    <p className="font-serif text-xl text-brass">{it.product.price * it.qty} грн</p>
                    <button type="button" onClick={() => remove(it.id)} className="text-[11px] uppercase tracking-widest-2 text-bone-dim hover:text-red-400 transition-colors mt-1">
                      Прибрати
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div>
              <p className="eyebrow mb-3">Доставка</p>
              <ul className="space-y-2">
                {DELIVERY.map((d) => (
                  <li key={d.id}>
                    <label className={'flex items-center justify-between p-4 cursor-pointer border transition-colors ' + (delivery === d.id ? 'border-brass bg-brass/5' : 'border-brass/15 hover:border-brass/40')}>
                      <span className="flex items-center gap-3">
                        <input type="radio" name="delivery" value={d.id} checked={delivery === d.id} onChange={() => setDelivery(d.id)} className="accent-brass" />
                        <span className="text-bone text-sm">{d.label}</span>
                      </span>
                      <span className="text-bone-dim text-sm">{d.price === 0 ? 'безкоштовно' : `${d.price} грн`}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={submit} noValidate className="flex flex-col gap-4">
              <div className="hp-field" aria-hidden="true">
                <label htmlFor="hp-cart">Не заповнюйте</label>
                <input id="hp-cart" name="hp" type="text" value={form.hp} onChange={(e) => update('hp', e.target.value)} tabIndex={-1} autoComplete="off" />
              </div>

              <p className="eyebrow">Контактні дані</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-[11px] uppercase tracking-widest-2 text-bone-dim mb-2 block">Імʼя</span>
                  <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} className={'field ' + (errors.name ? 'field-error' : '')} placeholder="Іван" maxLength={60} required />
                  {errors.name && <span className="text-red-400 text-xs mt-1 block">{errors.name}</span>}
                </label>
                <label className="block">
                  <span className="text-[11px] uppercase tracking-widest-2 text-bone-dim mb-2 block">Телефон</span>
                  <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className={'field ' + (errors.phone ? 'field-error' : '')} placeholder="+380 67 123 45 67" maxLength={20} required />
                  {errors.phone && <span className="text-red-400 text-xs mt-1 block">{errors.phone}</span>}
                </label>
              </div>

              {delivery === 'city' && (
                <label className="block">
                  <span className="text-[11px] uppercase tracking-widest-2 text-bone-dim mb-2 block">Адреса у Житомирі</span>
                  <input type="text" value={form.city} onChange={(e) => update('city', e.target.value)} className={'field ' + (errors.city ? 'field-error' : '')} placeholder="вул. Київська 25, кв. 12" maxLength={200} />
                  {errors.city && <span className="text-red-400 text-xs mt-1 block">{errors.city}</span>}
                </label>
              )}
              {delivery === 'nova' && (
                <label className="block">
                  <span className="text-[11px] uppercase tracking-widest-2 text-bone-dim mb-2 block">Місто і відділення НП</span>
                  <input type="text" value={form.np} onChange={(e) => update('np', e.target.value)} className={'field ' + (errors.np ? 'field-error' : '')} placeholder="Київ, відділення 31" maxLength={200} />
                  {errors.np && <span className="text-red-400 text-xs mt-1 block">{errors.np}</span>}
                </label>
              )}

              <label className="block">
                <span className="text-[11px] uppercase tracking-widest-2 text-bone-dim mb-2 block">Коментар (необовʼязково)</span>
                <textarea rows={3} value={form.comment} onChange={(e) => update('comment', e.target.value)} className="field resize-none" maxLength={400} placeholder="Деталі замовлення" />
              </label>
            </form>
          </div>

          {/* Summary */}
          <aside className="lg:col-span-5">
            <div className="bg-ink border border-brass/20 p-6 md:p-8 sticky top-24">
              <p className="eyebrow mb-2">Підсумок</p>
              <h2 className="font-serif text-bone text-2xl md:text-3xl mb-7">До оплати</h2>

              <dl className="space-y-3 text-sm pb-5 border-b border-brass/15">
                <div className="flex justify-between">
                  <dt className="text-bone-dim">Товарів</dt>
                  <dd className="text-bone">{totalQty} шт</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-bone-dim">Сума товарів</dt>
                  <dd className="text-bone">{subtotal} грн</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-bone-dim">Доставка</dt>
                  <dd className="text-bone">{shipping === 0 ? 'безкоштовно' : `${shipping} грн`}</dd>
                </div>
              </dl>

              <div className="flex items-end justify-between mt-5">
                <p className="text-[11px] uppercase tracking-widest-2 text-bone-dim">Разом</p>
                <p className="font-serif text-4xl text-brass leading-none">{total} грн</p>
              </div>

              <button type="submit" onClick={submit} className="btn-brass w-full mt-7">
                Оформити замовлення
              </button>

              <p className="text-xs text-bone-dim/60 mt-4 text-center">
                Передзвонимо протягом 30 хвилин для підтвердження. Оплата — при отриманні або переказом.
              </p>

              <div className="mt-5 pt-5 border-t border-brass/15">
                <p className="text-bone-dim text-xs mb-3">Питання щодо замовлення?</p>
                <a href={CLIENT.telegram} target="_blank" rel="noopener noreferrer" className="btn-outline w-full text-xs">
                  Написати у Telegram
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
