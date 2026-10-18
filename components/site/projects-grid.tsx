"use client"

import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { getProjects } from "@/lib/admin-storage"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const stagger = (ms: number) => ({ "--stagger": ms } as React.CSSProperties)

export function ProjectsGrid() {
  const projects = getProjects()
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.12, "0px 0px -80px 0px")

  return (
    <section id="proyectos" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:mb-16">
          <h2 className="text-[clamp(1.75rem,4.5vw,3rem)] font-bold leading-tight tracking-[-0.03em]">
            Proyectos
          </h2>
          <p className="max-w-md text-base leading-relaxed text-muted">
            Trabajamos con artistas, bandas y proyectos que tienen algo para decir.
          </p>
        </div>

        <div
          ref={ref}
          className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ${isVisible ? "reveal-in" : ""}`}
        >
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="reveal-item group flex h-full flex-col overflow-hidden border border-line bg-surface transition-colors duration-300 ease-out hover:border-accent focus-within:border-accent"
              style={stagger(index * 40)}
            >
              <div className="relative aspect-[16/10] overflow-hidden sm:aspect-square">
                <Image
                  src={project.image}
                  alt={`Portada de ${project.title}, de ${project.artist}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  loading={index < 3 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none" />
              </div>

              <div className="flex flex-1 flex-col gap-4 p-6">
                <header>
                  <h3 className="text-lg font-medium tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{project.artist}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.12em] text-faint">{project.release}</p>
                </header>

                <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-faint sm:line-clamp-3">
                  {project.description}
                </p>

                <footer className="pt-2">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black active:opacity-70"
                    aria-label={`${project.actionLabel} ${project.title} de ${project.artist}`}
                  >
                    {project.actionLabel}
                    <ChevronRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                  </a>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}