"use client"

import type { Project } from "./projects"
import { seedProjects } from "./projects"

const STORAGE_KEY = "el-epicentro-projects"
const SEED_VERSION_KEY = "el-epicentro-seed-version"
const CURRENT_SEED_VERSION = 1

export function getStoredProjects(): Project[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) return parsed
    }
  } catch {
    // ignore parse errors
  }
  return []
}

export function setStoredProjects(projects: Project[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}

export function getProjects(): Project[] {
  const stored = getStoredProjects()
  if (stored.length > 0) return stored
  return seedProjects
}

export function addProject(project: Project): Project[] {
  const projects = getProjects()
  const updated = [...projects, project]
  setStoredProjects(updated)
  return updated
}

export function updateProject(id: string, data: Partial<Project>): Project[] {
  const projects = getProjects()
  const updated = projects.map((p) => (p.id === id ? { ...p, ...data } : p))
  setStoredProjects(updated)
  return updated
}

export function deleteProject(id: string): Project[] {
  const projects = getProjects()
  const updated = projects.filter((p) => p.id !== id)
  setStoredProjects(updated)
  return updated
}

export function resetToSeed(seedProjects: Project[]): Project[] {
  if (typeof window === "undefined") return seedProjects
  localStorage.removeItem(STORAGE_KEY)
  localStorage.setItem(SEED_VERSION_KEY, String(CURRENT_SEED_VERSION))
  return seedProjects
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: "Formato no válido. Usá JPG, PNG, WebP o GIF." }
  }
  if (file.size > 5 * 1024 * 1024) {
    return { valid: false, error: "La imagen no debe superar 5MB." }
  }
  return { valid: true }
}