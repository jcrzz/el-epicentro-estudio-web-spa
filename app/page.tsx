import { Header } from "@/components/site/header"
import { Hero } from "@/components/site/hero"
import { StudioCarousel } from "@/components/site/studio-carousel"
import { ProjectsCarousel } from "@/components/site/projects-carousel"
import { Contact } from "@/components/site/contact"
import { Footer } from "@/components/site/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StudioCarousel />
        <ProjectsCarousel />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
