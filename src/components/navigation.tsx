"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"

const navItems = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Experience", href: "/experience" },
]

export function Navigation({ pathname }: { pathname: string }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    // 스냅 컨테이너 스크롤 감지 (Home 페이지용)
    const snapContainer = document.getElementById("snap-container")
    const handleSnapScroll = () => {
      if (snapContainer) {
        setScrolled(snapContainer.scrollTop > 50)
      }
    }

    window.addEventListener("scroll", handleScroll)
    snapContainer?.addEventListener("scroll", handleSnapScroll)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      snapContainer?.removeEventListener("scroll", handleSnapScroll)
    }
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass py-3" : "bg-transparent py-6",
      )}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="/" className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
          MintCat98
        </a>
        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors relative",
                pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
              {pathname === item.href && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </a>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
