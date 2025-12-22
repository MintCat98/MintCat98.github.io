"use client"

import { useState, useEffect, useRef } from "react"
import { Star, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LinkableCard } from "@/components/ui/linkable-card"
import { LinkButtons, type LinkButtonItem } from "@/components/ui/link-buttons"
import { TechBadge } from "@/components/ui/tech-badge"
import { cn } from "@/lib/utils"

interface ProjectsSectionProps {
  highlightId?: number | null
}

interface ProjectItem {
  id: number
  title: string
  description: React.ReactNode
  tags: string[]
  selected: boolean
  startYear: number
  startMonth: number // 1-12
  endYear?: number // undefined if ongoing
  endMonth?: number // 1-12, undefined if ongoing
  link?: string
  links?: LinkButtonItem[]
  image: string
}

const projectsData: ProjectItem[] = [
  {
    id: 1,
    title: "CoDeMP: Color Description Multimodal Pipeline",
    description: (
      <>
      Developed a multimodal pipeline (YOLOv8/FSLIC) for enhanced LLM color description as a DGIST B.S. graduation project. Investigated the trade-off between descriptive accuracy and literary creativity using novel benchmark metrics.
      </>
    ),
    tags: ["Python", "PyTorch", "Huggingface"],
    selected: false,
    startYear: 2024,
    startMonth: 2,
    endYear: 2024,
    endMonth: 12,
    image: "/projects/codemp.png",
  },
  {
    id: 2,
    title: "Code Refactoring: Folder APIs in storage-proxy in Backend.AI",
    description: (
      <>
      Refactored Backend.AI's vFolder APIs by implementing a modular service layer and layered architecture in storage-proxy. Improved system maintainability and type safety through Pydantic-based validation and module optimization.
      </>
    ),
    tags: ["Python", "aiohttp"],
    selected: true,
    startYear: 2025,
    startMonth: 1,
    endYear: 2025,
    endMonth: 3,
    link: "https://github.com/lablup/backend.ai/pulls?q=sort%3Aupdated-desc+is%3Apr+is%3Aclosed+author%3AMintCat98",
    image: "/projects/backendai-folder-api-refactor.png",
  },
]

// Helper function to format date range
const formatDateRange = (project: ProjectItem): string => {
  const startDate = new Date(project.startYear, project.startMonth - 1).toLocaleDateString("en-US", { month: "short", year: "numeric" })
  if (!project.endYear || !project.endMonth) {
    return `${startDate} - Present`
  }
  const endDate = new Date(project.endYear, project.endMonth - 1).toLocaleDateString("en-US", { month: "short", year: "numeric" })
  return `${startDate} - ${endDate}`
}

// Sort projects: selected first (sorted by start date desc), then non-selected (sorted by start date desc)
const projects = [...projectsData].sort((a, b) => {
  // First, prioritize selected items
  if (a.selected !== b.selected) {
    return a.selected ? -1 : 1
  }
  // Within the same selected status, sort by start date (newest first)
  if (a.startYear !== b.startYear) {
    return b.startYear - a.startYear
  }
  return b.startMonth - a.startMonth
})

export function ProjectsSection({ highlightId }: ProjectsSectionProps) {
  const [showSelectedOnly, setShowSelectedOnly] = useState(false)
  const displayedProjects = showSelectedOnly ? projects.filter((p) => p.selected) : projects
  const highlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (highlightId && highlightRef.current) {
      highlightRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [highlightId])

  const CardContent = ({ project, index }: { project: ProjectItem; index: number }) => (
    <>
      <div className="w-full h-36 overflow-hidden">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          width={400}
          height={144}
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={index < 2 ? "high" : "auto"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            {project.selected && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                <Star className="w-3 h-3 fill-current" />
                Selected
              </span>
            )}
            <span className="text-xs text-muted-foreground">
              {formatDateRange(project)}
            </span>
          </div>
          {project.link && (
            <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
          )}
        </div>
        <h3 className="text-foreground font-medium mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>
        <LinkButtons links={project.links} className="mb-3" />
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <TechBadge key={tag} name={tag} />
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
        {displayedProjects.map((project, index) => (
          <LinkableCard
            key={project.id}
            ref={project.id === highlightId ? highlightRef : null}
            link={project.link}
            className={cn(
              "overflow-hidden",
              project.selected ? "border-primary/30 bg-primary/5" : "border-border",
              project.id === highlightId && "highlight-card",
            )}
          >
            <CardContent project={project} index={index} />
          </LinkableCard>
        ))}
      </div>
    </section>
  )
}
