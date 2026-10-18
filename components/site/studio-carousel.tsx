"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEmblaCarouselLoop } from "@/hooks/use-embla-carousel"
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

export function StudioCarousel() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.12, "0px 0px -80px 0px")
  const { emblaRef, scrollPrev, scrollNext } = useEmblaCarouselLoop({
    align: "start",
    containScroll: "trimSnaps",
  })

  return (
    <section id="estudio" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <h2 className="text-[clamp(1.75rem,4.5vw,3rem)] font-bold leading-tight tracking-[-0.03em]">
            El estudio
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Un espacio pensado por y para músicos. Minimalista por necesidad. Todo lo demás, al servicio de la música.
          </p>
        </div>

        <div ref={ref} className={`relative group ${isVisible ? "reveal-in" : ""}`}>
          <div
            ref={emblaRef}
            className="overflow-hidden"
            style={{ touchAction: "pan-y pinch-zoom" } as React.CSSProperties}
          >
            <div className="flex gap-4">
              {DSC_IMAGES.map((image, index) => (
                <figure
                  key={image.src}
                  className="reveal-item flex-[0_0_100%] sm:flex-[0_0_90%] md:flex-[0_0_80%] lg:flex-[0_0_72%] xl:flex-[0_0_66%]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden border border-line bg-surface sm:aspect-[16/9]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1280px) 80vw, 72vw"
                      className="object-cover transition-transform duration-500 ease-out hover:scale-[1.02] focus-visible:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:focus-visible:scale-100"
                      loading={index < 2 ? "eager" : "lazy"}
                      quality={90}
                    />
                  </div>
                </figure>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Imagen anterior"
            className="absolute left-2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line bg-background/80 p-2 text-muted backdrop-blur-sm transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-[0.98] sm:-translate-x-3 md:-translate-x-4 lg:-translate-x-5 motion-reduce:transition-none motion-reduce:active:scale-100"
          >
            <ChevronLeft className="size-4 sm:size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Siguiente imagen"
            className="absolute right-2 top-1/2 z-10 translate-x-1/2 -translate-y-1/2 rounded-full border border-line bg-background/80 p-2 text-muted backdrop-blur-sm transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-[0.98] sm:translate-x-3 md:translate-x-4 lg:translate-x-5 motion-reduce:transition-none motion-reduce:active:scale-100"
          >
            <ChevronRight className="size-4 sm:size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
