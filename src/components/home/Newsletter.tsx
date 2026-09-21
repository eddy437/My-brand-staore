import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return (
    <section className="border-t border-noir-800 bg-noir-950">
      <div className="mx-auto max-w-3xl px-5 py-24 text-center lg:px-10 lg:py-32">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl font-bold uppercase tracking-tightest text-bone lg:text-6xl"
        >
          STAY IN THE ROTATION.
        </motion.h2>
        <p className="mt-5 font-display text-[12px] uppercase tracking-[0.2em] text-concrete-400">
          New drops. Limited releases. No unnecessary noise.
        </p>

        {done ? (
          <p className="mt-10 font-display text-[12px] uppercase tracking-[0.25em] text-bone">
            YOU'RE IN. WELCOME TO THE ROTATION.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (!email.includes('@')) return
              setDone(true)
            }}
            className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              aria-label="Email address"
              className="flex-1 border border-noir-700 bg-transparent px-5 py-4 font-display text-[12px] uppercase tracking-[0.15em] text-bone placeholder:text-concrete-600 focus:border-bone focus:outline-none"
            />
            <button
              type="submit"
              className="bg-bone px-8 py-4 font-display text-[12px] font-semibold uppercase tracking-[0.25em] text-noir-950 transition-colors hover:bg-white"
            >
              JOIN THE LIST
            </button>
          </form>
        )}
      </div>
    </section>
  )
}