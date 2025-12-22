"use client"

import { useState, useEffect, useRef } from "react"
import { Star, ChevronRight, Mic, Newspaper, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LinkableCard } from "@/components/ui/linkable-card"
import { LinkButtons, type LinkButtonItem } from "@/components/ui/link-buttons"
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
  links?: LinkButtonItem[]
  image: string
}

const pressItemsData: PressItem[] = [
  {
    id: 1,
    title: "Developer Essentials: Mastering Git & Notion",
    source: "DGIST",
    description: (
      <>
        Led an 8-week intensive workshop for 16 DGIST undergraduates, covering Git and Notion from foundational concepts to real-world applications. Received highly positive feedback for enhancing student productivity and collaborative workflows across various engineering courses and group projects.
      </>
    ),
    type: "lecture",
    startYear: 2023,
    startMonth: 3,
    endYear: 2023,
    endMonth: 5,
    selected: false,
    link: "https://mintcat.notion.site/12e55c0d3e0c81e18523f4173378be3a?v=12e55c0d3e0c8177b146000ca3cfb2b8&source=copy_link",
    image: "/presstalks/dev-essentials.jpg",
  },
  {
    id: 2,
    title: "Club Spotlight: Representing DGIST's Coffee Community, Gabaehyang",
    source: "DGIST",
    description: (
      <>
        Represented DGIST's premier coffee club, Gabaehyang, in a featured media interview as its 10th President. 
        Shared insights on professional bean selection—including blends and popular single origins like Ethiopia Yirgacheffe—and promoted a vibrant campus culture centered around coffee and conversation.
      </>
    ),
    type: "press",
    startYear: 2023,
    startMonth: 5,
    selected: false,
    link: "https://dgistdna.com/716",
    image: "/presstalks/coffee-club-representative.png",
  },
  {
    id: 3,
    title: "Campus-wide Workshop: Building Digital Workflows with Notion",
    source: "DGIST and Notion",
    description: (
      <>
        Organized and led an official Notion workshop as a Notion Campus Leader, providing foundational training to about 40 university members, including students, staff, and faculty.
        Focused on optimizing academic and administrative workflows by introducing customized templates and efficient workspace management systems for the DGIST community.
      </>
    ),
    type: "lecture",
    startYear: 2024,
    startMonth: 11,
    selected: false,
    link: "https://luma.com/r74xd074",
    image: "/presstalks/notion-cl-class.jpg",
  },
  {
    id: 4,
    title: "From Researcher to Developer: My Lablup Internship Journey",
    source: "DGIST and Lablup",
    description: (
      <>
        Presented a retrospective on my backend engineering internship at Lablup Inc. to DGIST peers, focusing on the transition from an undergraduate researcher to a junior developer.
        Shared technical insights from resolving 9 issues and merging 8 PRs on Backend.AI, emphasizing growth in collaborative workflows and proficiency in Docker and Git.
      </>
    ),
    type: "talk",
    startYear: 2025,
    startMonth: 5,
    selected: false,
    link: "https://www.figma.com/deck/vO1lbWPNgrECUl7wru57zN/%EB%9E%98%EB%B8%94%EC%97%85-%ED%9B%84%EA%B8%B0-%EB%B0%9C%ED%91%9C?node-id=1-42&viewport=-35%2C219%2C0.21&t=oUKRntvnhuga3tTK-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
    image: "/presstalks/lablup-talk.png",
  },
  {
    id: 5,
    title: "Retrospective: Mastering Multi-Tasking and Schedule Ownership",
    source: "Notion",
    description: (
      <>
        Delivered a retrospective talk at the Notion Campus Leader Cohort 3 offboarding ceremony, sharing a personal system for managing a high-density schedule across school, research, and internships.
        Demonstrated how to leverage Notion and AI tools to take ownership of demanding timelines and maintain consistent performance across multiple concurrent roles.
      </>
    ),
    type: "talk",
    startYear: 2025,
    startMonth: 7,
    selected: false,
    link: "https://dev-mintcat.tistory.com/15",
    image: "/presstalks/notion-offboarding.jpeg",
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
    <div className="flex items-stretch">
      <div className="hidden sm:block w-48 min-h-48 shrink-0 overflow-hidden rounded-l-xl">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          width={192}
          height={192}
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
            <LinkButtons links={item.links} className="mt-3" />
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
