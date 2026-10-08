"use client"

import { Mail, MessageCircle, Phone } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { ContactForm } from "./contact-form"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const stagger = (ms: number) => ({ "--stagger": ms } as React.CSSProperties)

const actionClass =
  "group flex items-center gap-4 border border-line bg-white/[0.03] p-5 transition-colors hover:border-accent hover:bg-white/[0.06] active:opacity-70"

export function Contact() {
  const { contact } = siteConfig
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="contacto" className="border-t border-line">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32 ${isVisible ? "reveal-in" : ""}`}
      >
        <h2 className="reveal-item max-w-2xl text-[clamp(1.75rem,4.5vw,3rem)] font-bold leading-tight tracking-[-0.03em]" style={stagger(0)}>
          Tu próxima canción empieza acá.
        </h2>
        <p className="reveal-item mt-4 max-w-xl text-base leading-relaxed text-muted" style={stagger(80)}>
          Contanos qué querés hacer y te respondemos con un presupuesto, sin compromiso.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal-item" style={stagger(0)}>
            <ContactForm />
          </div>

          <div className="reveal-item flex flex-col gap-4" style={stagger(120)}>
            <p className="text-xs font-medium tracking-[0.2em] text-faint">Contacto directo</p>

            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={actionClass}
            >
              <MessageCircle className="size-5 shrink-0 text-muted transition-colors group-hover:text-accent active:scale-[0.9]" />
              <span className="flex flex-col">
                <span className="text-sm font-medium">Escribir por WhatsApp</span>
                <span className="text-sm text-faint">{contact.whatsappLabel}</span>
              </span>
            </a>

            <a href={contact.phoneHref} className={actionClass}>
              <Phone className="size-5 shrink-0 text-muted transition-colors group-hover:text-accent active:scale-[0.9]" />
              <span className="flex flex-col">
                <span className="text-sm font-medium">Llamar</span>
                <span className="text-sm text-faint">{contact.phoneLabel}</span>
              </span>
            </a>

            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 py-2 text-sm text-muted transition-colors hover:text-accent active:opacity-70"
            >
              <Mail className="size-4 active:scale-[0.9]" />
              {contact.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
