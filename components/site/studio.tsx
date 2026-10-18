"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const DSC_IMAGES = [
  { src: "/DSC08143.jpg", alt: "Sala de grabación de El Epicentro — detalle de la sala" },
  { src: "/DSC08150.jpg", alt: "Sala de grabación de El Epicentro — ambiente de trabajo" },
  { src: "/DSC08168.jpg", alt: "Sala de grabación de El Epicentro — instrumentos y espacio" },
  { src: "/DSC08173.jpg", alt: "Sala de grabación de El Epicentro — vista de la sala" },
  { src: "/DSC08179.jpg", alt: "Sala de grabación de El Epicentro — detalles acústicos" },
  { src: "/DSC08182.jpg", alt: "Sala de grabación de El Epicentro — mobiliario y equipamiento" },
  { src: "/DSC08185.jpg", alt: "Sala de grabación de El Epicentro — espacio para sesión" },
  { src: "/DSC08224.jpg", alt: "Sala de grabación de El Epicentro — vista general" },
] as const

const stagger = (ms: number) => ({ "--stagger": ms } as React.CSSProperties)

export function Studio() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.12, "0px 0px -80px 0px")
  const [activeImage, setActiveImage] = useState<number | null>(null)
  const images = useMemo(() => DSC_IMAGES, [])

  return (
    <section id="estudio" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <h2 className="text-[clamp(1.75rem,4.5vw,3rem)] font-bold leading-tight tracking-[-0.03em]">
            El estudio
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Un espacio pensado por y para músicos. Minimalista por necesidad. Todo lo demás, al servicio de la música.
          </p>
        </div>

        <div
          ref={ref}
          className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${isVisible ? "reveal-in" : ""}`}
        >
          {images.map((image, index) => (
            <figure
              key={image.src}
              className="reveal-item group relative overflow-hidden border border-line bg-surface"
              style={stagger(index * 40)}
              onMouseEnter={() => setActiveImage(index)}
              onMouseLeave={() => setActiveImage(null)}
              onFocus={() => setActiveImage(index)}
              onBlur={() => setActiveImage(null)}
              tabIndex={0}
              role="group"
              aria-label={image.alt}
            >
              <div className="relative aspect-square overflow-hidden sm:aspect-[4/5] md:aspect-square lg:aspect-[5/6]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100"
                  loading={index < 4 ? "eager" : "lazy"}
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none" />
              </div>

              <figcaption
                className={`absolute bottom-0 left-0 w-full px-4 py-3 text-xs text-foreground/90 transition-all duration-500 ease-out ${
                  activeImage === index
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                } group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none motion-reduce:opacity-70 motion-reduce:translate-y-0`}
              >
                <span className="block text-xs tracking-[0.12em] text-foreground/80">Sala</span>
                <span className="mt-0.5 block text-sm text-foreground">El Epicentro</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}