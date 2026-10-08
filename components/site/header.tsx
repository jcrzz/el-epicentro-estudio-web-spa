"use client"

import { useState } from "react"
import { Menu, Radio, X } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* TODO: cuando cargues el logo, reemplazar el ícono por <Image src="/logo.png" alt={siteConfig.name} width={32} height={32} /> */}
        <a href="#inicio" className="flex items-center gap-2.5" aria-label={siteConfig.name}>
          <Radio className="size-5 text-accent" aria-hidden="true" />
          <span className="text-sm font-medium tracking-tight sm:text-base">{siteConfig.name}</span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="text-muted transition-colors hover:text-accent md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav
          id="menu-mobile"
          aria-label="Principal"
          className="border-t border-line bg-black/95 backdrop-blur-md md:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-4 sm:px-8">
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-3 text-sm text-muted transition-colors hover:text-accent"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
