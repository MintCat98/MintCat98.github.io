"use client"

import { useState, useEffect } from "react"
import { PublicationsSection } from "@/components/sections/publications-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { PressSection } from "@/components/sections/press-section"
import { AwardsSection } from "@/components/sections/awards-section"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/ui/scroll-to-top"

const tabs = [
  { id: "publications", label: "Publications", href: "/work/publications" },
  { id: "projects", label: "Projects", href: "/work/projects" },
  { id: "press", label: "Press & Talks", href: "/work/press" },
  { id: "awards", label: "Honors & Awards", href: "/work/awards" },
]

interface WorkPageContentProps {
  activeTab?: string
}

export function WorkPageContent({ activeTab = "publications" }: WorkPageContentProps) {
  const [highlightId, setHighlightId] = useState<number | null>(null)

  useEffect(() => {
    // Parse URL parameters on mount for highlight
    const params = new URLSearchParams(window.location.search)
    const highlight = params.get("highlight")

    if (highlight) {
      const id = parseInt(highlight, 10)
      if (!isNaN(id)) {
        setHighlightId(id)
        // Clear highlight after 3 seconds
        const timer = setTimeout(() => {
          setHighlightId(null)
          // Clean up URL params
          window.history.replaceState({}, "", window.location.pathname)
        }, 3000)
        return () => clearTimeout(timer)
      }
    }
  }, [activeTab])

  return (
    <div id="snap-container" className="h-screen overflow-y-auto">
      <div className="min-h-screen pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Work</h1>
          <p className="text-muted-foreground mb-8">A collection of my research, projects, and achievements</p>

          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <a
                key={tab.id}
                href={tab.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-secondary text-secondary-foreground hover:bg-primary/20 hover:text-primary"
                }`}
              >
                {tab.label}
              </a>
            ))}
          </div>

          <div className="min-h-[500px]">
            {activeTab === "publications" && <PublicationsSection highlightId={highlightId} />}
            {activeTab === "projects" && <ProjectsSection highlightId={highlightId} />}
            {activeTab === "press" && <PressSection highlightId={highlightId} />}
            {activeTab === "awards" && <AwardsSection highlightId={highlightId} />}
          </div>
        </div>

        <ScrollToTop className="bottom-6 right-6" />

        <Footer />
      </div>
    </div>
  )
}
