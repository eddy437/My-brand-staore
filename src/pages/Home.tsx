import Hero from '@/components/home/Hero'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CategoryEditorial from '@/components/home/CategoryEditorial'
import NewDrops from '@/components/home/NewDrops'
import CampaignBanner from '@/components/home/CampaignBanner'
import BrandStory from '@/components/home/BrandStory'
import SocialGallery from '@/components/home/SocialGallery'
import Newsletter from '@/components/home/Newsletter'
import PageTransition from '@/components/common/PageTransition'
import { useSeo } from '@/lib/seo'

export default function Home() {
  useSeo({
    title: 'NOIRSOLE — Wear The Culture',
    description:
      'Premium Gen-Z streetwear and sneakers. Clothing, sneakers and accessories built for the next generation.',
  })

  return (
    <PageTransition>
      <Hero />
      <FeaturedProducts />
      <CategoryEditorial />
      <NewDrops />
      <CampaignBanner />
      <BrandStory />
      <SocialGallery />
      <Newsletter />
    </PageTransition>
  )
}