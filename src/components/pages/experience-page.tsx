"use client"

import { useState, useMemo } from "react"
import { GraduationCap, Briefcase, FlaskConical, ChevronDown, ChevronUp } from "lucide-react"
import { Footer } from "@/components/footer"

type ExperienceCategory = "education" | "work" | "research"

interface TimelineItem {
  category: ExperienceCategory
  title: string
  organization: string
  startDate: string // Format: "Feb 2021" or "2021" (month is optional)
  endDate?: string  // Format: "Feb 2021" or "2021" or "Present" (optional, if omitted shows only startDate)
  description: React.ReactNode
  link: string
  // Optional: specify tab and highlight ID for work page navigation
  workTab?: "publications" | "projects" | "press" | "awards"
  highlightId?: number
}

const timelineItems: TimelineItem[] = [
  {
    category: "education",
    title: "B.S. in Computer Science",
    organization: "@ Daegu Gyeongbuk Institute of Science and Technology (DGIST), South Korea",
    startDate: "Feb 2021",
    endDate: "Feb 2026",
    description: (
      <>
        GPA: <i>4.00/4.30 (97.0%)</i> | Advisor: <a href="https://scholar.google.com/citations?user=jsHfhqgAAAAJ" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline"><i>Prof. Yeseong Kim</i></a><br />
        Thesis: <i>"CoDeMP: Color Description Multimodal Pipeline"</i>
      </>
    ),
    link: "/work?tab=publications&highlight=1",
    workTab: "publications",
    highlightId: 1,
  },
  {
    category: "education",
    title: "Ph.D. in Computer Science",
    organization: "Stanford University",
    startDate: "Sep 2019",
    endDate: "Jun 2024",
    description: "Thesis: Aligning LLMs with Human Values",
    link: "/work?tab=publications&highlight=3",
    workTab: "publications",
    highlightId: 3,
  },
  {
    category: "research",
    title: "Research Intern",
    organization: "OpenAI",
    startDate: "Jun 2022",
    endDate: "Aug 2022",
    description: "Contributed to constitutional AI research",
    link: "/work?tab=publications&highlight=1",
    workTab: "publications",
    highlightId: 1,
  },
  {
    category: "work",
    title: "ML Engineer",
    organization: "Anthropic",
    startDate: "Jan 2021",
    endDate: "Dec 2022",
    description: "Built safety evaluation frameworks for Claude",
    link: "/work?tab=projects&highlight=1",
    workTab: "projects",
    highlightId: 1,
  },
  {
    category: "education",
    title: "M.S. in Computer Science",
    organization: "MIT",
    startDate: "Sep 2017",
    endDate: "Jun 2019",
    description: "Focus on NLP and machine learning",
    link: "/work?tab=awards&highlight=1",
    workTab: "awards",
    highlightId: 1,
  },
  {
    category: "research",
    title: "Undergraduate Researcher",
    organization: "MIT CSAIL",
    startDate: "Sep 2016",
    endDate: "May 2017",
    description: "First-authored paper on neural machine translation",
    link: "/work?tab=publications&highlight=5",
    workTab: "publications",
    highlightId: 5,
  },
  {
    category: "education",
    title: "B.S. in Computer Science",
    organization: "MIT",
    startDate: "Sep 2013",
    endDate: "Jun 2017",
    description: "Graduated summa cum laude",
    link: "/work?tab=awards&highlight=2",
    workTab: "awards",
    highlightId: 2,
  },
]

const categoryConfig: Record<
  ExperienceCategory,
  { icon: typeof GraduationCap; color: string; bgColor: string; label: string }
> = {
  education: {
    icon: GraduationCap,
    color: "text-chart-2",
    bgColor: "bg-chart-2/20",
    label: "Education",
  },
  work: {
    icon: Briefcase,
    color: "text-primary",
    bgColor: "bg-primary/20",
    label: "Work",
  },
  research: {
    icon: FlaskConical,
    color: "text-chart-3",
    bgColor: "bg-chart-3/20",
    label: "Research",
  },
}

