import Image from "next/image"
import { siteConfig } from "@/lib/site-config"

const HERO_IMAGE =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dise%C3%B1o%20sin%20t%C3%ADtulo-6gBTOVX8ULbhKYQdVrEbRaU94uogwv.png"

const RINGS = [0.32, 0.5, 0.68, 0.86, 1.04]

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 pt-16 text-center sm:px-8"
    >
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black" />

      {/* Ondas concéntricas: el único momento decorativo de la página */}
      <div
        className="animate-rings pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[150vmax]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 800 800" className="size-full">
          {RINGS.map((r, i) => (
            <circle
              key={r}
              cx="400"
              cy="400"
              r={r * 390}
              fill="none"
              stroke="rgba(250,250,250,0.07)"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center">
        <h1
          className="animate-rise text-[clamp(3rem,12vw,7.5rem)] font-bold leading-[0.95] tracking-[-0.04em]"
          style={{ animationDelay: "60ms" }}
        >
          {siteConfig.tagline}
        </h1>

        <p
          className="animate-rise mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[0.65rem] font-medium tracking-[0.3em] text-foreground/80 sm:text-xs md:text-sm"
          style={{ animationDelay: "220ms" }}
        >
          {siteConfig.services.map((service, i) => (
            <span key={service} className="flex items-center gap-3">
              {i > 0 && <span className="text-faint" aria-hidden="true">|</span>}
              {service}
            </span>
          ))}
        </p>

        <p
          className="animate-rise mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          style={{ animationDelay: "360ms" }}
        >
          Un espacio para hacer música con tiempo, comodidad y cero presión.
        </p>

        <a
          href="#contacto"
          className="animate-rise mt-10 inline-flex items-center justify-center bg-accent px-8 py-3.5 text-sm font-medium text-black transition-colors hover:bg-accent-strong"
          style={{ animationDelay: "500ms" }}
        >
          Consultá presupuesto
        </a>
      </div>
    </section>
  )
}
