import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Features from "@/components/features"
import KeyFeature from "@/components/key-feature"
import OurWork from "@/components/our-work"
import Services from "@/components/services"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"
import TechStack from "@/components/tech-stack"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black">
      <Navbar />
      <Hero />
      <TechStack />
      <Features />
      <KeyFeature />
      <OurWork />
      <Services />
      <Testimonials />
      <Footer />
    </div>
  )
}
