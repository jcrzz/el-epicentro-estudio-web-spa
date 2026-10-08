export type Project = {
  id: string
  title: string
  artist: string
  release: string
  description: string
  image: string
  href: string
  actionLabel: string
}

export const seedProjects: Project[] = [
  {
    id: "todo-lo-que-queda",
    title: "Todo lo que queda",
    artist: "Lola Cobach",
    release: "EP · 2024",
    description:
      "Cinco canciones grabadas en vivo en la sala, con arreglos mínimos y la voz siempre al frente.",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=85",
    href: "https://open.spotify.com/",
    actionLabel: "Escuchar",
  },
  {
    id: "fuego-en-la-piel",
    title: "Fuego en la piel",
    artist: "Mauro Valenti",
    release: "Single · 2024",
    description:
      "Primera canción del disco: una toma, guitarras dobladas y mezcla pensada para el vivo.",
    image:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=85",
    href: "https://www.youtube.com/",
    actionLabel: "Escuchar",
  },
  {
    id: "horizonte-sur",
    title: "Horizonte Sur",
    artist: "Las Eras",
    release: "Álbum · 2023",
    description:
      "Doce temas producidos de punta a punta en El Epicentro: grabación, mezcla y mastering.",
    image:
      "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?auto=format&fit=crop&w=1200&q=85",
    href: "https://soundcloud.com/",
    actionLabel: "Escuchar",
  },
  {
    id: "nocturno-azul",
    title: "Nocturno Azul",
    artist: "Sofía Ritter",
    release: "EP · 2024",
    description:
      "Tres piezas de piano y voz grabadas en una sola sesión nocturna. Intimidad pura.",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=85",
    href: "https://bandcamp.com/",
    actionLabel: "Escuchar",
  },
  {
    id: "ruido-blanco",
    title: "Ruido Blanco",
    artist: "Los Puntos",
    release: "Single · 2024",
    description:
      "Rock crudo y directo. Grabado en cinta, mezclado en consola analógica. Sin clicks, sin cuantizar.",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=85",
    href: "https://www.youtube.com/",
    actionLabel: "Escuchar",
  },
  {
    id: "camino-inverso",
    title: "Camino Inverso",
    artist: "Valentina Mora",
    release: "Álbum · 2023",
    description:
      "Diez canciones que exploran el folk eléctrico. Producción detallada, arreglos de cuerdas propios.",
    image:
      "https://images.unsplash.com/photo-1507838153414-b4b713384ebf?auto=format&fit=crop&w=1200&q=85",
    href: "https://open.spotify.com/",
    actionLabel: "Escuchar",
  },
  {
    id: "eco-distante",
    title: "Eco Distante",
    artist: "Martín Casal",
    release: "EP · 2023",
    description:
      "Ambient experimental con guitarras procesadas y field recordings. Mastering para vinilo.",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=85",
    href: "https://soundcloud.com/",
    actionLabel: "Escuchar",
  },
  {
    id: "luz-de-umbral",
    title: "Luz de Umbral",
    artist: "Clara Vey",
    release: "Single · 2024",
    description:
      "Pop de cámara con cuarteto de cuerdas. Arreglos minimalistas, foco en la melodía vocal.",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=85",
    href: "https://www.youtube.com/",
    actionLabel: "Escuchar",
  },
  {
    id: "tierra-adentro",
    title: "Tierra Adentro",
    artist: "Facundo Ríos",
    release: "Álbum · 2022",
    description:
      "Fusión de folklore y electrónica. Grabación de instrumentos acústicos + síntesis modular.",
    image:
      "https://images.unsplash.com/photo-1571266028243-8f64ca9d4b4f?auto=format&fit=crop&w=1200&q=85",
    href: "https://bandcamp.com/",
    actionLabel: "Escuchar",
  },
]