"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { ProjectTable, ProjectForm } from "@/components/admin/AdminLayout"
import { getProjects, deleteProject, updateProject, addProject } from "@/lib/admin-storage"
import type { Project } from "@/lib/projects"

export default function AdminPage() {
  const router = useRouter()
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [deletingProject, setDeletingProject] = useState<Project | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleEdit = (project: Project) => {
    setEditingProject(project)
  }

  const handleDelete = (project: Project) => {
    setDeletingProject(project)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    if (deletingProject) {
      deleteProject(deletingProject.id)
      setDeletingProject(null)
      setShowDeleteConfirm(false)
    }
  }

  const cancelDelete = () => {
    setDeletingProject(null)
    setShowDeleteConfirm(false)
  }

  const handleFormSubmit = (data: Project) => {
    if (editingProject) {
      updateProject(editingProject.id, data)
    } else {
      addProject(data)
    }
    setEditingProject(null)
    router.refresh()
  }

  const handleCancel = () => {
    setEditingProject(null)
  }

  if (editingProject) {
    return (
      <ProjectForm
        initialData={editingProject}
        onSubmit={handleFormSubmit}
        onCancel={handleCancel}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Proyectos</h1>
          <p className="text-muted mt-1">Gestioná los proyectos que se muestran en el carrusel.</p>
        </div>
        <button
          onClick={() => router.push("/admin/nuevo")}
          className="inline-flex items-center gap-2 bg-accent px-6 py-3 text-sm font-medium text-black hover:bg-accent-strong"
        >
          <Plus className="size-4" />
          Nuevo proyecto
        </button>
      </div>

      <ProjectTable onEdit={handleEdit} onDelete={handleDelete} />

      {showDeleteConfirm && deletingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-background border border-line rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-2">Eliminar proyecto</h3>
            <p className="text-muted mb-6">
              ¿Seguro que querés eliminar <strong className="text-foreground">{deletingProject.title}</strong>?
              Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-line text-sm font-medium text-muted hover:border-accent hover:text-accent transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-accent text-sm font-medium text-black hover:bg-accent-strong transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}