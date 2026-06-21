import { useEffect } from 'react'
import Hero from '../components/Hero'
import Counters from '../components/Counters'
import Problem from '../components/Problem'
import Advantages from '../components/Advantages'
import Services from '../components/Services'
import HowItWorks from '../components/HowItWorks'
import PortfolioPreview from '../components/PortfolioPreview'
import Reviews from '../components/Reviews'
import FAQ from '../components/FAQ'
import CTASection from '../components/CTASection'
import Contacts from '../components/Contacts'

export default function Home() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }) }, [])
  return (
    <>
      <Hero />
      <Counters />
      <Problem />
      <Advantages />
      <Services />
      <HowItWorks />
      <PortfolioPreview />
      <Reviews />
      <FAQ />
      <CTASection />
      <Contacts />
    </>
  )
}
