"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"

interface ScrollToTopProps {
  /** 스크롤할 컨테이너 ID (기본값: snap-container) */
  containerId?: string
  /** 버튼이 나타나기 시작하는 섹션 ID (설정하지 않으면 항상 보임) */
  showAfterSectionId?: string
  /** 추가 CSS 클래스 */
  className?: string
}

export function ScrollToTop({ 
  containerId = "snap-container", 
  showAfterSectionId,
  className = ""
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(!showAfterSectionId)

  useEffect(() => {
    if (!showAfterSectionId) {
      setIsVisible(true)
      return
    }

    const container = document.getElementById(containerId)
    if (!container) return

    const handleScroll = () => {
      const targetSection = document.getElementById(showAfterSectionId)
      if (!targetSection) return
      
      const sectionTop = targetSection.offsetTop
      setIsVisible(container.scrollTop >= sectionTop - 100)
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [containerId, showAfterSectionId])

  const scrollToTop = () => {
    const container = document.getElementById(containerId)
    container?.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-4 pointer-events-none"
      } ${className}`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  )
}
