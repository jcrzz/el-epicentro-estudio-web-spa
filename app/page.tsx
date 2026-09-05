'use client'

import Link from 'next/link'
import { ArrowUpRight, Menu, Music2, Radio, Sparkles } from 'lucide-react'
import { useEffect, type ElementType } from 'react'
import { ProjectsBrowser } from '@/components/projects-browser'
import { ContactForm } from '@/components/contact-form'

const LOGO_URL = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20elepicentro-GDV29L7k0s2Y03W0OtJDAPc2SrKun4.png'

function BrandLogo({ compact = false }: { compact?: boolean }) {
  return <img src={LOGO_URL} alt="El Epicentro Estudio" className={compact ? 'h-10 w-auto object-contain' : 'h-14 w-auto object-contain'} />
}

function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: ElementType
}) {
  return (
    <Tag
      className={`reveal ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <BrandLogo compact />
          <span className="font-sans text-lg font-semibold tracking-[-0.04em] text-foreground">El Epicentro <em className="not-italic text-primary">Estudio</em></span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#estudio" className="text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-primary">Estudio</a>
          <Link href="/proyectos" className="text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-primary">Proyectos</Link>
          <a href="#contacto" className="text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-primary">Contacto</a>
        </nav>
        <details className="relative md:hidden">
          <summary className="grid size-10 list-none place-items-center text-foreground"><Menu /></summary>
          <nav className="absolute right-0 top-12 flex w-44 flex-col gap-5 border border-border bg-card p-5">
            <a href="#estudio" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Estudio</a>
            <Link href="/proyectos" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Proyectos</Link>
            <a href="#contacto" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Contacto</a>
          </nav>
        </details>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative flex min-h-[800px] items-end overflow-hidden bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d8e47576-6cf6-44b1-8ce8-80d2549435d1-TUDqwzDa1a9Td6PhHSpVqOUJpZa6Xv.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-background/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-36 lg:px-10 lg:pb-24">
        <Reveal as="div" className="hero-animate mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-primary" delay={100}>
          <Radio className="size-4" /> Estudio de grabación · Gualeguaychú
        </Reveal>
        <Reveal as="h1" className="hero-animate max-w-5xl font-serif text-[clamp(4rem,12vw,11.5rem)] leading-[0.8] tracking-[-0.07em] text-foreground" delay={220}>
          Donde las<br /><em className="text-primary">ideas</em> suenan.
        </Reveal>
        <Reveal as="div" className="hero-animate mt-12 flex flex-col gap-8 border-t border-border pt-6 lg:flex-row lg:items-end lg:justify-between" delay={340}>
          <div>
            <p className="mb-3 font-mono text-xs tracking-[0.2em] text-primary">GRABACIÓN / MEZCLA / MASTERING</p>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">Un espacio para hacer música con tiempo, comodidad y cero presión. Vení a disfrutar el proceso.</p>
          </div>
          <a href="#contacto" className="inline-flex w-fit items-center gap-3 bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground hover:bg-foreground hover:text-background">
            Consultá presupuesto <ArrowUpRight className="size-4" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

function Intro() {
  return (
    <section className="mx-auto grid max-w-7xl gap-3 px-5 py-20 lg:grid-cols-12 lg:px-10 lg:py-28">
      <Reveal as="div" className="relative min-h-[330px] overflow-hidden bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dise%C3%B1o%20sin%20t%C3%ADtulo-6gBTOVX8ULbhKYQdVrEbRaU94uogwv.png')] bg-cover bg-center lg:col-span-7" delay={120}>
        <span className="absolute bottom-6 left-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground"><Sparkles className="size-4 text-primary" /> El espacio</span>
      </Reveal>
      <Reveal as="div" className="flex min-h-[330px] flex-col justify-between bg-card p-7 lg:col-span-5 lg:p-10" delay={180}>
        <div className="flex justify-between text-xs uppercase tracking-[0.2em] text-primary">
          <span>01 / Nosotros</span>
          <Music2 className="size-5" />
        </div>
        <div>
          <h2 className="mb-5 font-serif text-4xl leading-none text-foreground">La música necesita <em className="text-primary">aire.</em></h2>
          <p className="max-w-sm leading-relaxed text-muted-foreground">Un lugar pensado para que la inspiración aparezca, se quede y encuentre su mejor versión.</p>
        </div>
        <a href="#estudio" className="text-xs uppercase tracking-[0.18em] text-foreground hover:text-primary">
          Conocé nuestra historia <ArrowUpRight className="ml-2 inline size-4" />
        </a>
      </Reveal>
      <Reveal as="div" className="flex min-h-[230px] flex-col justify-between bg-primary p-7 text-primary-foreground lg:col-span-4" delay={220}>
        <span className="text-xs uppercase tracking-[0.2em]">02 / El clima</span>
        <p className="max-w-xs font-serif text-3xl leading-tight">Climatizado, cómodo y listo para crear.</p>
        <span className="font-mono text-xs">24° · TODO EL AÑO</span>
      </Reveal>
      <Reveal as="div" className="flex min-h-[230px] flex-col justify-between bg-card p-7 lg:col-span-8 lg:p-10" delay={260}>
        <span className="text-xs uppercase tracking-[0.2em] text-primary">03 / En el estudio</span>
        <p className="max-w-md font-serif text-3xl leading-tight text-foreground">Trabajamos con artistas, bandas y proyectos que tienen algo para decir.</p>
        <Link href="/proyectos" className="text-xs uppercase tracking-[0.18em] text-foreground hover:text-primary">
          Ver proyectos <ArrowUpRight className="ml-2 inline size-4" />
        </Link>
      </Reveal>
    </section>
  )
}

function About() {
  return (
    <section id="estudio" className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-12 lg:gap-20 lg:px-10 lg:py-32">
      <Reveal as="div" className="lg:col-span-4" delay={120}>
        <p className="font-mono text-xs tracking-[0.2em] text-primary">LA HISTORIA</p>
        <p className="mt-8 font-serif text-3xl leading-tight text-foreground">Hecho por músicos, para músicos.</p>
      </Reveal>
      <Reveal as="div" className="lg:col-span-8" delay={180}>
        <p className="max-w-3xl font-serif text-4xl leading-[1.05] text-foreground md:text-6xl">
          El Epicentro nació de una pregunta simple: <em className="text-primary">¿cómo hacemos para que grabar vuelva a ser divertido?</em>
        </p>
        <p className="mt-10 max-w-2xl leading-relaxed text-muted-foreground">
          Emanuel Bucollo creó este estudio para cuidar cada detalle del proceso. Desde la acústica hasta el café, todo está pensado para que puedas concentrarte en lo importante.
        </p>
      </Reveal>
    </section>
  )
}

function Contact() {
  return (
    <section id="contacto" className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
        <Reveal as="div" delay={140}>
          <p className="mb-6 font-mono text-xs tracking-[0.2em]">HABLEMOS</p>
          <h2 className="font-serif text-6xl leading-[0.88] md:text-8xl">Tu próxima canción empieza acá<span className="text-background">.</span></h2>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-primary-foreground/75">Contanos qué tenés en mente y te respondemos con una propuesta a medida.</p>
        </Reveal>
        <Reveal as="div" delay={220}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto flex max-w-7xl justify-between px-5 py-8 lg:px-10">
        <div className="flex items-center gap-3">
          <BrandLogo compact />
          <span className="font-sans text-lg font-semibold tracking-[-0.04em] text-foreground">El Epicentro <em className="not-italic text-primary">Estudio</em></span>
        </div>
        <span className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground">© 2026 EPICENTRO</span>
      </div>
    </footer>
  )
}

export default function Page() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -6% 0px',
      },
    )

    const elements = document.querySelectorAll('.reveal')
    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <main>
      <Header />
      <Hero />
      <Intro />
      <About />
      <section id="proyectos" className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <Reveal as="div" className="mb-12 flex items-end justify-between" delay={100}>
            <div>
              <p className="mb-4 font-mono text-xs tracking-[0.2em] text-primary">ARCHIVO VIVO</p>
              <h2 className="font-serif text-5xl text-foreground md:text-7xl">Proyectos<span className="text-primary">.</span></h2>
            </div>
            <Link href="/proyectos" className="text-xs uppercase tracking-[0.15em] text-foreground hover:text-primary">
              Ver archivo completo <ArrowUpRight className="ml-2 inline size-4" />
            </Link>
          </Reveal>
          <Reveal as="div" delay={180}>
            <ProjectsBrowser compact />
          </Reveal>
        </div>
      </section>
      <Contact />
      <Footer />
    </main>
  )
}
