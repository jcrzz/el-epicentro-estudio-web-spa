import { Header } from "@/components/site/header"
import { Hero } from "@/components/site/hero"
import { Bento } from "@/components/site/bento"
import { About } from "@/components/site/about"
import { ProjectsCarousel } from "@/components/site/ProjectsCarousel"
import { Contact } from "@/components/site/contact"
import { Footer } from "@/components/site/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Bento />
        <About />
        <ProjectsCarousel />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
