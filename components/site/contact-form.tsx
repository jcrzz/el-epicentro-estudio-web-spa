"use client"

import { useState } from "react"
import { siteConfig } from "@/lib/site-config"

type Status = { kind: "idle" } | { kind: "sent" } | { kind: "loading" }

const inputClass =
  "w-full border-0 border-b-2 border-line bg-transparent px-0 py-3 text-base text-foreground placeholder:text-faint transition-colors focus:border-accent focus:outline-none hover:border-line/50"

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" })

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus({ kind: "loading" })
    // Sin backend: abrimos el cliente de correo con el mensaje ya cargado.
    // TODO: conectar con un servicio real (Formspree, Resend, route handler...) cuando haya backend.
    const data = new FormData(event.currentTarget)
    const name = String(data.get("name") ?? "")
    const email = String(data.get("email") ?? "")
    const message = String(data.get("message") ?? "")

    const subject = encodeURIComponent(`Consulta desde la web — ${name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`)
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`

    setTimeout(() => setStatus({ kind: "sent" }), 200)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-xs text-faint">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Tu nombre"
          className={inputClass}
          disabled={status.kind === "loading"}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-xs text-faint">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="tu@email.com"
          className={inputClass}
          disabled={status.kind === "loading"}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-xs text-faint">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Contanos qué querés grabar"
          className={`${inputClass} resize-none`}
          disabled={status.kind === "loading"}
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status.kind === "loading"}
          className="inline-flex items-center justify-center bg-accent px-8 py-3.5 text-sm font-medium text-black transition-colors hover:bg-accent-strong active:scale-[0.98] disabled:opacity-50 disabled:cursor-wait"
        >
          {status.kind === "loading" && <span className="mr-2 animate-pulse" aria-hidden="true">⏳</span>}
          {status.kind === "loading" ? "Enviando..." : "Enviar consulta"}
        </button>
        {status.kind === "sent" && (
          <p role="status" className="animate-in fade-in text-sm text-muted">
            Se abrió tu app de correo. Si no pasó nada, escribinos a {siteConfig.contact.email}.
          </p>
        )}
      </div>
    </form>
  )
}
