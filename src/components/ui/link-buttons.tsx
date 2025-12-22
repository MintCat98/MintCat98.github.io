"use client"

import { Globe, FileText, Presentation, Play, Code2, ExternalLink, Github, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

export type LinkButtonType = 
  | "project" 
  | "paper" 
  | "arxiv"
  | "slides" 
  | "video" 
  | "code" 
  | "github"
  | "demo" 
  | "custom"

export interface LinkButtonItem {
  type: LinkButtonType
  url: string
  label?: string // custom type이거나 기본 라벨을 오버라이드할 때 사용
}

interface LinkButtonsProps {
  links?: LinkButtonItem[]
  className?: string
}

const linkConfig: Record<Exclude<LinkButtonType, "custom">, { icon: React.ElementType; label: string }> = {
  project: { icon: Globe, label: "Project Page" },
  paper: { icon: FileText, label: "Paper" },
  arxiv: { icon: BookOpen, label: "arXiv" },
  slides: { icon: Presentation, label: "Slides" },
  video: { icon: Play, label: "Video" },
  code: { icon: Code2, label: "Code" },
  github: { icon: Github, label: "GitHub" },
  demo: { icon: ExternalLink, label: "Demo" },
}

export function LinkButtons({ links, className }: LinkButtonsProps) {
  if (!links || links.length === 0) return null

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {links.map((link, index) => {
        const config = link.type === "custom" ? null : linkConfig[link.type]
        const Icon = config?.icon ?? ExternalLink
        const label = link.label ?? config?.label ?? "Link"

        return (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium",
              "border border-border bg-background/50 text-muted-foreground",
              "hover:border-primary hover:text-primary hover:bg-primary/5",
              "transition-all duration-200"
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </a>
        )
      })}
    </div>
  )
}
