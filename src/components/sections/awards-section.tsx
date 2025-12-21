"use client"

import { useState, useEffect, useRef } from "react"
import { Star, ChevronRight, Trophy, Medal, Award, Icon, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LinkableCard } from "@/components/ui/linkable-card"
import { cn } from "@/lib/utils"

interface AwardsSectionProps {
  highlightId?: number | null
}

interface AwardItem {
  id: number
  title: string
  organization: string
  description: string
  year: number
  month: number // 1-12
  selected: boolean // Featured/highlighted award
  link?: string // Optional link
  icon: LucideIcon // Trophy, Star, Medal, or Award
  image: string // Path to award image (can be empty string)
}

const awardsData: AwardItem[] = [
  {
    id: 1,
    title: "Presidential Science Scholarship 22nd Cohort",
    organization: "Korea Student Aid Foundation (KOSAF)",
    description: "Recipient of the 2024 Presidential Science Scholarship, awarded to only 27 junior-level students nationwide in the fields of science and engineering.",
    year: 2024,
    month: 7,
    selected: true,
    icon: Medal,
    image: "/awards/presidential-science-scholarship-2024.png",
  },
  {
    id: 2,
    title: "Scholarship Recipient 2024",
    organization: "Dongil Culture Scholarship Foundation (동일문화장학재단)",
    description: "Recipient of the 2024 Dongil Culture Academic Excellence Scholarship as a DGIST President-nominated representative.",
    year: 2024,
    month: 2,
    selected: false,
    icon: Medal,
    image: "/awards/dongil-culture-scholarship-foundation-2024.png",
  },
  {
    id: 3,
    title: "DGIST Dean's List, Spring 2025",
    organization: "DGIST",
    description: "Attained the Dean\'s List with a distinguished GPA of 4.07/4.30 (97.7%), reflecting consistent excellence in Engineering studies.",
    year: 2025,
    month: 9,
    selected: false,
    icon: Award,
    image: "",
  },
  {
    id: 4,
    title: "DGIST Dean's List, Fall 2024",
    organization: "DGIST",
    description: "Attained the Dean\'s List with a distinguished GPA of 4.15/4.30 (98.5%), reflecting consistent excellence in Engineering studies.",
    year: 2025,
    month: 3,
    selected: false,
    icon: Award,
    image: "/awards/deans-fall-2024.png",
  },
  {
    id: 5,
    title: "DGIST Dean's List, Spring 2024",
    organization: "DGIST",
    description: "Attained the Dean\'s List with a distinguished GPA of 4.00/4.30 (97.0%), reflecting consistent excellence in Engineering studies.",
    year: 2024,
    month: 9,
    selected: false,
    icon: Award,
    image: "/awards/deans-spring-2024.png",
  },
  {
    id: 6,
    title: "DGIST Dean's List, Fall 2022",
    organization: "DGIST",
    description: "Attained the Dean\'s List with a distinguished GPA of 4.06/4.30 (97.6%), reflecting consistent excellence in Engineering studies.",
    year: 2023,
    month: 2,
    selected: false,
    icon: Award,
    image: "",
  },
  {
    id: 7,
    title: "DGIST Dean's List, Spring 2022",
    organization: "DGIST",
    description: "Attained the Dean\'s List with a distinguished GPA of 4.06/4.30 (97.6%), reflecting consistent excellence in Engineering studies.",
    year: 2022,
    month: 9,
    selected: false,
    icon: Award,
    image: "",
  },
  {
    id: 8,
    title: "IPESK Next-Generation Engineering Talent 2nd Cohort",
    organization: "Institute for Promotion of Engineering and Science of Korea (IPESK)",
    description: "Named a top-tier undergraduate engineering student based on my proven technical vision and commitment to advancing science and technology.",
    year: 2025,
    month: 9,
    selected: true,
    link: "https://www.openbadge-global.com/ns/portal/openbadge/public/assertions/detail/OWlCYWNvTFEvQXJiZHN5OGtONHZvdz09",
    icon: Medal,
    image: "/awards/ipesk-next-generation-engineering-talent-2025.png",
  },
]

// Sort awards: selected first (sorted by date desc), then non-selected (sorted by date desc)
const awards = [...awardsData].sort((a, b) => {
  // First, prioritize selected items
  if (a.selected !== b.selected) {
    return a.selected ? -1 : 1
  }
  // Within the same selected status, sort by date (newest first)
  if (a.year !== b.year) {
    return b.year - a.year
  }
  return b.month - a.month
})

export function AwardsSection({ highlightId }: AwardsSectionProps) {
  const [showSelectedOnly, setShowSelectedOnly] = useState(false)
  const displayedAwards = showSelectedOnly ? awards.filter((a) => a.selected) : awards
  const highlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (highlightId && highlightRef.current) {
      highlightRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [highlightId])

  const CardContent = ({ award }: { award: AwardItem }) => (
    <div className="flex items-start">
      <div className="hidden sm:block w-48 h-48 shrink-0 overflow-hidden rounded-l-xl">
        <img
          src={award.image || "/placeholder.svg"}
          alt={award.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex-1 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {award.selected && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                  <Star className="w-3 h-3 fill-current" />
                  Selected
                </span>
              )}
              <span className="text-xs text-muted-foreground">
                {new Date(award.year, award.month - 1).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </span>
            </div>
            <h3 className="text-foreground font-medium mb-1 leading-snug group-hover:text-primary transition-colors">
              {award.title}
            </h3>
            <p className="text-primary text-sm mb-1">{award.organization}</p>
            <p className="text-muted-foreground text-sm">{award.description}</p>
          </div>
          {award.link && (
            <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
          )}
        </div>
      </div>
    </div>
  )

  return (
    <section id="awards">
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground text-sm">
          {awards.length} awards • {awards.filter((a) => a.selected).length} selected
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
        {displayedAwards.map((award) => (
          <LinkableCard
            key={award.id}
            ref={award.id === highlightId ? highlightRef : null}
            link={award.link}
            className={cn(
              award.selected ? "border-primary/30 bg-primary/5" : "border-border",
              award.id === highlightId && "highlight-card",
            )}
          >
            <CardContent award={award} />
          </LinkableCard>
        ))}
      </div>
    </section>
  )
}
