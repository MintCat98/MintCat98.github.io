"use client"

import { useState, useEffect, useRef } from "react"
import { Star, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProjectsSectionProps {
  highlightId?: number | null
}

interface ProjectItem {
  id: number
  title: string
  description: string
  tags: string[]
  selected: boolean
  link?: string
  image: string
}

const projects: ProjectItem[] = [
  {
    id: 1,
    title: "SafeChat Framework",
    description:
      "An open-source framework for building trustworthy conversational AI systems with built-in safety guardrails",
    tags: ["Python", "PyTorch", "Transformers"],
    selected: false,
    link: "#",
    image: "/placeholder.svg",
  },
]

export function ProjectsSection({ highlightId }: ProjectsSectionProps) {
  const [showSelectedOnly, setShowSelectedOnly] = useState(false)
  const displayedProjects = showSelectedOnly ? projects.filter((p) => p.selected) : projects
  const highlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (highlightId && highlightRef.current) {
      highlightRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [highlightId])

  const CardContent = ({ project }: { project: ProjectItem }) => (
    <>
      <div className="w-full h-36 overflow-hidden">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            {project.selected && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                <Star className="w-3 h-3 fill-current" />
                Selected
              </span>
            )}
          </div>
          {project.link && (
            <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
          )}
        </div>
        <h3 className="text-foreground font-medium mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 rounded text-xs bg-secondary text-secondary-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  )

  return (
    <section id="projects">
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground text-sm">
          {projects.length} projects • {projects.filter((p) => p.selected).length} selected
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSelectedOnly(!showSelectedOnly)}
          className={cn(
            "gap-2 transition-all duration-300",
            showSelectedOnly
              ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
              : "hover:border-primary hover:text-primary",
          )}
        >
          <Star className={cn("w-4 h-4", showSelectedOnly && "fill-current")} />
          {showSelectedOnly ? "Showing Selected" : "Show Selected Only"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedProjects.map((project) => {
          const cardClasses = cn(
            "group block rounded-xl border bg-card overflow-hidden transition-all duration-300",
            "hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40 hover:-translate-y-1",
            project.selected ? "border-primary/30 bg-primary/5" : "border-border",
            project.id === highlightId && "highlight-card",
          )

          return project.link ? (
            <a
              key={project.id}
              ref={project.id === highlightId ? highlightRef as React.RefObject<HTMLAnchorElement> : null}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(cardClasses, "cursor-pointer")}
            >
              <CardContent project={project} />
            </a>
          ) : (
            <div
              key={project.id}
              ref={project.id === highlightId ? highlightRef : null}
              className={cardClasses}
            >
              <CardContent project={project} />
            </div>
          )
        })}
      </div>
    </section>
  )
}
