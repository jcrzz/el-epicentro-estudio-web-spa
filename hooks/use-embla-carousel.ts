"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"

export function useEmblaCarouselLoop(
  options?: Parameters<typeof useEmblaCarousel>[0]
) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnapped, setScrollSnapped] = useState(false)

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", ...options })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const onInit = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    const onSettle = () => setScrollSnapped(true)

    emblaApi.on("init", onInit)
    emblaApi.on("select", onSelect)
    emblaApi.on("settle", onSettle)

    onInit()

    return () => {
      emblaApi.off("init", onInit)
      emblaApi.off("select", onSelect)
      emblaApi.off("settle", onSettle)
    }
  }, [emblaApi])

  return { emblaRef, emblaApi, scrollPrev, scrollNext, selectedIndex, scrollSnapped }
}