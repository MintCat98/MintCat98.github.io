"use client"

import { useEffect, useState, useRef } from "react"
import { ChevronDown } from "lucide-react"

interface ScrollIndicatorProps {
  targetId: string
  containerSelector?: string
}

export function ScrollIndicator({ targetId, containerSelector = "#snap-container" }: ScrollIndicatorProps) {
  const [opacity, setOpacity] = useState(0)
  const indicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = document.querySelector(containerSelector) as HTMLElement
    if (!container) return

    const handleScroll = () => {
      const indicator = indicatorRef.current
      if (!indicator) return

      const section = indicator.closest("section")
      if (!section) return

      const sectionRect = section.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      
      // 섹션이 화면 중앙에 있는지 확인
      const sectionCenter = sectionRect.top + sectionRect.height / 2
      const containerCenter = containerRect.top + containerRect.height / 2
      const distanceFromCenter = Math.abs(sectionCenter - containerCenter)
      
      // 섹션이 화면에 거의 정중앙에 있을 때
      const isInCenter = distanceFromCenter < containerRect.height * 0.3
      
      if (isInCenter) {
        // 섹션 내에서 얼마나 스크롤 되었는지 계산 (0 ~ 1)
        // 섹션 상단이 컨테이너 상단에 가까울수록 진행률이 높음
        const sectionTopOffset = containerRect.top - sectionRect.top
        const maxScroll = sectionRect.height - containerRect.height
        const scrollProgress = Math.max(0, Math.min(1, sectionTopOffset / Math.max(maxScroll, 1)))
        
        // 처음에는 안 보이다가 점점 보이게 (0.2 ~ 0.8 구간에서 페이드인)
        const fadeInProgress = Math.max(0, Math.min(1, (scrollProgress + 0.3) * 1.5))
        setOpacity(fadeInProgress * 0.9)
      } else {
        setOpacity(0)
      }
    }

    // 초기 상태 설정을 위한 타이머
    const initTimer = setTimeout(() => {
      handleScroll()
    }, 500)

    container.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })
    
    return () => {
      clearTimeout(initTimer)
      container.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [containerSelector])

  const handleClick = () => {
    const target = document.getElementById(targetId)
    
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div
      ref={indicatorRef}
      className="absolute bottom-5 left-0 right-0 flex justify-center cursor-pointer z-10"
      style={{
        opacity,
        transform: `translateY(${opacity > 0 ? 0 : 10}px)`,
        transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
        pointerEvents: opacity > 0.3 ? "auto" : "none",
      }}
      onClick={handleClick}
      role="button"
      aria-label={`Scroll to ${targetId}`}
    >
      <div className="flex flex-col items-center group -space-y-5">
        {/* 위쪽 화살표 */}
        <ChevronDown 
          className="w-20 h-8 text-muted-foreground/40 group-hover:text-primary transition-colors duration-300 animate-bounce" 
          style={{ animationDuration: "1.5s" }}
          strokeWidth={2.0}
        />
        {/* 아래쪽 화살표 */}
        <ChevronDown 
          className="w-20 h-8 text-muted-foreground/30 group-hover:text-primary/70 transition-colors duration-300 animate-bounce" 
          style={{ animationDuration: "1.5s", animationDelay: "0.15s" }}
          strokeWidth={2.0}
        />
      </div>
    </div>
  )
}
