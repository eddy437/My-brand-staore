import { useEffect } from 'react'

interface SeoProps {
  title: string
  description?: string
  image?: string
}

export function useSeo({ title, description, image }: SeoProps) {
  useEffect(() => {
    document.title = title
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }
    if (description) {
      setMeta('description', description)
      setMeta('og:description', description, true)
    }
    setMeta('og:title', title, true)
    if (image) setMeta('og:image', image, true)
  }, [title, description, image])
}