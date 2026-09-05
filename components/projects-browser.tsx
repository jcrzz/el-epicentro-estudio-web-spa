'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, Play, X } from 'lucide-react'
import { defaultProjects, getStoredProjects, getYoutubeEmbedUrl, type Project } from '@/lib/projects'

export function ProjectsBrowser({ compact = false }: { compact?: boolean }) {
  const [projects, setProjects] = useState<Project[]>(defaultProjects)
  const [selected, setSelected] = useState<Project | null>(null)
  useEffect(() => setProjects(getStoredProjects()), [])
  return <>
    <div className={`grid gap-4 ${compact ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
      {projects.map((project) => <article key={project.id} className="group overflow-hidden border border-border bg-background">
        <div className="relative aspect-[4/3] overflow-hidden"><img src={project.image} alt={`Portada de ${project.title}, ${project.artist}`} className="size-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" /><span className="absolute left-4 top-4 bg-background px-3 py-1 font-mono text-[10px] tracking-[0.15em] text-primary">{project.type}</span></div>
        <div className="flex min-h-[225px] flex-col p-6"><h2 className="font-serif text-3xl text-foreground">{project.title}</h2><p className="mt-1 text-sm text-primary">{project.artist}</p><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p><button onClick={() => setSelected(project)} className="mt-auto inline-flex w-fit items-center gap-2 pt-6 text-xs uppercase tracking-[0.18em] text-foreground hover:text-primary">Ver proyecto <ArrowUpRight className="size-4" /></button></div>
      </article>)}
    </div>
    {selected && <div className="fixed inset-0 z-[60] grid place-items-center bg-background/85 p-4 backdrop-blur-sm" role="presentation" onClick={() => setSelected(null)}><div role="dialog" aria-modal="true" aria-labelledby="project-title" className="max-h-[90vh] w-full max-w-4xl overflow-y-auto border border-border bg-card" onClick={(event) => event.stopPropagation()}><div className="flex items-center justify-between border-b border-border p-5"><div><p className="font-mono text-[10px] tracking-[0.18em] text-primary">{selected.type}</p><h2 id="project-title" className="mt-2 font-serif text-3xl text-foreground">{selected.title}</h2></div><button onClick={() => setSelected(null)} className="grid size-10 place-items-center text-muted-foreground hover:text-primary" aria-label="Cerrar detalle"><X /></button></div><div className="grid gap-0 lg:grid-cols-2"><div className="aspect-video bg-background">{selected.actionType === 'youtube' ? <iframe className="size-full" src={getYoutubeEmbedUrl(selected.actionUrl)} title={`Video de ${selected.title}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> : <img src={selected.image} alt="" className="size-full object-cover" />}</div><div className="flex flex-col p-7 lg:p-10"><p className="text-sm uppercase tracking-[0.16em] text-primary">{selected.artist}</p><p className="mt-6 leading-relaxed text-muted-foreground">{selected.details}</p><a href={selected.actionUrl} target="_blank" rel="noreferrer" className="mt-auto inline-flex w-fit items-center gap-2 bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground hover:bg-foreground hover:text-background">{selected.actionLabel} <ArrowUpRight className="size-4" /></a></div></div></div></div>}
  </>
}
