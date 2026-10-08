"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getProjects } from "@/lib/admin-storage"
import { useEmblaCarouselLoop } from "@/hooks/use-embla-carousel"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const stagger = (ms: number) => ({ "--stagger": ms } as React.CSSProperties)

export function ProjectsCarousel() {
  const projects = getProjects()
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()
  const { emblaRef, emblaApi, scrollPrev, scrollNext } = useEmblaCarouselLoop()

  return (
    <section id="proyectos" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-[clamp(1.75rem,4.5vw,3rem)] font-bold leading-tight tracking-[-0.03em]">
            Proyectos
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Trabajamos con artistas, bandas y proyectos que tienen algo para decir.
          </p>
        </div>

        <div
          ref={ref}
          className={`relative ${isVisible ? "reveal-in" : ""}`}
          style={stagger(0)}
        >
          <div
            ref={emblaRef}
            className="overflow-hidden"
            style={{ touchAction: "pan-y pinch-zoom" } as React.CSSProperties}
          >
            <div className="flex gap-6 pb-8" style={{ touchAction: "pan-y pinch-zoom" } as React.CSSProperties}>
              {projects.map((project, index) => (
                <div key={project.id} className="flex-[0_0_280px] snap-start sm:flex-[0_0_320px] md:flex-[0_0_380px]">
                  <article className="group relative bg-surface rounded-xl overflow-hidden border border-line transition-all duration-300 hover:border-accent hover:shadow-[0_0_40px_-10px_rgba(255,45,26,0.15)]">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={project.image}
                        alt={`Portada de ${project.title}, de ${project.artist}`}
                        fill
                        sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 380px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-5">
                      <h3 className="font-medium tracking-tight text-foreground group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted">{project.artist}</p>
                      <p className="mt-2 text-xs text-faint uppercase tracking-wider">{project.release}</p>
                      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-faint">
                        {project.description}
                      </p>
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-strong transition-colors"
                        aria-label={`${project.actionLabel} ${project.title} de ${project.artist}`}
                      >
                        {project.actionLabel}
                        <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {projects.length > 1 && (
            <>
              <button
                type="button"
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-4 z-10 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-line text-muted opacity-0 group-hover:opacity-100 hover:bg-background hover:border-accent hover:text-accent transition-all duration-300 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="Proyecto anterior"
              >
                <ChevronLeft className="size-5 sm:size-6" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-4 z-10 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-line text-muted opacity-0 group-hover:opacity-100 hover:bg-background hover:border-accent hover:text-accent transition-all duration-300 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="Siguiente proyecto"
              >
                <ChevronRight className="size-5 sm:size-6" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}