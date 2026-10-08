"use client"

import { useState, useCallback, useRef } from "react"
import { Upload, X, Link2, Image as ImageIcon, Loader2 } from "lucide-react"
import { fileToBase64, validateImageFile } from "@/lib/admin-storage"

type UploadMethod = "url" | "file"

export function ImageUploader({ value, onChange, error }: {
  value: string
  onChange: (value: string) => void
  error?: string
}) {
  const [method, setMethod] = useState<UploadMethod>("url")
  const [url, setUrl] = useState(value.startsWith("http") ? value : "")
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(value && !value.startsWith("http") ? value : null)
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUrlChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
    if (e.target.value.startsWith("http")) {
      onChange(e.target.value)
      setPreview(null)
      setFile(null)
    }
  }, [onChange])

  const handleFileSelect = useCallback(async (selectedFile: File) => {
    const validation = validateImageFile(selectedFile)
    if (!validation.valid) {
      alert(validation.error)
      return
    }
    setLoading(true)
    setFile(selectedFile)
    try {
      const base64 = await fileToBase64(selectedFile)
      setPreview(base64)
      onChange(base64)
    } catch {
      alert("Error al leer la imagen")
    } finally {
      setLoading(false)
    }
  }, [onChange])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) handleFileSelect(droppedFile)
  }, [handleFileSelect])

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) handleFileSelect(selectedFile)
  }, [handleFileSelect])

  const clearImage = useCallback(() => {
    setUrl("")
    setFile(null)
    setPreview(null)
    onChange("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }, [onChange])

  const currentPreview = preview || (url.startsWith("http") ? url : null)

  return (
    <div className="space-y-4">
      <div className="flex gap-2 border-b border-line" role="tablist" aria-label="Método de imagen">
        <button
          type="button"
          role="tab"
          aria-selected={method === "url"}
          aria-controls="url-panel"
          id="url-tab"
          onClick={() => setMethod("url")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            method === "url"
              ? "border-accent text-accent"
              : "border-transparent text-faint hover:text-muted"
          }`}
        >
          <Link2 className="size-4 inline-block mr-1" aria-hidden="true" />
          Enlace directo
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={method === "file"}
          aria-controls="file-panel"
          id="file-tab"
          onClick={() => setMethod("file")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            method === "file"
              ? "border-accent text-accent"
              : "border-transparent text-faint hover:text-muted"
          }`}
        >
          <Upload className="size-4 inline-block mr-1" aria-hidden="true" />
          Subir archivo
        </button>
      </div>

      <div role="tabpanel" id="url-panel" aria-labelledby="url-tab" hidden={method !== "url"}>
        <label htmlFor="image-url" className="sr-only">URL de la imagen</label>
        <input
          id="image-url"
          type="url"
          value={url}
          onChange={handleUrlChange}
          placeholder="https://ejemplo.com/imagen.jpg"
          className="w-full border-0 border-b-2 border-line bg-transparent px-0 py-3 text-base text-foreground placeholder:text-faint transition-colors focus:border-accent focus:outline-none"
          aria-invalid={!!error && method === "url"}
        />
      </div>

      <div role="tabpanel" id="file-panel" aria-labelledby="file-tab" hidden={method !== "file"}>
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            dragActive
              ? "border-accent bg-accent/5"
              : "border-line hover:border-accent/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Seleccionar imagen"
            disabled={loading}
          />
          {loading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="size-8 text-accent animate-spin" />
              <p className="text-sm text-muted">Procesando imagen...</p>
            </div>
          ) : currentPreview ? (
            <div className="relative max-w-xs mx-auto">
              <img
                src={currentPreview}
                alt="Vista previa"
                className="aspect-square w-full rounded-lg object-cover border border-line"
              />
              <button
                type="button"
                onClick={clearImage}
                className="absolute -top-2 -right-2 p-1 rounded-full bg-background/80 backdrop-blur-sm border border-line text-muted hover:text-accent hover:border-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="Eliminar imagen"
              >
                <X className="size-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <ImageIcon className="size-10 text-line" aria-hidden="true" />
              <div className="text-sm">
                <p className="font-medium">Arrastrá una imagen aquí</p>
                <p className="text-faint">o hacé clic para seleccionar (max 5MB)</p>
              </div>
            </div>
          )}
        </div>
        {currentPreview && method === "file" && (
          <p className="mt-2 text-xs text-faint text-center">Imagen guardada en localStorage (base64)</p>
        )}
      </div>

      {error && <p className="text-sm text-accent" role="alert">{error}</p>}
    </div>
  )
}