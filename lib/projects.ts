export type Project = {
  id: string
  type: string
  title: string
  artist: string
  description: string
  image: string
  actionLabel: string
  actionUrl: string
  actionType: 'youtube' | 'external'
  details: string
}

export const defaultProjects: Project[] = [
  { id: 'todo-lo-que-queda', type: 'EP / 2024', title: 'Todo lo que queda', artist: 'Lola Cobach', description: 'Canciones para bailar despacio y sentir fuerte.', image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=85', actionLabel: 'Escuchar en Spotify', actionUrl: 'https://open.spotify.com/', actionType: 'external', details: 'Grabación, edición y mezcla del EP completo. Un registro cercano, cálido y con espacio para que cada canción respire.' },
  { id: 'fuego-en-la-piel', type: 'SINGLE / 2024', title: 'Fuego en la piel', artist: 'Mauro Valenti', description: 'Una sesión íntima, analógica y llena de textura.', image: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?auto=format&fit=crop&w=1200&q=85', actionLabel: 'Ver videoclip', actionUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', actionType: 'youtube', details: 'Una producción de una jornada, registrada en vivo en la sala principal y terminada con mezcla híbrida.' },
  { id: 'horizonte-sur', type: 'ALBUM / 2023', title: 'Horizonte Sur', artist: 'Las Eras', description: 'El pulso de una banda tocando en la misma habitación.', image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=85', actionLabel: 'Escuchar álbum', actionUrl: 'https://soundcloud.com/', actionType: 'external', details: 'Grabación de banda completa con overdubs puntuales. La premisa fue conservar el pulso y la energía de las primeras tomas.' },
]

export const PROJECTS_KEY = 'epicentro-projects'

export function getStoredProjects(): Project[] {
  if (typeof window === 'undefined') return defaultProjects
  try { return JSON.parse(localStorage.getItem(PROJECTS_KEY) || '') || defaultProjects } catch { return defaultProjects }
}

export function getYoutubeEmbedUrl(url: string) {
  try { const parsed = new URL(url); const id = parsed.searchParams.get('v') || parsed.pathname.split('/').filter(Boolean).pop(); return id ? `https://www.youtube.com/embed/${id}` : url } catch { return url }
}
