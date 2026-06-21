import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'blade_cart_v1'

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (i) => i && typeof i.id === 'string' && typeof i.qty === 'number' && i.qty > 0
    )
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  useEffect(() => { setItems(readStorage()) }, [])
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)) } catch {}
  }, [items])

  const add = (id) => setItems((prev) => {
    const found = prev.find((i) => i.id === id)
    if (found) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
    return [...prev, { id, qty: 1 }]
  })

  const dec = (id) => setItems((prev) =>
    prev.flatMap((i) => (i.id !== id ? [i] : i.qty <= 1 ? [] : [{ ...i, qty: i.qty - 1 }]))
  )

  const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id))
  const clear = () => setItems([])

  const totalQty = items.reduce((s, i) => s + i.qty, 0)
  const has = (id) => items.some((i) => i.id === id)

  return (
    <CartContext.Provider value={{ items, add, dec, remove, clear, totalQty, has }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
