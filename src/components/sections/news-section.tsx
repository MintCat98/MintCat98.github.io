"use client"

import { useState, useRef } from "react"
import { Calendar, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

// News type categories
export type NewsType = "publication" | "talk" | "project" | "award" | "collaboration" | "press" | "notice"

// Interface for individual news item
export interface NewsItem {
  year: number
  month: number // 1-12
  date: string // e.g., "Dec 2024" - display string
  content: string
  type: NewsType
  link?: string // Optional link to related content
}

// Interface for NewsSection component props
export interface NewsSectionProps {
  title?: string // Section title (default: "Recent News")
  initialDisplayCount?: number // Number of items to show initially (default: 5)
}

// Type colors mapping for each news type
const typeColors: Record<NewsType, string> = {
  publication: "bg-primary/20 text-primary",
  talk: "bg-chart-2/20 text-chart-2",
  project: "bg-chart-3/20 text-chart-3",
  award: "bg-chart-4/20 text-chart-4",
  collaboration: "bg-chart-5/20 text-chart-5",
  press: "bg-muted text-muted-foreground",
  notice: "bg-yellow-400/20 text-yellow-600 dark:text-yellow-400",
}

// News data - can be easily modified or moved to external data file
const newsData: NewsItem[] = [
  {
    year: 2025,
    month: 12,
    date: "Dec 2025",
    content: "🛠️ Working in progress",
    type: "notice",
  },
]

// Sort news by date (newest first) and limit to max 10 items
const sortedNewsData = [...newsData]
  .sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year
    return b.month - a.month
  })
  .slice(0, 10)

// News card component to avoid duplication
function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const cardContent = (
    <>
      <div className="flex items-center gap-2 text-muted-foreground text-sm min-w-[100px]">
        <Calendar className="w-4 h-4" />
        {item.date}
      </div>
      <div className="flex-1">
        <p className="text-foreground">{item.content}</p>
      </div>
      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${typeColors[item.type]}`}>
        {item.type}
      </span>
    </>
  )

  const baseClassName = "flex items-start gap-4 p-4 rounded-lg bg-card/50 hover:bg-card border border-transparent hover:border-primary/20 transition-all duration-300 card-hover"

  if (item.link) {
    return (
      <a
        key={index}
        href={item.link}
        className={`${baseClassName} cursor-pointer`}
      >
        {cardContent}
      </a>
    )
  }

  return (
    <div
      key={index}
      className={`${baseClassName} cursor-default`}
    >
      {cardContent}
    </div>
  )
}

export function NewsSection({
  title = "Recent News",
  initialDisplayCount = 5,
}: NewsSectionProps) {
  const [showAll, setShowAll] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const hiddenNews = sortedNewsData.slice(initialDisplayCount)

  const handleToggle = () => {
    setIsAnimating(true)
    setShowAll(!showAll)
    setTimeout(() => setIsAnimating(false), 400)
  }

  return (
    <section id="news" className="flex flex-col items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-3xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">{title}</h2>
        <div className="space-y-3" ref={contentRef}>
          {sortedNewsData.slice(0, initialDisplayCount).map((item, index) => (
            <NewsCard key={index} item={item} index={index} />
          ))}

          {showAll && (
            <div className={isAnimating ? "animate-expand" : ""}>
              {hiddenNews.map((item, index) => (
                <div key={index} className="mt-3">
                  <NewsCard item={item} index={index + initialDisplayCount} />
                </div>
              ))}
            </div>
          )}
        </div>

        {sortedNewsData.length > initialDisplayCount && (
          <Button
            variant="outline"
            onClick={handleToggle}
            className="mt-6 mx-auto flex items-center gap-2 transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary bg-transparent"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Show More <ChevronDown className="w-4 h-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </section>
  )
}
