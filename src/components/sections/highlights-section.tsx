"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { FileText, FolderOpen, Award, ArrowRight, MicIcon, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const highlights = [
  {
    id: "publications",
    icon: FileText,
    title: "Featured Publication",
    subtitle: "",
    content: "New publications are in progress! Stay tuned for my latest research updates! 👀",
    link: "/work/publications",
    linkText: "See More Publications",
    image: "/publications/cvpr26-gom.png",
  },
  {
    id: "projects",
    icon: FolderOpen,
    title: "Featured Project",
    subtitle: "Open Source",
    content: "Code Refactoring: Folder APIs in storage-proxy in Backend.AI",
    link: "/work/projects",
    linkText: "See More Projects",
    image: "/projects/backendai-folder-api-refactor.png",
  },
  {
    id: "press",
    icon: MicIcon,
    title: "Featured Press & Talks",
    subtitle: "Notion",
    content: "Delivered a retrospective talk at the Notion Campus Leader Cohort 3 offboarding ceremony!",
    link: "/work/press",
    linkText: "See More Press & Talks",
    image: "/presstalks/notion-offboarding.jpeg",
  },
  {
    id: "awards",
    icon: Award,
    title: "Featured Honor",
    subtitle: "2025",
    content: "Recognized as a top-tier undergraduate engineer for technical vision and scientific contributions!",
    link: "/work/awards",
    linkText: "See More Awards",
    image: "/awards/ipesk-next-generation-engineering-talent-2025.png",
  },
]

