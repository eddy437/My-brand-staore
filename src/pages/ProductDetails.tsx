import { useParams, Link } from 'react-router-dom'
import { products } from '@/data/products'
import ProductGallery from '@/components/product/ProductGallery'
import ProductInfo from '@/components/product/ProductInfo'
import RelatedProducts from '@/components/product/RelatedProducts'
import PageTransition from '@/components/common/PageTransition'
import { useSeo } from '@/lib/seo'

export default function ProductDetails() {
  const { slug } = useParams<{ slug: string }>()
  const product = products.find((p) => p.slug === slug)

  useSeo({
    title: product ? `${product.name} — NOIRSOLE` : 'Product Not Found — NOIRSOLE',
    description: product?.description ?? 'Product not found.',
  })

  if (!product) {
    return (
      <PageTransition>
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
          <h1 className="font-display text-4xl font-bold uppercase tracking-tightest text-bone lg:text-6xl">
            PRODUCT NOT FOUND
          </h1>
          <p className="mt-4 font-display text-[11px] uppercase tracking-[0.2em] text-concrete-500">
            The piece you're looking for doesn't exist or has been archived.
          </p>
          <Link
            to="/shop"
            className="mt-8 border border-bone px-8 py-4 font-display text-[12px] font-semibold uppercase tracking-[0.25em] text-bone transition-colors hover:bg-bone hover:text-noir-950"
          >
            BACK TO SHOP
          </Link>
        </div>
      </PageTransition>
    )
  }

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4)

  return (
    <PageTransition>
      <div className="mx-auto max-w-[1600px] px-5 py-12 lg:px-10 lg:py-16">
        <nav className="mb-8 font-display text-[10px] uppercase tracking-[0.25em] text-concrete-500">
          <Link to="/shop" className="hover:text-bone">
            SHOP
          </Link>{' '}
          / <Link to={`/shop/${product.category}`} className="hover:text-bone">
            {product.category}
          </Link>{' '}
          / <span className="text-bone">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} name={product.name} />
          <ProductInfo product={product} />
        </div>
      </div>

      <RelatedProducts products={related} />
    </PageTransition>
  )
}