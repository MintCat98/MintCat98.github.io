"use client"

import { Globe, Landmark, FileText, Presentation, Play, Code2, ExternalLink, Github, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

export type LinkButtonType =
  | "project" // 프로젝트 페이지
  | "venue" // 학회/저널 게재 페이지 (AAAI, CVPR 등) — 이름이 매번 바뀌므로 label을 지정해서 사용
  | "paper" // 논문 PDF
  | "slides" // 발표 슬라이드
  | "video" // 발표/데모 영상
  | "code" // 코드 저장소
  | "custom" // 임의의 버튼 — label/url 직접 지정

export interface LinkButtonItem {
  type: LinkButtonType
  url: string
  label?: string // custom/venue 이거나 기본 라벨을 오버라이드할 때 사용
}

interface LinkButtonsProps {
  links?: LinkButtonItem[]
  className?: string
}

// 미리 정의된 버튼들: 아이콘과 기본 라벨을 여기서 관리한다.
// 카드 쪽에서는 type + url 만 넘기면 되고, venue 처럼 이름이 바뀌는 건 label 로 덮어쓴다.
const linkConfig: Record<Exclude<LinkButtonType, "custom">, { icon: React.ElementType; label: string }> = {
  project: { icon: Globe, label: "Project Page" },
  venue: { icon: Landmark, label: "Publication" }, // label 지정 필수 (예: "AAAI")
  paper: { icon: FileText, label: "Paper" },
  slides: { icon: Presentation, label: "Slides" },
  video: { icon: Play, label: "Video" },
  code: { icon: Github, label: "Code" },
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
