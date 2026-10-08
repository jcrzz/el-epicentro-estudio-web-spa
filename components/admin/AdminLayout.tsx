"use client"

import { ChevronLeft, ChevronRight, Menu, X, Radio, Trash2, Edit2, Plus, Save, Loader2 } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { getProjects, deleteProject } from "@/lib/admin-storage"
import { ImageUploader } from "./ImageUploader"
import type { Project as ProjectType } from "@/lib/projects"

const navItems = [
  { href: "/admin", label: "Proyectos", icon: Radio },
  { href: "/admin/nuevo", label: "Nuevo", icon: Plus },
] as const

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background flex">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-line transform transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Navegación admin"
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-line lg:justify-center lg:px-0">
          <Radio className="size-6 text-accent" aria-hidden="true" />
          <span className="font-medium tracking-tight">Admin</span>
          <button
            className="lg:hidden p-2"
            onClick={() => setSidebarOpen(false)}
            aria-label="Cerrar menú"
          >
            <X className="size-5" />
          </button>
        </div>
        <nav className="p-4 space-y-2" aria-label="Principal">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent/10 text-accent border border-accent/30"
                    : "text-muted hover:text-foreground hover:bg-white/[0.03]"
                }`}
              >
                <Icon className="size-5 shrink-0" aria-hidden="true" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        <header className="sticky top-0 z-40 h-16 bg-background/80 backdrop-blur-sm border-b border-line flex items-center justify-between px-5 lg:px-8">
          <button
            className="lg:hidden p-2"
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu className="size-5" />
          </button>
          <h1 className="text-lg font-medium tracking-tight">
            {navItems.find((n) => pathname === n.href || (n.href !== "/admin" && pathname.startsWith(n.href)))?.label || "Admin"}
          </h1>
        </header>

        <main className="flex-1 p-5 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export function ProjectForm({ initialData, onSubmit, onCancel }: {
  initialData?: Partial<ProjectType>
  onSubmit: (data: ProjectType) => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [artist, setArtist] = useState(initialData?.artist || "")
  const [release, setRelease] = useState(initialData?.release || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [href, setHref] = useState(initialData?.href || "")
  const [actionLabel, setActionLabel] = useState(initialData?.actionLabel || "Escuchar")
  const [image, setImage] = useState<string>(initialData?.image || "")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof ProjectType, string>>>({})

  const validate = () => {
    const newErrors: Partial<Record<keyof ProjectType, string>> = {}
    if (!title.trim()) newErrors.title = "Título requerido"
    if (!artist.trim()) newErrors.artist = "Artista requerido"
    if (!release.trim()) newErrors.release = "Lanzamiento requerido"
    if (!description.trim()) newErrors.description = "Descripción requerida"
    if (!href.trim()) newErrors.href = "Enlace requerido"
    else if (!href.startsWith("http")) newErrors.href = "URL inválida"
    if (!image.trim()) newErrors.image = "Imagen requerida"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    const data: ProjectType = {
      id: initialData?.id || crypto.randomUUID(),
      title: title.trim(),
      artist: artist.trim(),
      release: release.trim(),
      description: description.trim(),
      href: href.trim(),
      actionLabel: actionLabel.trim() || "Escuchar",
      image: image.trim(),
    }
    setTimeout(() => {
      onSubmit(data)
      setLoading(false)
    }, 300)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6" noValidate>
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-medium tracking-tight">{initialData?.id ? "Editar proyecto" : "Nuevo proyecto"}</h2>
        {loading && <Loader2 className="size-5 text-accent animate-spin" />}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="title" className="block text-xs text-faint mb-1">Título</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-0 border-b-2 border-line bg-transparent px-0 py-3 text-base text-foreground placeholder:text-faint transition-colors focus:border-accent focus:outline-none"
            placeholder="Título del proyecto"
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && <p id="title-error" className="mt-1 text-sm text-accent">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="artist" className="block text-xs text-faint mb-1">Artista / Banda</label>
          <input
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="w-full border-0 border-b-2 border-line bg-transparent px-0 py-3 text-base text-foreground placeholder:text-faint transition-colors focus:border-accent focus:outline-none"
            placeholder="Nombre del artista"
            aria-invalid={!!errors.artist}
            aria-describedby={errors.artist ? "artist-error" : undefined}
          />
          {errors.artist && <p id="artist-error" className="mt-1 text-sm text-accent">{errors.artist}</p>}
        </div>

        <div>
          <label htmlFor="release" className="block text-xs text-faint mb-1">Lanzamiento</label>
          <input
            id="release"
            value={release}
            onChange={(e) => setRelease(e.target.value)}
            className="w-full border-0 border-b-2 border-line bg-transparent px-0 py-3 text-base text-foreground placeholder:text-faint transition-colors focus:border-accent focus:outline-none"
            placeholder="Ej: EP · 2024"
            aria-invalid={!!errors.release}
            aria-describedby={errors.release ? "release-error" : undefined}
          />
          {errors.release && <p id="release-error" className="mt-1 text-sm text-accent">{errors.release}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="description" className="block text-xs text-faint mb-1">Descripción</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border-0 border-b-2 border-line bg-transparent px-0 py-3 text-base text-foreground placeholder:text-faint transition-colors focus:border-accent focus:outline-none resize-none"
            placeholder="Breve reseña del trabajo realizado"
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? "description-error" : undefined}
          />
          {errors.description && <p id="description-error" className="mt-1 text-sm text-accent">{errors.description}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="href" className="block text-xs text-faint mb-1">Enlace externo</label>
          <input
            id="href"
            value={href}
            onChange={(e) => setHref(e.target.value)}
            type="url"
            className="w-full border-0 border-b-2 border-line bg-transparent px-0 py-3 text-base text-foreground placeholder:text-faint transition-colors focus:border-accent focus:outline-none"
            placeholder="https://open.spotify.com/..."
            aria-invalid={!!errors.href}
            aria-describedby={errors.href ? "href-error" : undefined}
          />
          {errors.href && <p id="href-error" className="mt-1 text-sm text-accent">{errors.href}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="actionLabel" className="block text-xs text-faint mb-1">Texto del botón</label>
          <input
            id="actionLabel"
            value={actionLabel}
            onChange={(e) => setActionLabel(e.target.value)}
            className="w-full border-0 border-b-2 border-line bg-transparent px-0 py-3 text-base text-foreground placeholder:text-faint transition-colors focus:border-accent focus:outline-none"
            placeholder="Escuchar"
          />
        </div>

        <div className="sm:col-span-2">
          <ImageUploader
            value={image}
            onChange={setImage}
            error={errors.image}
          />
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-line">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-accent px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-accent-strong disabled:opacity-50 disabled:cursor-wait"
        >
          <Save className="size-4" />
          {loading ? "Guardando..." : initialData?.id ? "Actualizar" : "Crear"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-2 border border-line px-6 py-3 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
        >
          <ChevronLeft className="size-4" />
          Cancelar
        </button>
      </div>
    </form>
  )
}

export function ProjectTable({ onEdit, onDelete }: {
  onEdit: (project: ProjectType) => void
  onDelete: (project: ProjectType) => void
}) {
  const router = useRouter()
  const projects = getProjects()

  if (projects.length === 0) {
    return (
      <div className="text-center py-16">
        <Radio className="size-12 text-line mx-auto mb-4" aria-hidden="true" />
        <h3 className="text-lg font-medium mb-2">Sin proyectos</h3>
        <p className="text-muted mb-6">Creá el primer proyecto para empezar.</p>
        <button
          onClick={() => router.push("/admin/nuevo")}
          className="inline-flex items-center gap-2 bg-accent px-6 py-3 text-sm font-medium text-black hover:bg-accent-strong"
        >
          <Plus className="size-4" />
          Crear proyecto
        </button>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left" role="grid">
        <thead>
          <tr className="border-b border-line text-xs font-medium text-faint uppercase tracking-wider">
            <th className="pb-3">Portada</th>
            <th className="pb-3">Título</th>
            <th className="pb-3">Artista</th>
            <th className="pb-3">Lanzamiento</th>
            <th className="pb-3 w-32">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-b border-line/50 hover:bg-white/[0.02]">
              <td className="py-4">
                <img
                  src={project.image}
                  alt=""
                  className="size-16 rounded-lg object-cover border border-line"
                  loading="lazy"
                />
              </td>
              <td className="py-4 font-medium max-w-xs truncate">{project.title}</td>
              <td className="py-4 text-muted">{project.artist}</td>
              <td className="py-4 text-xs text-faint">{project.release}</td>
              <td className="py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(project)}
                    className="p-2 rounded-lg text-muted hover:text-accent hover:bg-white/[0.05] transition-colors"
                    aria-label={`Editar ${project.title}`}
                  >
                    <Edit2 className="size-4" />
                  </button>
                  <button
                    onClick={() => onDelete(project)}
                    className="p-2 rounded-lg text-muted hover:text-accent hover:bg-white/[0.05] transition-colors"
                    aria-label={`Eliminar ${project.title}`}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}