export function HighlightsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const lastScrollTime = useRef(0)
  const lockedScrollTop = useRef(0)
  const bufferAccumulator = useRef(0) // 버퍼 스크롤 누적값
  const bufferThreshold = 1800 // 섹션 전환을 위한 스크롤 누적 임계값
  const totalItems = highlights.length

  const isAtStart = activeIndex === 0
  const isAtEnd = activeIndex === totalItems - 1

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => Math.min(prev + 1, totalItems - 1))
  }, [totalItems])

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  // IntersectionObserver로 섹션이 화면 중앙에 있는지 감지
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const highlightsSection = section.closest("section")
    if (!highlightsSection) return

    const snapContainer = document.getElementById("snap-container")
    if (!snapContainer) return

    let lockTimeout: NodeJS.Timeout | null = null

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.9) {
            // 섹션 진입 시 snap scroll 완료를 기다린 후 잠금
            if (lockTimeout) clearTimeout(lockTimeout)
            lockTimeout = setTimeout(() => {
              lockedScrollTop.current = snapContainer.scrollTop
              bufferAccumulator.current = 0 // 버퍼 리셋
              setIsLocked(true)
            }, 500) // snap 애니메이션 완료 대기
          } else {
            if (lockTimeout) clearTimeout(lockTimeout)
            setIsLocked(false)
          }
        })
      },
      { threshold: [0.9], root: snapContainer }
    )

    observer.observe(highlightsSection)
    return () => {
      if (lockTimeout) clearTimeout(lockTimeout)
      observer.disconnect()
    }
  }, [])

  // 스크롤 잠금은 wheel 이벤트에서만 처리 (scroll 이벤트 핸들러 제거로 떨림 방지)
  // 중간 카드일 때는 snap-scroll 자체를 비활성화
  useEffect(() => {
    const snapContainer = document.getElementById("snap-container")
    if (!snapContainer) return

    if (isLocked && !isAtStart && !isAtEnd) {
      // 중간 카드: snap scroll 비활성화
      snapContainer.style.scrollSnapType = "none"
    } else {
      // 경계 또는 잠금 해제: snap scroll 복원
      snapContainer.style.scrollSnapType = ""
    }

    return () => {
      snapContainer.style.scrollSnapType = ""
    }
  }, [isLocked, isAtStart, isAtEnd])

  // wheel 이벤트로 카드 전환
  useEffect(() => {
    const snapContainer = document.getElementById("snap-container")
    if (!snapContainer) return

    const handleWheel = (e: WheelEvent) => {
      if (!isLocked) return

      const isScrollingDown = e.deltaY > 0
      const isScrollingUp = e.deltaY < 0

      // 첫 번째 카드에서 위로 스크롤: 버퍼 누적 후 이전 섹션으로
      if (isAtStart && isScrollingUp) {
        bufferAccumulator.current += Math.abs(e.deltaY)
        
        if (bufferAccumulator.current >= bufferThreshold) {
          // 임계값 도달 시 섹션 전환 허용
          bufferAccumulator.current = 0
          return // 기본 스크롤 허용
        }
        
        // 아직 임계값 미달 - 스크롤만 막음
        e.preventDefault()
        e.stopPropagation()
        return
      }

      // 마지막 카드에서 아래로 스크롤: 버퍼 누적 후 다음 섹션으로
      if (isAtEnd && isScrollingDown) {
        bufferAccumulator.current += Math.abs(e.deltaY)
        
        if (bufferAccumulator.current >= bufferThreshold) {
          // 임계값 도달 시 섹션 전환 허용
          bufferAccumulator.current = 0
          return // 기본 스크롤 허용
        }
        
        // 아직 임계값 미달 - 스크롤만 막음
        e.preventDefault()
        e.stopPropagation()
        return
      }

      // 경계에서 반대 방향으로 스크롤하면 버퍼 리셋
      if ((isAtStart && isScrollingDown) || (isAtEnd && isScrollingUp)) {
        bufferAccumulator.current = 0
      }

      // 그 외: 스크롤 막고 카드 전환
      e.preventDefault()
      e.stopPropagation()

      // 민감도 조절: deltaY가 충분히 커야 전환
      if (Math.abs(e.deltaY) < 25) return

      const now = Date.now()
      if (now - lastScrollTime.current < 600) return // 디바운스 시간 증가
      lastScrollTime.current = now

      if (isScrollingDown) {
        goToNext()
      } else if (isScrollingUp) {
        goToPrev()
      }
    }

    snapContainer.addEventListener("wheel", handleWheel, { passive: false })
    return () => snapContainer.removeEventListener("wheel", handleWheel)
  }, [isLocked, isAtStart, isAtEnd, goToNext, goToPrev])

  // 카드 위치와 스타일 계산 (비순환형)
  const getCardStyle = (index: number) => {
    const diff = index - activeIndex

    const isActive = diff === 0
    const isPrev = diff === -1
    const isNext = diff === 1
    const isHidden = Math.abs(diff) > 1

    let translateX = diff * 70
    let scale = isActive ? 1 : 0.8
    let opacity = isActive ? 1 : (isPrev || isNext) ? 0.4 : 0
    let zIndex = isActive ? 30 : 20
    let blur = isActive ? 0 : 3

    // 첫 번째 카드일 때 왼쪽(이전) 카드 숨김
    if (isAtStart && isPrev) {
      opacity = 0
    }
    // 마지막 카드일 때 오른쪽(다음) 카드 숨김
    if (isAtEnd && isNext) {
      opacity = 0
    }

    if (isHidden) {
      opacity = 0
    }

    return {
      transform: `translateX(${translateX}%) scale(${scale})`,
      opacity,
      zIndex,
      filter: `blur(${blur}px)`,
      pointerEvents: isActive ? "auto" as const : "none" as const,
    }
  }

  return (
    <div 
      ref={sectionRef}
      className="flex flex-col items-center justify-center w-full"
      style={{ overflowX: "clip" }}
    >
      <h2 className="text-2xl font-bold text-foreground mb-4 text-center">Highlights</h2>

      {/* 스크롤 힌트 - 옆으로 스와이프 애니메이션 */}
      <div className="flex items-center gap-1.5 mb-2">
        <span className="text-xs text-muted-foreground/60">Scroll to view more</span>
        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 animate-[swipe_1.5s_ease-in-out_infinite]" />
      </div>

      {/* 3D 캐러셀 컨테이너 - 그림자를 위한 패딩 추가 */}
      <div className="relative h-[520px] w-full py-5" style={{ perspective: "1200px" }}>
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
                      width={400}
                      height={225}
                      loading={index < 2 ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={index < 2 ? "high" : "auto"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* 하단 그림자 오버레이 */}
                    <div className="absolute inset-x-0 bottom-0 h-15 bg-gradient-to-t from-black/7 to-transparent pointer-events-none" />
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
      </div>

      {/* 인디케이터 */}
      <div className="flex justify-center gap-2 mt-8">
        {highlights.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? "bg-primary w-6" 
                : index < activeIndex
                ? "bg-primary/50 w-2"
                : "bg-muted-foreground/30 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
