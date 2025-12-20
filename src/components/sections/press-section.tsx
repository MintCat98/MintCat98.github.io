"use client"

import { useState, useEffect, useRef } from "react"
import { Star, ChevronRight, Mic, Newspaper } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PressSectionProps {
  highlightId?: number | null
}

interface PressItem {
  id: number
  title: string
  source: string
  type: "press" | "talk"
  date: string
  selected: boolean
  link?: string
  image: string
}

const pressItems: PressItem[] = [
  {
    id: 1,
    title: "The Future of AI Safety: A Conversation with Dr. Alex Chen",
    source: "MIT Technology Review",
    type: "press",
    date: "Jul 2024",
    selected: false,
    link: "#",
    image: "/placeholder.svg",
  },
]

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
      <div className="hidden sm:block w-48 shrink-0 overflow-hidden rounded-l-xl">
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
                  item.type === "talk" ? "bg-chart-2/20 text-chart-2" : "bg-muted text-muted-foreground",
                )}
              >
                {item.type === "talk" ? <Mic className="w-3 h-3" /> : <Newspaper className="w-3 h-3" />}
                {item.type}
              </span>
              <span className="text-xs text-muted-foreground">{item.date}</span>
            </div>
            <h3 className="text-foreground font-medium mb-2 leading-snug group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="text-muted-foreground text-sm">{item.source}</p>
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
        {displayedItems.map((item) => {
          const cardClasses = cn(
            "group block rounded-xl border bg-card transition-all duration-300",
            "hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40 hover:-translate-y-1",
            item.selected ? "border-primary/30 bg-primary/5" : "border-border",
            item.id === highlightId && "highlight-card",
          )

          return item.link ? (
            <a
              key={item.id}
              ref={item.id === highlightId ? highlightRef as React.RefObject<HTMLAnchorElement> : null}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(cardClasses, "cursor-pointer")}
            >
              <CardContent item={item} />
            </a>
          ) : (
            <div
              key={item.id}
              ref={item.id === highlightId ? highlightRef : null}
              className={cardClasses}
            >
              <CardContent item={item} />
            </div>
          )
        })}
      </div>
    </section>
  )
}
