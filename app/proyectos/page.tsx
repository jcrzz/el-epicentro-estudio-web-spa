import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ProjectsBrowser } from '@/components/projects-browser'

const LOGO_URL = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20elepicentro-GDV29L7k0s2Y03W0OtJDAPc2SrKun4.png'

export default function ProjectsPage() {
  return <main className="min-h-screen bg-background"><header className="border-b border-border"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 lg:px-10"><Link href="/" className="flex items-center gap-3 text-sm uppercase tracking-[0.16em] text-muted-foreground hover:text-primary"><ArrowLeft className="size-4" /> Volver al inicio</Link><img src={LOGO_URL} alt="El Epicentro Estudio" className="h-10 w-auto object-contain" /></div></header><div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24"><p className="mb-4 font-mono text-xs tracking-[0.2em] text-primary">ARCHIVO VIVO</p><h1 className="max-w-3xl font-serif text-6xl leading-none tracking-tight text-foreground md:text-8xl">Proyectos<span className="text-primary">.</span></h1><p className="mt-7 max-w-md leading-relaxed text-muted-foreground">Canciones, discos y sesiones que nacieron en El Epicentro. Entrá a cada ficha para conocer el proceso.</p><div className="mt-14"><ProjectsBrowser /></div></div></main>
}
