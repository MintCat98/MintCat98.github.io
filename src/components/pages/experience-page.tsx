"use client"

import { useState } from "react"
import { GraduationCap, Briefcase, FlaskConical, ChevronDown, ChevronUp } from "lucide-react"

type ExperienceCategory = "education" | "work" | "research"

interface TimelineItem {
  id: number
  category: ExperienceCategory
  title: string
  organization: string
  period: string
  impact: string
  link: string
}

const timelineItems: TimelineItem[] = [
  {
    id: 1,
    category: "work",
    title: "Research Scientist",
    organization: "Stanford University",
    period: "2023 - Present",
    impact: "Leading AI safety and alignment research initiatives",
    link: "/work",
  },
  {
    id: 2,
    category: "research",
    title: "Research Intern",
    organization: "Google DeepMind",
    period: "Summer 2023",
    impact: "Developed novel RLHF methods for LLM alignment",
    link: "/work",
  },
  {
    id: 3,
    category: "education",
    title: "Ph.D. in Computer Science",
    organization: "Stanford University",
    period: "2019 - 2024",
    impact: "Thesis: Aligning LLMs with Human Values",
    link: "/work",
  },
  {
    id: 4,
    category: "research",
    title: "Research Intern",
    organization: "OpenAI",
    period: "Summer 2022",
    impact: "Contributed to constitutional AI research",
    link: "/work",
  },
  {
    id: 5,
    category: "work",
    title: "ML Engineer",
    organization: "Anthropic",
    period: "2021 - 2022",
    impact: "Built safety evaluation frameworks for Claude",
    link: "/work",
  },
  {
    id: 6,
    category: "education",
    title: "M.S. in Computer Science",
    organization: "MIT",
    period: "2017 - 2019",
    impact: "Focus on NLP and machine learning",
    link: "/work",
  },
  {
    id: 7,
    category: "research",
    title: "Undergraduate Researcher",
    organization: "MIT CSAIL",
    period: "2016 - 2017",
    impact: "First-authored paper on neural machine translation",
    link: "/work",
  },
  {
    id: 8,
    category: "education",
    title: "B.S. in Computer Science",
    organization: "MIT",
    period: "2013 - 2017",
    impact: "Graduated summa cum laude",
    link: "/work",
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

export function ExperiencePageContent() {
  const [showAll, setShowAll] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const displayedItems = showAll ? timelineItems : timelineItems.slice(0, 5)
  const hiddenItems = timelineItems.slice(5)

  const handleToggle = () => {
    setIsAnimating(true)
    setShowAll(!showAll)
    setTimeout(() => setIsAnimating(false), 400)
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Experience</h1>
        <p className="text-muted-foreground mb-12">My journey through academia and industry</p>

        <div className="relative">
          {/* Timeline spine */}
          <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-6">
            {timelineItems.slice(0, 5).map((item) => {
              const config = categoryConfig[item.category]
              const Icon = config.icon

              return (
                <div key={item.id} className="relative flex gap-6 group">
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
                          <span className="text-xs text-muted-foreground">{item.period}</span>
                          <h3 className="text-foreground font-semibold group-hover:text-primary transition-colors duration-300">
                            {item.title}
                          </h3>
                          <p className="text-primary text-sm">{item.organization}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${config.bgColor} ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm">{item.impact}</p>
                    </div>
                  </a>
                </div>
              )
            })}

            {showAll && (
              <div className={isAnimating ? "animate-expand space-y-6" : "space-y-6"}>
                {hiddenItems.map((item) => {
                  const config = categoryConfig[item.category]
                  const Icon = config.icon

                  return (
                    <div key={item.id} className="relative flex gap-6 group">
                      <div
                        className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${config.bgColor} border-2 ${config.color} shrink-0 transition-transform duration-300 group-hover:scale-110`}
                      >
                        <Icon className={`w-4 h-4 ${config.color}`} />
                      </div>

                      <a href={item.link} className="flex-1 pb-2">
                        <div className="glass rounded-lg p-5 transition-all duration-300 group-hover:border-primary/30 card-hover">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <span className="text-xs text-muted-foreground">{item.period}</span>
                              <h3 className="text-foreground font-semibold group-hover:text-primary transition-colors duration-300">
                                {item.title}
                              </h3>
                              <p className="text-primary text-sm">{item.organization}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${config.bgColor} ${config.color}`}>
                              {config.label}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm">{item.impact}</p>
                        </div>
                      </a>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {timelineItems.length > 5 && (
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
                    Show More ({timelineItems.length - 5} more)
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
    </div>
  )
}
