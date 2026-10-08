"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const stagger = (ms: number) => ({ "--stagger": ms } as React.CSSProperties)

export function About() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="estudio" className="border-t border-line">
      <div
        ref={ref}
        className={`mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 md:py-36 ${isVisible ? "reveal-in" : ""}`}
      >
        <h2 className="reveal-item text-[clamp(1.75rem,4.5vw,3rem)] font-bold leading-tight tracking-[-0.03em]" style={stagger(0)}>
          Hecho por músicos, para músicos.
        </h2>

        <div className="mt-10 space-y-6 text-base leading-relaxed text-muted sm:text-lg">
          <p className="reveal-item" style={stagger(80)}>
            El Epicentro nació de una pregunta simple: ¿cómo hacemos para que grabar vuelva a ser
            divertido?
          </p>
          <p className="reveal-item" style={stagger(160)}>
            Emanuel Bucollo creó el estudio para cuidar cada detalle del proceso. Desde la
            acústica hasta el café, todo está pensado para que te concentres en lo importante.
          </p>
          <p className="reveal-item" style={stagger(240)}>
            La sala es cómoda, silenciosa y climatizada. Vení con tiempo, grabá sin apuro y
            disfrutá el proceso creativo.
          </p>
        </div>

        <p className="reveal-item mt-12 text-sm text-faint" style={stagger(320)}>Emanuel Bucollo — ingeniero y productor</p>
      </div>
    </section>
  )
}
