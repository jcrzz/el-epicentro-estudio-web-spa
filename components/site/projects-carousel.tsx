"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getProjects } from "@/lib/admin-storage"
import { useEmblaCarouselLoop } from "@/hooks/use-embla-carousel"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function ProjectsCarousel() {
  const projects = getProjects()
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.12, "0px 0px -80px 0px")
  const { emblaRef, scrollPrev, scrollNext } = useEmblaCarouselLoop({
    align: "start",
    containScroll: "trimSnaps",
  })

  return (
    <section id="proyectos" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:mb-12">
          <h2 className="text-[clamp(1.75rem,4.5vw,3rem)] font-bold leading-tight tracking-[-0.03em]">
            Proyectos
          </h2>
          <p className="max-w-md text-base leading-relaxed text-muted">
            Trabajamos con artistas, bandas y proyectos que tienen algo para decir.
          </p>
        </div>

        <div ref={ref} className={`relative group ${isVisible ? "reveal-in" : ""}`}>
          <div
            ref={emblaRef}
            className="overflow-hidden"
            style={{ touchAction: "pan-y pinch-zoom" } as React.CSSProperties}
          >
            <div className="flex gap-4">
              {projects.map((project, index) => (
                <article
                  key={project.id}
                  className="reveal-item group/card flex-[0_0_85%] flex h-full flex-col overflow-hidden border border-line bg-surface transition-colors duration-300 ease-out hover:border-accent focus-within:border-accent sm:flex-[0_0_70%] md:flex-[0_0_380px] lg:flex-[0_0_420px]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`Portada de ${project.title}, de ${project.artist}`}
                      fill
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 70vw, 420px"
                      className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover/card:scale-100"
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 motion-reduce:transition-none" />
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-4">
                    <header>
                      <h3 className="text-lg font-medium tracking-tight text-foreground transition-colors duration-300 group-hover/card:text-accent">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted">{project.artist}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.12em] text-faint">{project.release}</p>
                    </header>

                    <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-faint">
                      {project.description}
                    </p>

                    <footer className="pt-1">
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black active:opacity-70"
                        aria-label={`${project.actionLabel} ${project.title} de ${project.artist}`}
                      >
                        {project.actionLabel}
                        <ChevronRight className="size-4 transition-transform duration-300 ease-out group-hover/card:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/card:translate-x-0" />
                      </a>
                    </footer>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {projects.length > 1 && (
            <>
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="Proyecto anterior"
                className="absolute left-2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line bg-background/80 p-2 text-muted backdrop-blur-sm transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-[0.98] sm:-translate-x-3 md:-translate-x-4 motion-reduce:transition-none motion-reduce:active:scale-100"
              >
                <ChevronLeft className="size-4 sm:size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="Siguiente proyecto"
                className="absolute right-2 top-1/2 z-10 translate-x-1/2 -translate-y-1/2 rounded-full border border-line bg-background/80 p-2 text-muted backdrop-blur-sm transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-[0.98] sm:translate-x-3 md:translate-x-4 motion-reduce:transition-none motion-reduce:active:scale-100"
              >
                <ChevronRight className="size-4 sm:size-5" aria-hidden="true" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
