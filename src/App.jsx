import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import FloatingCTA from './components/FloatingCTA'
import { CartProvider } from './data/cart'

import Home from './pages/Home'
import ServicesPage from './pages/ServicesPage'
import PortfolioPage from './pages/PortfolioPage'
import AboutPage from './pages/AboutPage'
import ContactsPage from './pages/ContactsPage'
import ShopPage from './pages/ShopPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

function NotFound() {
  return (
    <section className="bg-ink-800 min-h-[70vh] grid place-items-center pt-32 pb-16">
      <div className="text-center container-x">
        <p className="font-serif text-brass text-7xl md:text-9xl mb-4">404</p>
        <h1 className="font-serif text-bone text-3xl md:text-4xl mb-4">Сторінка десь загубилась</h1>
        <p className="text-bone-dim mb-7 max-w-md mx-auto">Можливо, вона переїхала на нову адресу. Поверніться на головну.</p>
        <Link to="/" className="btn-brass">На головну</Link>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingCTA />
    </CartProvider>
  )
}
