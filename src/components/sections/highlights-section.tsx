"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { FileText, FolderOpen, Award, ArrowRight, MicIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const highlights = [
  {
    id: "publications",
    icon: FileText,
    title: "Featured Publication",
    subtitle: "",
    content: "New publications are in progress! Stay tuned for my latest research updates! 👀",
    link: "/work?tab=publications",
    linkText: "See More Publications",
    image: "/publications/cvpr26-gom.png",
  },
  {
    id: "projects",
    icon: FolderOpen,
    title: "Featured Project",
    subtitle: "Open Source",
    content: "Code Refactoring: Folder APIs in storage-proxy in Backend.AI",
    link: "/work?tab=projects",
    linkText: "See More Projects",
    image: "/projects/backendai-folder-api-refactor.png",
  },
  {
    id: "press",
    icon: MicIcon,
    title: "Featured Press & Talks",
    subtitle: "Notion",
    content: "Code Refactoring: Folder APIs in storage-proxy in Backend.AI",
    link: "/work?tab=press",
    linkText: "See More Press & Talks",
    image: "/presstalks/notion-offboarding.jpeg",
  },
  {
    id: "awards",
    icon: Award,
    title: "Featured Honor",
    subtitle: "2025",
    content: "Recognized as a top-tier undergraduate engineer for technical vision and scientific contributions!",
    link: "/work?tab=awards",
    linkText: "See More Awards",
    image: "/awards/ipesk-next-generation-engineering-talent-2025.png",
  },
]

export function HighlightsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const isScrollingRef = useRef(false)
  const lastScrollTime = useRef(0)

  const totalItems = highlights.length

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalItems)
  }, [totalItems])

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems)
  }, [totalItems])

  // 스크롤 기반 카드 전환
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect()
      const isInView = rect.top <= 100 && rect.bottom >= window.innerHeight - 100

      if (isInView) {
        const now = Date.now()
        if (now - lastScrollTime.current < 400) return // 디바운스
        
        if (Math.abs(e.deltaY) > 30) {
          e.preventDefault()
          lastScrollTime.current = now
          
          if (e.deltaY > 0) {
            goToNext()
          } else {
            goToPrev()
          }
        }
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [goToNext, goToPrev])

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        goToNext()
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        goToPrev()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToNext, goToPrev])

  // 카드 위치와 스타일 계산
  const getCardStyle = (index: number) => {
    const diff = index - activeIndex
    // 순환 처리
    let normalizedDiff = diff
    if (diff > totalItems / 2) normalizedDiff = diff - totalItems
    if (diff < -totalItems / 2) normalizedDiff = diff + totalItems

    const isActive = normalizedDiff === 0
    const isAdjacent = Math.abs(normalizedDiff) === 1
    const isHidden = Math.abs(normalizedDiff) > 1

    // 기본 스타일
    let translateX = normalizedDiff * 70 // 좌우 이동 (%)
    let translateZ = isActive ? 0 : isAdjacent ? -150 : -300 // 깊이
    let scale = isActive ? 1 : isAdjacent ? 0.8 : 0.6
    let opacity = isActive ? 1 : isAdjacent ? 0.5 : 0
    let zIndex = isActive ? 30 : isAdjacent ? 20 : 10
    let blur = isActive ? 0 : isAdjacent ? 2 : 4

    return {
      transform: `translateX(${translateX}%) translateZ(${translateZ}px) scale(${scale})`,
      opacity,
      zIndex,
      filter: `blur(${blur}px)`,
      pointerEvents: isActive ? "auto" as const : "none" as const,
    }
  }

  return (
    <section 
      ref={sectionRef}
      id="highlights" 
      className="flex flex-col items-center justify-center min-h-screen py-12 overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-foreground mb-4 text-center">Highlights</h2>
        <br />

        {/* 3D 캐러셀 컨테이너 */}
        <div className="relative h-[480px] perspective-[1200px]" style={{ perspective: "1200px" }}>
          <div className="absolute inset-0 flex items-center justify-center">
            {highlights.map((item, index) => (
              <div
                key={item.id}
                className="absolute w-full max-w-md transition-all duration-500 ease-out"
                style={getCardStyle(index)}
              >
                <a href={item.link} className="block">
                  <Card className="group cursor-pointer bg-card border-border hover:border-primary/50 overflow-hidden p-0 shadow-2xl">
                    {/* 16:9 이미지 영역 */}
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* 하단 그림자 오버레이 */}
                      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/7 to-transparent pointer-events-none" />
                      {/* 오버레이: 아이콘과 subtitle */}
                      <div className="absolute bottom-3 left-5 right-5 flex items-end justify-between">
                        <div className="p-2 rounded-lg bg-background/80 backdrop-blur-sm shadow-sm group-hover:bg-primary/20 transition-colors duration-300">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        {item.subtitle && (
                          <span className="px-2.5 py-1 text-xs font-medium text-foreground bg-background/80 backdrop-blur-sm rounded-full shadow-sm">
                            {item.subtitle}
                          </span>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-7 pb-10 pt-0 flex flex-col">
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.content}</p>
                      <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all duration-300">
                        {item.linkText}
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </div>
            ))}
          </div>

          {/* 네비게이션 버튼 */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 shadow-lg"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 shadow-lg"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>
        </div>
        <br />

        {/* 인디케이터 */}
        <div className="flex justify-center gap-2 mt-8">
          {highlights.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? "bg-primary w-6" 
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
