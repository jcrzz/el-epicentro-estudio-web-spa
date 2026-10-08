/**
 * Configuración central del sitio.
 * Todo dato "de marca" vive acá para poder cambiarlo en un solo lugar.
 */
export const siteConfig = {
  name: "El Epicentro Estudio",
  shortName: "Epicentro",
  tagline: "Donde las ideas suenan.",
  city: "Gualeguaychú, Argentina",
  description:
    "Estudio de grabación, mezcla y mastering en Gualeguaychú. Trabajá sin presiones, con tiempo y comodidad.",
  services: ["GRABACIÓN", "MEZCLA", "MASTERING"],
  contact: {
    // TODO: placeholders — reemplazar con los datos reales del estudio.
    phoneLabel: "+54 9 3446 00-0000",
    phoneHref: "tel:+5493446000000",
    whatsappLabel: "+54 9 3446 00-0000",
    whatsappHref:
      "https://wa.me/5493446000000?text=Hola%20El%20Epicentro%2C%20quiero%20consultar%20por%20un%20presupuesto.",
    // TODO: reemplazar con el correo real.
    email: "hola@elepicentroestudio.com",
  },
  nav: [
    { label: "Inicio", href: "#inicio" },
    { label: "Estudio", href: "#estudio" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Contacto", href: "#contacto" },
  ],
} as const

export type SiteConfig = typeof siteConfig
