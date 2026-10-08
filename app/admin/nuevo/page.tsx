"use client"

import { useRouter } from "next/navigation"
import { ProjectForm } from "@/components/admin/AdminLayout"
import { addProject } from "@/lib/admin-storage"

export default function NewProjectPage() {
  const router = useRouter()

  const handleSubmit = (data: { id: string; [key: string]: unknown }) => {
    addProject(data as any)
    router.push("/admin")
    router.refresh()
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <ProjectForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  )
}