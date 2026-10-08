"use client"

import { Radio } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const stagger = (ms: number) => ({ "--stagger": ms } as React.CSSProperties)

export function Footer() {
  const { ref, isVisible } = useScrollReveal(0.05)

  return (
    <footer className="border-t border-line">
      <div
        ref={ref}
        className={`mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between ${isVisible ? "reveal-in" : ""}`}
      >
        <div className="reveal-item flex items-center gap-2.5" style={stagger(0)}>
          {/* TODO: mismo placeholder de logo que en el header */}
          <Radio className="size-4 text-accent" aria-hidden="true" />
          <span className="text-sm font-medium tracking-tight">{siteConfig.name}</span>
        </div>

        <nav className="reveal-item flex flex-wrap gap-x-6 gap-y-2" aria-label="Pie de página" style={stagger(80)}>
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-accent active:opacity-70"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <p className="reveal-item text-sm text-faint" style={stagger(160)}>
          © {new Date().getFullYear()} {siteConfig.shortName} · {siteConfig.city}
        </p>
      </div>
    </footer>
  )
}
