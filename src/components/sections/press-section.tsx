"use client"

import { useState, useEffect, useRef } from "react"
import { Star, ChevronRight, Mic, Newspaper, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LinkableCard } from "@/components/ui/linkable-card"
import { cn } from "@/lib/utils"

interface PressSectionProps {
  highlightId?: number | null
}

interface PressItem {
  id: number
  title: string
  source: string
  description: React.ReactNode
  type: "press" | "talk" | "lecture"
  startYear: number
  startMonth: number // 1-12
  endYear?: number // undefined if single date or ongoing
  endMonth?: number // 1-12, undefined if single date or ongoing
  ongoing?: boolean // true if currently ongoing (shows "Present")
  selected: boolean
  link?: string
  image: string
}

const pressItemsData: PressItem[] = [
  // 노션 오프보딩 발표, CUop 후기 발표
  {
    id: 1,
    title: "Dev class for beginners",
    source: "DGIST",
    description: (
      <>
        Conducted a foundational programming lecture series for freshmen at DGIST, covering topics such as
      </>
    ),
    type: "lecture",
    startYear: 2023,
    startMonth: 3,
    endYear: 2023,
    endMonth: 5,
    selected: false,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Coffee",
    source: "DGIST",
    description: (
      <>
        Coffee
      </>
    ),
    type: "press",
    startYear: 2023,
    startMonth: 5,
    selected: false,
    link: "https://dgistdna.com/716",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Notion class",
    source: "DGIST",
    description: (
      <>
        Notion class
      </>
    ),
    type: "lecture",
    startYear: 2024,
    startMonth: 11,
    selected: false,
    link: "https://luma.com/r74xd074",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    title: "Lablup 후기",
    source: "DGIST",
    description: (
      <>
        Notion class
      </>
    ),
    type: "talk",
    startYear: 2025,
    startMonth: 5,
    selected: false,
    link: "",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    title: "Notion offboarding",
    source: "DGIST",
    description: (
      <>
        Notion class
      </>
    ),
    type: "talk",
    startYear: 2025,
    startMonth: 7,
    selected: false,
    link: "https://luma.com/r74xd074",
    image: "/placeholder.svg",
  },
]

// Helper function to format date range
const formatDateRange = (item: PressItem): string => {
  const startDate = new Date(item.startYear, item.startMonth - 1).toLocaleDateString("en-US", { month: "short", year: "numeric" })
  if (!item.endYear || !item.endMonth) {
    // No end date: check if ongoing or single date
    if (item.ongoing) {
      return `${startDate} - Present`
    }
    return startDate // Single date only
  }
  const endDate = new Date(item.endYear, item.endMonth - 1).toLocaleDateString("en-US", { month: "short", year: "numeric" })
  if (item.startYear === item.endYear && item.startMonth === item.endMonth) {
    return startDate
  }
  return `${startDate} - ${endDate}`
}

// Sort items: selected first (sorted by start date desc), then non-selected (sorted by start date desc)
const pressItems = [...pressItemsData].sort((a, b) => {
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

export function PressSection({ highlightId }: PressSectionProps) {
  const [showSelectedOnly, setShowSelectedOnly] = useState(false)
  const displayedItems = showSelectedOnly ? pressItems.filter((p) => p.selected) : pressItems
  const highlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (highlightId && highlightRef.current) {
      highlightRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [highlightId])

  const CardContent = ({ item }: { item: PressItem }) => (
    <div className="flex items-start">
      <div className="hidden sm:block w-48 h-48 shrink-0 overflow-hidden rounded-l-xl">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex-1 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {item.selected && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                  <Star className="w-3 h-3 fill-current" />
                  Selected
                </span>
              )}
              <span
                className={cn(
                  "flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium",
                  item.type === "talk" ? "bg-chart-2/20 text-chart-2" : 
                  item.type === "lecture" ? "bg-chart-3/20 text-chart-3" :
                  "bg-muted text-muted-foreground",
                )}
              >
                {item.type === "talk" ? <Mic className="w-3 h-3" /> : 
                 item.type === "lecture" ? <GraduationCap className="w-3 h-3" /> :
                 <Newspaper className="w-3 h-3" />}
                {item.type}
              </span>
              <span className="text-xs text-muted-foreground">{formatDateRange(item)}</span>
            </div>
            <h3 className="text-foreground font-medium mb-1 leading-snug group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="text-primary text-sm mb-1">{item.source}</p>
            <p className="text-muted-foreground text-sm">{item.description}</p>
          </div>
          {item.link && (
            <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
          )}
        </div>
      </div>
    </div>
  )

  return (
    <section id="press">
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground text-sm">
          {pressItems.length} items • {pressItems.filter((p) => p.selected).length} selected
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

      <div className="space-y-4">
        {displayedItems.map((item) => (
          <LinkableCard
            key={item.id}
            ref={item.id === highlightId ? highlightRef : null}
            link={item.link}
            className={cn(
              item.selected ? "border-primary/30 bg-primary/5" : "border-border",
              item.id === highlightId && "highlight-card",
            )}
          >
            <CardContent item={item} />
          </LinkableCard>
        ))}
      </div>
    </section>
  )
}
