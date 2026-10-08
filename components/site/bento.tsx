"use client"

import Image from "next/image"
import { seedProjects } from "@/lib/projects"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const STUDIO_IMAGE =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d8e47576-6cf6-44b1-8ce8-80d2549435d1-TUDqwzDa1a9Td6PhHSpVqOUJpZa6Xv.jpg"

const cellClass = "bg-background p-6 md:p-8"

const stagger = (ms: number) => ({ "--stagger": ms } as React.CSSProperties)

export function Bento() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section aria-label="Resumen del estudio" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <div
          ref={ref}
          className={`grid grid-cols-1 gap-px bg-line md:grid-cols-3 ${isVisible ? "reveal-in" : ""}`}
        >
          <figure className={`${cellClass} md:col-span-2 reveal-item`} style={stagger(0)}>
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={STUDIO_IMAGE}
                alt="Sala de grabación de El Epicentro Estudio"
                fill
                sizes="(min-width: 768px) 66vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 text-xs text-faint">La sala</figcaption>
          </figure>

          <div className={`${cellClass} flex flex-col justify-between gap-8 reveal-item`} style={stagger(100)}>
            <p className="text-sm leading-relaxed text-muted">
              El Epicentro nació de una pregunta simple: ¿cómo hacemos para que grabar vuelva a
              ser divertido?
            </p>
            <p className="text-sm leading-relaxed text-muted">
              Un lugar pensado por y para músicos, sin apuro y sin ruido de más.
            </p>
          </div>

          <div className={`${cellClass} reveal-item`} style={stagger(200)}>
            <h2 className="text-xs font-medium tracking-[0.2em] text-faint">Artistas</h2>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              {seedProjects.map((project) => (
                <li key={project.id}>
                  {project.artist}
                  <span className="text-faint"> — {project.release}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${cellClass} md:col-span-2 flex items-baseline gap-5 reveal-item`} style={stagger(300)}>
            <span className="text-5xl font-bold tracking-tight text-foreground md:text-6xl">
              24°
            </span>
            <p className="text-sm leading-relaxed text-muted">
              Sala climatizada todo el año. Confort real para sesiones largas: llegá, conectá y
              grabá.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
