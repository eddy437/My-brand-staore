import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { formatPrice, generateOrderNumber, cn } from '@/lib/utils'
import PageTransition from '@/components/common/PageTransition'
import ImageWithFallback from '@/components/common/ImageWithFallback'
import { useSeo } from '@/lib/seo'
import { useToastStore } from '@/store/toastStore'

interface FormState {
  email: string
  firstName: string
  lastName: string
  address: string
  apartment: string
  city: string
  postalCode: string
  country: string
  phone: string
  cardNumber: string
  expiry: string
  cvc: string
}

const initial: FormState = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  apartment: '',
  city: '',
  postalCode: '',
  country: 'United States',
  phone: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
}

export default function Checkout() {
  const { items, getSubtotal, getShipping, getTotal, clearCart } = useCart()
  const [form, setForm] = useState<FormState>(initial)
  const [delivery, setDelivery] = useState<'standard' | 'express'>('standard')
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [orderNumber, setOrderNumber] = useState<string | null>(null)
  const addToast = useToastStore((s) => s.addToast)

  useSeo({ title: 'Checkout — NOIRSOLE' })

  const subtotal = getSubtotal()
  const shipping = getShipping(delivery)
  const total = getTotal(delivery)

  const set = (k: keyof FormState, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!form.email.includes('@')) e.email = 'Valid email required'
    if (!form.firstName) e.firstName = 'Required'
    if (!form.lastName) e.lastName = 'Required'
    if (!form.address) e.address = 'Required'
    if (!form.city) e.city = 'Required'
    if (!form.postalCode) e.postalCode = 'Required'
    if (!form.phone) e.phone = 'Required'
    if (form.cardNumber.replace(/\s/g, '').length < 15) e.cardNumber = 'Valid card required'
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'MM/YY'
    if (form.cvc.length < 3) e.cvc = 'CVC'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const placeOrder = () => {
    if (!validate()) return
    const num = generateOrderNumber()
    setOrderNumber(num)
    addToast('ORDER CONFIRMED', 'success')
    clearCart()
  }

  if (orderNumber) {
    return (
      <PageTransition>
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-bone">
            <Check size={28} className="text-bone" />
          </div>
          <h1 className="mt-8 font-display text-4xl font-bold uppercase tracking-tightest text-bone lg:text-6xl">
            ORDER CONFIRMED
          </h1>
          <p className="mt-4 max-w-md font-display text-[12px] uppercase tracking-[0.2em] text-concrete-400">
            THANK YOU FOR BEING PART OF THE ROTATION.
          </p>
          <p className="mt-8 font-display text-[11px] uppercase tracking-[0.25em] text-concrete-500">
            ORDER NUMBER
          </p>
          <p className="mt-2 font-display text-lg font-semibold tracking-[0.2em] text-bone">
            {orderNumber}
          </p>
          <Link
            to="/shop"
            className="mt-10 border border-bone px-8 py-4 font-display text-[12px] font-semibold uppercase tracking-[0.25em] text-bone transition-colors hover:bg-bone hover:text-noir-950"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </PageTransition>
    )
  }

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
          <h1 className="font-display text-3xl font-bold uppercase tracking-tightest text-bone lg:text-5xl">
            YOUR BAG IS EMPTY
          </h1>
          <Link to="/shop" className="mt-8 border border-bone px-8 py-4 font-display text-[12px] font-semibold uppercase tracking-[0.25em] text-bone hover:bg-bone hover:text-noir-950">
            SHOP NOW
          </Link>
        </div>
      </PageTransition>
    )
  }

  const Field = ({
    label,
    name,
    type = 'text',
    placeholder,
    className,
  }: {
    label: string
    name: keyof FormState
    type?: string
    placeholder?: string
    className?: string
  }) => (
    <label className={cn('block', className)}>
      <span className="font-display text-[10px] uppercase tracking-[0.2em] text-concrete-400">
        {label}
      </span>
      <input
        type={type}
        value={form[name]}
        onChange={(e) => set(name, e.target.value)}
        placeholder={placeholder}
        className={cn(
          'mt-2 w-full border bg-transparent px-4 py-3 font-display text-[12px] tracking-[0.05em] text-bone placeholder:text-concrete-600 focus:outline-none',
          errors[name] ? 'border-red-500' : 'border-noir-700 focus:border-bone'
        )}
      />
      {errors[name] && (
        <span className="mt-1 block font-display text-[9px] uppercase tracking-[0.2em] text-red-400">
          {errors[name]}
        </span>
      )}
    </label>
  )

  return (
    <PageTransition>
      <div className="mx-auto max-w-[1400px] px-5 py-12 lg:px-10 lg:py-16">
        <Link
          to="/"
          className="font-display text-lg font-bold tracking-[0.25em] text-bone"
        >
          NOIRSOLE
        </Link>

        <div className="mt-6 border border-noir-700 bg-noir-900 px-4 py-3 text-center">
          <p className="font-display text-[10px] uppercase tracking-[0.25em] text-concrete-300">
            DEMO CHECKOUT — NO REAL PAYMENT WILL BE PROCESSED.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_420px] lg:gap-16">
          <div className="space-y-12">
            <section>
              <h2 className="font-display text-[11px] font-semibold uppercase tracking-[0.3em] text-bone">
                CONTACT
              </h2>
              <div className="mt-5">
                <Field label="Email" name="email" type="email" placeholder="you@email.com" />
              </div>
            </section>

            <section>
              <h2 className="font-display text-[11px] font-semibold uppercase tracking-[0.3em] text-bone">
                SHIPPING
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field label="First Name" name="firstName" />
                <Field label="Last Name" name="lastName" />
                <Field label="Address" name="address" className="sm:col-span-2" />
                <Field label="Apartment (optional)" name="apartment" className="sm:col-span-2" />
                <Field label="City" name="city" />
                <Field label="Postal Code" name="postalCode" />
                <Field label="Country" name="country" className="sm:col-span-2" />
                <Field label="Phone" name="phone" className="sm:col-span-2" />
              </div>
            </section>

            <section>
              <h2 className="font-display text-[11px] font-semibold uppercase tracking-[0.3em] text-bone">
                DELIVERY
              </h2>
              <div className="mt-5 space-y-3">
                {(
                  [
                    { v: 'standard', l: 'Standard', d: '3–5 business days' },
                    { v: 'express', l: 'Express', d: '1–2 business days' },
                  ] as const
                ).map((o) => (
                  <button
                    key={o.v}
                    onClick={() => setDelivery(o.v)}
                    className={cn(
                      'flex w-full items-center justify-between border px-5 py-4 transition-colors',
                      delivery === o.v
                        ? 'border-bone bg-noir-900'
                        : 'border-noir-700 hover:border-concrete-500'
                    )}
                  >
                    <span className="font-display text-[12px] uppercase tracking-[0.2em] text-bone">
                      {o.l}
                    </span>
                    <span className="font-display text-[11px] uppercase tracking-[0.15em] text-concrete-400">
                      {o.d} —{' '}
                      {o.v === 'express' ? '$25' : subtotal >= 150 ? 'FREE' : '$12'}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display text-[11px] font-semibold uppercase tracking-[0.3em] text-bone">
                PAYMENT
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field
                  label="Card Number"
                  name="cardNumber"
                  placeholder="4242 4242 4242 4242"
                  className="sm:col-span-2"
                />
                <Field label="Expiry" name="expiry" placeholder="MM/YY" />
                <Field label="CVC" name="cvc" placeholder="123" />
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="font-display text-[11px] font-semibold uppercase tracking-[0.3em] text-bone">
              ORDER SUMMARY
            </h2>
            <ul className="mt-6 divide-y divide-noir-850 border-y border-noir-850">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.color}-${item.size}`}
                  className="flex gap-4 py-4"
                >
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-16 shrink-0"
                  />
                  <div className="flex flex-1 flex-col">
                    <span className="font-display text-[11px] font-semibold uppercase tracking-[0.1em] text-bone">
                      {item.name}
                    </span>
                    <span className="mt-1 font-display text-[10px] uppercase tracking-[0.15em] text-concrete-500">
                      {item.color} / {item.size} / QTY {item.quantity}
                    </span>
                    <span className="mt-auto font-display text-[12px] text-bone">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between font-display text-[11px] uppercase tracking-[0.2em] text-concrete-400">
                <span>Subtotal</span>
                <span className="text-bone">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between font-display text-[11px] uppercase tracking-[0.2em] text-concrete-400">
                <span>Shipping</span>
                <span className="text-bone">
                  {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between border-t border-noir-800 pt-3 font-display text-[13px] font-semibold uppercase tracking-[0.2em] text-bone">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={placeOrder}
              className="mt-8 w-full bg-bone py-4 font-display text-[12px] font-semibold uppercase tracking-[0.25em] text-noir-950 transition-colors hover:bg-white"
            >
              PLACE ORDER
            </button>
          </aside>
        </div>
      </div>
    </PageTransition>
  )
}