"use client"

import { useState } from "react"
import { Star, ChevronRight, Trophy, Medal, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const awards = [
  {
    id: 1,
    title: "Outstanding Paper Award",
    organization: "ACL 2024",
    description: "For multilingual reasoning research",
    year: 2024,
    selected: true,
    link: "#",
    icon: Trophy,
    image: "/acl-conference-outstanding-paper-award-ceremony.jpg",
  },
  {
    id: 2,
    title: "Rising Star in AI",
    organization: "Stanford HAI",
    description: "Recognition for early-career contributions to AI safety",
    year: 2024,
    selected: true,
    link: "#",
    icon: Star,
    image: "/stanford-hai-rising-star-award-ceremony.jpg",
  },
  {
    id: 3,
    title: "Best Demo Award",
    organization: "EMNLP 2023",
    description: "For SafeChat interactive demonstration",
    year: 2023,
    selected: true,
    link: "#",
    icon: Medal,
    image: "/emnlp-conference-best-demo-award-presentation.jpg",
  },
  {
    id: 4,
    title: "Google PhD Fellowship",
    organization: "Google Research",
    description: "Fellowship for exceptional PhD students in ML",
    year: 2022,
    selected: false,
    link: "#",
    icon: Award,
    image: "/google-phd-fellowship-award-ceremony.jpg",
  },
  {
    id: 5,
    title: "NSF Graduate Research Fellowship",
    organization: "National Science Foundation",
    description: "Three-year fellowship for graduate research",
    year: 2021,
    selected: false,
    link: "#",
    icon: Award,
    image: "/nsf-graduate-research-fellowship-certificate.jpg",
  },
]

export function AwardsSection() {
  const [showSelectedOnly, setShowSelectedOnly] = useState(false)
  const displayedAwards = showSelectedOnly ? awards.filter((a) => a.selected) : awards

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
          <a
            key={award.id}
            href={award.link}
            className={cn(
              "group block rounded-xl border bg-card transition-all duration-300",
              "hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40 hover:-translate-y-1",
              award.selected ? "border-primary/30 bg-primary/5" : "border-border",
            )}
          >
            <div className="flex items-stretch">
              <div className="hidden sm:block w-48 shrink-0 overflow-hidden rounded-l-xl">
                <img
                  src={award.image || "/placeholder.svg"}
                  alt={award.title}
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
                      <span className="text-xs text-muted-foreground">{award.year}</span>
                    </div>
                    <h3 className="text-foreground font-medium mb-1 leading-snug group-hover:text-primary transition-colors">
                      {award.title}
                    </h3>
                    <p className="text-primary text-sm mb-1">{award.organization}</p>
                    <p className="text-muted-foreground text-sm">{award.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
