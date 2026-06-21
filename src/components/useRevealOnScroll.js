import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useRevealOnScroll() {
  const root = useRef(null)

  useEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      const elements = root.current.querySelectorAll('.reveal')
      if (!elements.length) return
      gsap.to(elements, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return root
}
