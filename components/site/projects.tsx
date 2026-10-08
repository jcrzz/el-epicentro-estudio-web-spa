"use client"

import Image from "next/image"
import { seedProjects } from "@/lib/projects"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { staggerDelay } from "@/lib/utils"

const stagger = (ms: number) => ({ "--stagger": ms } as React.CSSProperties)

export function Projects() {
  const { ref, isVisible } = useScrollReveal<HTMLUListElement>()

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

        <ul
          ref={ref}
          className={`mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 ${isVisible ? "reveal-in" : ""}`}
        >
          {seedProjects.map((project, index) => {
            const row = Math.floor(index / 3)
            const col = index % 3
            return (
              <li key={project.id} className="group reveal-item active:scale-[0.99]" style={stagger(staggerDelay(row, col, 120, 0))}>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label={`${project.actionLabel} ${project.title} de ${project.artist}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                    <Image
                      src={project.image}
                      alt={`Portada de ${project.title}, de ${project.artist}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover grayscale-[35%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <h3 className="text-base font-medium tracking-tight">{project.title}</h3>
                    <span className="shrink-0 text-xs text-faint">{project.release}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{project.artist}</p>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-faint">
                    {project.description}
                  </p>
                  <span className="mt-4 inline-block text-sm text-foreground transition-colors group-hover:text-accent">
                    {project.actionLabel} →
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
