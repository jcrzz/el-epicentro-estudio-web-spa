"use client"

import { useEffect, useRef, useState } from "react"
import { Menu, Radio, X } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

const SCROLL_HIDE_THRESHOLD = 8

export function Header() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          if (currentY > SCROLL_HIDE_THRESHOLD && currentY > lastScrollY.current) {
            setHidden(true)
          } else if (currentY < lastScrollY.current) {
            setHidden(false)
          }

          lastScrollY.current = currentY
          ticking.current = false
        })
        ticking.current = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-black/70 backdrop-blur-md transition-transform duration-300 ease-out will-change-transform supports-[backdrop-filter]:bg-black/70 motion-reduce:transition-none motion-reduce:transform-none ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#inicio" className="flex items-center gap-2.5" aria-label={siteConfig.name}>
          <Radio className="size-5 text-accent" aria-hidden="true" />
          <span className="text-sm font-medium tracking-tight sm:text-base">{siteConfig.name}</span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 top-16 z-40 bg-black/90 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)} />
      )}

      <nav
        id="menu-mobile"
        aria-label="Principal"
        className={`border-t border-line bg-black/95 backdrop-blur-md transition-all duration-200 ease-out md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-6xl flex-col px-5 py-4 sm:px-8">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="py-3 text-sm text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}