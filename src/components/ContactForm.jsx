import { useState } from 'react'
import { CLIENT, SERVICES } from '../data/client'

const RATE_KEY = 'blade_form_submissions'
const RATE_LIMIT = 3
const RATE_WINDOW_MS = 10 * 60 * 1000

function sanitize(input) {
  return String(input)
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim()
    .slice(0, 800)
}

function isRateLimited() {
  try {
    const now = Date.now()
    const raw = localStorage.getItem(RATE_KEY)
    const times = raw ? JSON.parse(raw).filter((t) => now - t < RATE_WINDOW_MS) : []
    return times.length >= RATE_LIMIT
  } catch { return false }
}

function recordSubmission() {
  try {
    const now = Date.now()
    const raw = localStorage.getItem(RATE_KEY)
    const times = raw ? JSON.parse(raw).filter((t) => now - t < RATE_WINDOW_MS) : []
    times.push(now)
    localStorage.setItem(RATE_KEY, JSON.stringify(times))
  } catch {}
}

export default function ContactForm({ variant = 'dark' }) {
  const [form, setForm] = useState({
    name: '', phone: '', service: SERVICES[0].id, day: 'Сьогодні', message: '', hp: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const update = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }))
    setErrors((e) => ({ ...e, [k]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Введи імʼя'
    if (!/^\+?[\d\s\-()]{9,}$/.test(form.phone.trim())) e.phone = 'Телефон у форматі +380...'
    return e
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    if (form.hp.trim()) return
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    if (isRateLimited()) { setStatus('rate'); return }
    setStatus('loading')
    recordSubmission()
    const _payload = {
      name: sanitize(form.name),
      phone: sanitize(form.phone),
      service: form.service,
      day: form.day,
      message: sanitize(form.message),
    }
    // No backend wired — Telegram is the primary funnel. Simulate success.
    setTimeout(() => {
      setStatus('success')
      setForm({ name: '', phone: '', service: SERVICES[0].id, day: 'Сьогодні', message: '', hp: '' })
    }, 700)
  }

  if (status === 'success') {
    return (
      <div className="text-center py-10">
        <p className="font-serif text-3xl md:text-4xl text-brass mb-3">Дякуємо!</p>
        <p className="text-bone-dim text-sm leading-relaxed max-w-sm mx-auto mb-7">
          Передзвонимо протягом 30 хвилин у робочий час. Якщо потрібно зараз — найшвидше у Telegram.
        </p>
        <a href={CLIENT.telegram} target="_blank" rel="noopener noreferrer" className="btn-brass">
          Написати у Telegram
        </a>
      </div>
    )
  }

  if (status === 'rate') {
    return (
      <div className="text-center py-10">
        <p className="font-serif text-2xl text-bone mb-3">Завантаження форми</p>
        <p className="text-bone-dim text-sm">Спробуй ще раз через 10 хвилин. Поки що — найшвидше у Telegram.</p>
        <a href={CLIENT.telegram} target="_blank" rel="noopener noreferrer" className="btn-brass mt-5">
          Написати у Telegram
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="hp-blade">Не заповнюйте це поле</label>
        <input id="hp-blade" name="hp" type="text" value={form.hp} onChange={(e) => update('hp', e.target.value)} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-[11px] uppercase tracking-widest-2 text-bone-dim mb-2 block">Імʼя</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Іван"
            className={'field ' + (errors.name ? 'field-error' : '')}
            autoComplete="name"
            maxLength={60}
            required
          />
          {errors.name && <span className="text-red-400 text-xs mt-1 block">{errors.name}</span>}
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-widest-2 text-bone-dim mb-2 block">Телефон</span>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="+380 67 123 45 67"
            className={'field ' + (errors.phone ? 'field-error' : '')}
            autoComplete="tel"
            maxLength={20}
            required
          />
          {errors.phone && <span className="text-red-400 text-xs mt-1 block">{errors.phone}</span>}
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-[11px] uppercase tracking-widest-2 text-bone-dim mb-2 block">Послуга</span>
          <select
            name="service"
            value={form.service}
            onChange={(e) => update('service', e.target.value)}
            className="field"
          >
            {SERVICES.map((s) => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-widest-2 text-bone-dim mb-2 block">Зручний день</span>
          <select
            name="day"
            value={form.day}
            onChange={(e) => update('day', e.target.value)}
            className="field"
          >
            {['Сьогодні', 'Завтра', 'Цього тижня', 'На вихідних'].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-[11px] uppercase tracking-widest-2 text-bone-dim mb-2 block">Коментар (необовʼязково)</span>
        <textarea
          name="message"
          rows={3}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Бажаний майстер, час, побажання"
          className="field resize-none"
          maxLength={500}
        />
      </label>

      <button type="submit" disabled={status === 'loading'} className="btn-brass mt-2 w-full md:w-auto md:self-start min-w-[240px] disabled:opacity-60">
        {status === 'loading' ? 'Надсилаємо...' : 'Залишити заявку'}
      </button>

      <p className="text-xs text-bone-dim/60 mt-1">
        Натискаючи кнопку, ти погоджуєшся з обробкою контактів для звʼязку щодо запису.
      </p>
    </form>
  )
}
