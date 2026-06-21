import { useEffect, useRef, useState } from 'react'
import { COUNTERS } from '../data/client'

function CountUp({ target, duration = 1600 }) {
  const ref = useRef(null)
  const [val, setVal] = useState('0')
  const started = useRef(false)

  useEffect(() => {
    const isNumber = /^\d+(\.\d+)?$/.test(target)
    if (!isNumber) { setVal(target); return }
    const numericTarget = parseFloat(target)
    const isFloat = !Number.isInteger(numericTarget)

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const tick = (now) => {
          const elapsed = now - start
          const progress = Math.min(elapsed / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          const current = numericTarget * ease
          setVal(isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString('uk-UA'))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.4 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{val}</span>
}

export default function Counters() {
  return (
    <section className="bg-ink border-y border-brass/15">
      <div className="container-x py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-brass/15">
          {COUNTERS.map((c, i) => (
            <div key={i} className="px-4 py-6 md:py-4 md:px-8 text-center md:first:pl-0 md:last:pr-0">
              <p className="font-serif text-5xl md:text-6xl text-brass leading-none">
                <CountUp target={c.value} />
              </p>
              <p className="mt-3 text-[11px] uppercase tracking-widest-2 text-bone-dim">{c.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