// Helper function to parse date string to comparable value
const parseDate = (dateStr: string): number => {
  const months: Record<string, number> = {
    Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
    Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12
  }
  
  const parts = dateStr.split(" ")
  if (parts.length === 2) {
    // Format: "Feb 2021"
    const month = months[parts[0]] || 1
    const year = parseInt(parts[1])
    return year * 100 + month
  } else {
    // Format: "2021" (assume January)
    return parseInt(parts[0]) * 100 + 1
  }
}

// Helper function to format period display
const formatPeriod = (startDate: string, endDate?: string): string => {
  if (!endDate) return startDate
  return `${startDate} - ${endDate}`
}

export function ExperiencePageContent() {
  const [showAll, setShowAll] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Sort items by startDate in descending order (most recent first)
  const sortedItems = useMemo(() => {
    return [...timelineItems].sort((a, b) => parseDate(b.startDate) - parseDate(a.startDate))
  }, [])

  const displayedItems = showAll ? sortedItems : sortedItems.slice(0, 5)
  const hiddenItems = sortedItems.slice(5)

  const handleToggle = () => {
    setIsAnimating(true)
    setShowAll(!showAll)
    setTimeout(() => setIsAnimating(false), 400)
  }

  return (
    <div id="snap-container" className="h-screen overflow-y-auto">
      <div className="min-h-screen pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Experience</h1>
          <p className="text-muted-foreground mb-12">My journey through academia and industry</p>

        <div className="relative">
          {/* Timeline spine */}
          <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-6">
            {sortedItems.slice(0, 5).map((item, index) => {
              const config = categoryConfig[item.category]
              const Icon = config.icon

              return (
                <div key={`${item.startDate}-${item.title}-${index}`} className="relative flex gap-6 group">
                  {/* Timeline dot */}
                  <div
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${config.bgColor} border-2 ${config.color} shrink-0 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className={`w-4 h-4 ${config.color}`} />
                  </div>

                  {/* Content */}
                  <a href={item.link} className="flex-1 pb-2">
                    <div className="glass rounded-lg p-5 transition-all duration-300 group-hover:border-primary/30 card-hover">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <span className="text-xs text-muted-foreground">{formatPeriod(item.startDate, item.endDate)}</span>
                          <h3 className="text-foreground font-semibold group-hover:text-primary transition-colors duration-300">
                            {item.title}
                          </h3>
                          <p className="text-primary text-sm">{item.organization}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${config.bgColor} ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </a>
                </div>
              )
            })}

            {showAll && (
              <div className={isAnimating ? "animate-expand space-y-6" : "space-y-6"}>
                {hiddenItems.map((item, index) => {
                  const config = categoryConfig[item.category]
                  const Icon = config.icon

                  return (
                    <div key={`hidden-${item.startDate}-${item.title}-${index}`} className="relative flex gap-6 group">
                      <div
                        className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${config.bgColor} border-2 ${config.color} shrink-0 transition-transform duration-300 group-hover:scale-110`}
                      >
                        <Icon className={`w-4 h-4 ${config.color}`} />
                      </div>

                      <a href={item.link} className="flex-1 pb-2">
                        <div className="glass rounded-lg p-5 transition-all duration-300 group-hover:border-primary/30 card-hover">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <span className="text-xs text-muted-foreground">{formatPeriod(item.startDate, item.endDate)}</span>
                              <h3 className="text-foreground font-semibold group-hover:text-primary transition-colors duration-300">
                                {item.title}
                              </h3>
                              <p className="text-primary text-sm">{item.organization}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${config.bgColor} ${config.color}`}>
                              {config.label}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm">{item.description}</p>
                        </div>
                      </a>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {sortedItems.length > 5 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleToggle}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm font-medium"
              >
                {showAll ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Show More ({sortedItems.length - 5} more)
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="fixed bottom-6 right-6 glass rounded-lg p-4 hidden lg:block">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Legend</h4>
          <div className="space-y-2">
            {Object.entries(categoryConfig).map(([key, config]) => {
              const Icon = config.icon
              return (
                <div key={key} className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${config.bgColor}`}>
                    <Icon className={`w-3 h-3 ${config.color}`} />
                  </div>
                  <span className="text-sm text-muted-foreground">{config.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
        <Footer />
      </div>
    </div>
  )
}

      function setIsAnimating(arg0: boolean) {
        throw new Error("Function not implemented.")
      }

