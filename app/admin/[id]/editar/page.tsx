"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ProjectForm } from "@/components/admin/AdminLayout"
import { getProjects, updateProject } from "@/lib/admin-storage"
import type { Project } from "@/lib/projects"

export default function EditProjectPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = params.id as string
    const projects = getProjects()
    const found = projects.find((p) => p.id === id)
    if (found) {
      setProject(found)
    } else {
      router.push("/admin")
    }
    setLoading(false)
  }, [params.id, router])

  if (loading || !project) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-muted">Cargando...</div>
      </div>
    )
  }

  const handleSubmit = (data: Project) => {
    updateProject(project.id, data)
    router.push("/admin")
    router.refresh()
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <ProjectForm
      initialData={project}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  )
}