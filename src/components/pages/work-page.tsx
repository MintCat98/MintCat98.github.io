"use client"

import { useState } from "react"
import { PublicationsSection } from "@/components/sections/publications-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { PressSection } from "@/components/sections/press-section"
import { AwardsSection } from "@/components/sections/awards-section"
import { Footer } from "@/components/footer"

const tabs = [
  { id: "publications", label: "Publications" },
  { id: "projects", label: "Projects" },
  { id: "press", label: "Press & Talks" },
  { id: "awards", label: "Honors & Awards" },
]

export function WorkPageContent() {
  const [activeTab, setActiveTab] = useState("publications")

  return (
    <div id="snap-container" className="h-screen overflow-y-auto">
      <div className="min-h-screen pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Work</h1>
          <p className="text-muted-foreground mb-8">A collection of my research, projects, and achievements</p>

          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-secondary text-secondary-foreground hover:bg-primary/20 hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="min-h-[500px]">
            {activeTab === "publications" && <PublicationsSection />}
            {activeTab === "projects" && <ProjectsSection />}
            {activeTab === "press" && <PressSection />}
            {activeTab === "awards" && <AwardsSection />}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
