import { CLIENT } from '../data/client'
import ContactForm from './ContactForm'
import { useRevealOnScroll } from './useRevealOnScroll'

export default function CTASection() {
  const root = useRevealOnScroll()
  return (
    <section ref={root} id="zayavka" className="relative bg-ink-800 py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={`${import.meta.env.BASE_URL}photos/pixabay_2675511.jpg`}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-800 via-ink-800/95 to-ink-800/70" />
      </div>

      <div className="container-x relative grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5 flex flex-col justify-center">
          <p className="eyebrow mb-5 reveal">Запис</p>
          <h2 className="font-serif font-medium text-bone text-4xl md:text-5xl lg:text-6xl leading-tight text-balance reveal">
            Найшвидше — <span className="italic text-brass">у Telegram</span>. Або залиш заявку.
          </h2>
          <p className="mt-6 text-bone-dim text-lg leading-relaxed max-w-md reveal">
            Telegram — слот за 5 хвилин. Форма — передзвонимо протягом 30 хвилин у робочий час.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 reveal">
            <a href={CLIENT.telegram} target="_blank" rel="noopener noreferrer" className="btn-brass">
              {CLIENT.telegramHandle}
            </a>
            <a href={`tel:${CLIENT.phoneRaw}`} className="btn-outline">
              {CLIENT.phone}
            </a>
          </div>
        </div>

        <div className="lg:col-span-7 reveal">
          <div className="bg-ink border border-brass/15 p-6 md:p-8 lg:p-10">
            <p className="eyebrow mb-2">Залишити заявку</p>
            <h3 className="font-serif text-2xl md:text-3xl text-bone mb-6">Передзвонимо за 30 хвилин</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
