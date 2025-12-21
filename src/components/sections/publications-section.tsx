"use client"

import { useState, useEffect, useRef } from "react"
import { Star, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LinkableCard } from "@/components/ui/linkable-card"
import { cn } from "@/lib/utils"

interface PublicationsSectionProps {
  highlightId?: number | null
}

interface PublicationItem {
  id: number
  title: string
  authors: React.ReactNode
  venue: string
  year: number
  month: number // 1-12, 내부 정렬용
  selected: boolean
  link?: string
  image: string
}

const publications: PublicationItem[] = [
  {
    id: 1,
    title: "Easy Come, Easy Go? Exploring Perceptions and Effects of LLM-Based Search-as-Learning Across Students and Educators",
    authors: (
      <>
      Yeonsun Yang, Ahyeon Shin, <b>Mincheol Kang</b>, Jiheon Kang, Xu Wang, and <sup>†</sup>Jean Song
      </>
    ),
    venue: "CHI26 Submitted",
    year: 2025,
    month: 9,
    selected: false,
    image: "placeholder.svg",
  },
  {
    id: 2,
    title: "GOM: Guided Occupancy World Model for Robust Planning in Safety-Critical Scenarios",
    authors: (
      <>
      <sup>*</sup>Sihyeong Lee, <sup>*</sup><b>Mincheol Kang</b>, and <sup>†</sup>Daehee Park
      </>
    ),
    venue: "CVPR26 Submitted",
    year: 2025,
    month: 11,
    selected: false,
    image: "placeholder.svg",
  },
  {
    id: 3,
    title: "BitTP: The Lightweight Trajectory Prediction Model with BitLLM for Edge-Devices",
    authors: (
      <>
      <sup>*</sup><b>Mincheol Kang</b>, <sup>*</sup>Hyeonjin Lim, Bomin Kang, and <sup>†</sup>Daehee Park
      </>
    ),
    venue: "CVPR26 Submitted",
    year: 2025,
    month: 11,
    selected: false,
    image: "placeholder.svg",
  },
]

// year와 month 기준 최신순 정렬
const sortedPublications = [...publications].sort((a, b) => {
  if (b.year !== a.year) return b.year - a.year
  return b.month - a.month
})

export function PublicationsSection({ highlightId }: PublicationsSectionProps) {
  const [showSelectedOnly, setShowSelectedOnly] = useState(false)
  const displayedPubs = showSelectedOnly ? sortedPublications.filter((p) => p.selected) : sortedPublications
  const highlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (highlightId && highlightRef.current) {
      highlightRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [highlightId])

  const CardContent = ({ pub }: { pub: PublicationItem }) => (
    <div className="flex items-start">
      <div className="hidden sm:block w-48 h-48 shrink-0 overflow-hidden rounded-l-xl">
        <img
          src={pub.image || "/placeholder.svg"}
          alt={pub.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex-1 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {pub.selected && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                  <Star className="w-3 h-3 fill-current" />
                  Selected
                </span>
              )}
              <span className="text-xs text-muted-foreground">{pub.venue}</span>
            </div>
            <h3 className="text-foreground font-medium mb-2 leading-snug group-hover:text-primary transition-colors">
              {pub.title}
            </h3>
            <p className="text-muted-foreground text-sm">{pub.authors}</p>
          </div>
          {pub.link && (
            <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
          )}
        </div>
      </div>
    </div>
  )

  return (
    <section id="publications">
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground text-sm">
          {sortedPublications.length} publications • {sortedPublications.filter((p) => p.selected).length} selected
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
        {displayedPubs.map((pub) => (
          <LinkableCard
            key={pub.id}
            ref={pub.id === highlightId ? highlightRef : null}
            link={pub.link}
            className={cn(
              pub.selected ? "border-primary/30 bg-primary/5" : "border-border",
              pub.id === highlightId && "highlight-card",
            )}
          >
            <CardContent pub={pub} />
          </LinkableCard>
        ))}
      </div>
    </section>
  )
}
