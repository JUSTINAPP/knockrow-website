import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import RangeSection from '@/components/RangeSection'
import StorySection from '@/components/StorySection'
import AreaSection from '@/components/AreaSection'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Nav overHero />
      <main>
        <Hero />
        <RangeSection />
        <StorySection />
        <AreaSection />
      </main>
      <Footer />
    </>
  )
}
