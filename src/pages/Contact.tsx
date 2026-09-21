import { useState } from 'react'
import { Instagram, Mail, MapPin, Music2 } from 'lucide-react'
import PageTransition from '@/components/common/PageTransition'
import { useSeo } from '@/lib/seo'
import { useToastStore } from '@/store/toastStore'
import { cn } from '@/lib/utils'

interface Form {
  name: string
  email: string
  subject: string
  message: string
}

export default function Contact() {
  const [form, setForm] = useState<Form>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Partial<Form>>({})
  const addToast = useToastStore((s) => s.addToast)

  useSeo({ title: 'Contact — NOIRSOLE', description: 'Get in touch with NOIRSOLE.' })

  const set = (k: keyof Form, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const err: Partial<Form> = {}
    if (!form.name) err.name = 'Required'
    if (!form.email.includes('@')) err.email = 'Valid email required'
    if (!form.subject) err.subject = 'Required'
    if (!form.message) err.message = 'Required'
    setErrors(err)
    if (Object.keys(err).length) return
    addToast('MESSAGE SENT', 'success')
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  const Field = ({
    label,
    name,
    type = 'text',
    textarea,
  }: {
    label: string
    name: keyof Form
    type?: string
    textarea?: boolean
  }) => (
    <label className="block">
      <span className="font-display text-[10px] uppercase tracking-[0.2em] text-concrete-400">
        {label}
      </span>
      {textarea ? (
        <textarea
          rows={6}
          value={form[name]}
          onChange={(e) => set(name, e.target.value)}
          className={cn(
            'mt-2 w-full resize-none border bg-transparent px-4 py-3 font-display text-[12px] text-bone focus:outline-none',
            errors[name] ? 'border-red-500' : 'border-noir-700 focus:border-bone'
          )}
        />
      ) : (
        <input
          type={type}
          value={form[name]}
          onChange={(e) => set(name, e.target.value)}
          className={cn(
            'mt-2 w-full border bg-transparent px-4 py-3 font-display text-[12px] text-bone focus:outline-none',
            errors[name] ? 'border-red-500' : 'border-noir-700 focus:border-bone'
          )}
        />
      )}
      {errors[name] && (
        <span className="mt-1 block font-display text-[9px] uppercase tracking-[0.2em] text-red-400">
          {errors[name]}
        </span>
      )}
    </label>
  )

  return (
    <PageTransition>
      <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-24">
        <h1 className="font-display text-5xl font-bold uppercase tracking-tightest text-bone lg:text-7xl">
          CONTACT NOIRSOLE
        </h1>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_400px]">
          <form onSubmit={submit} className="space-y-6">
            <Field label="Name" name="name" />
            <Field label="Email" name="email" type="email" />
            <Field label="Subject" name="subject" />
            <Field label="Message" name="message" textarea />
            <button
              type="submit"
              className="bg-bone px-10 py-4 font-display text-[12px] font-semibold uppercase tracking-[0.25em] text-noir-950 transition-colors hover:bg-white"
            >
              SEND MESSAGE
            </button>
          </form>

          <aside className="space-y-8">
            <div>
              <h3 className="font-display text-[11px] font-semibold uppercase tracking-[0.3em] text-bone">
                CONTACT
              </h3>
              <ul className="mt-4 space-y-3 font-display text-[12px] tracking-[0.05em] text-concrete-400">
                <li className="flex items-center gap-3">
                  <Mail size={14} /> hello@noirsole.com
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={14} /> Los Angeles, CA
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-[11px] font-semibold uppercase tracking-[0.3em] text-bone">
                FOLLOW
              </h3>
              <ul className="mt-4 space-y-3 font-display text-[12px] tracking-[0.05em] text-concrete-400">
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-bone"
                  >
                    <Instagram size={14} /> @noirsole
                  </a>
                </li>
                <li>
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-bone"
                  >
                    <Music2 size={14} /> @noirsole
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </PageTransition>
  )
}