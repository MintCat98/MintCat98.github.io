"use client"

import { useState, useMemo } from "react"
import { GraduationCap, Briefcase, FlaskConical, ChevronDown, ChevronUp } from "lucide-react"
import { Footer } from "@/components/footer"
import { LinkableCard } from "@/components/ui/linkable-card"
import { ScrollToTop } from "@/components/ui/scroll-to-top"

type ExperienceCategory = "education" | "work" | "research"

interface TimelineItem {
  category: ExperienceCategory
  title: string
  organization: React.ReactNode
  startDate: string // Format: "Feb 2021" or "2021" (month is optional)
  endDate?: string  // Format: "Feb 2021" or "2021" or "Present" (optional, if omitted shows only startDate)
  description: React.ReactNode
  // Optional: specify tab and highlight ID for work page navigation
  workTab?: "publications" | "projects" | "press" | "awards"
  highlightId?: number
}

const timelineItems: TimelineItem[] = [
  {
    category: "education",
    title: "B.S. in Computer Science and Engineering",
    organization: (
      <>
        <a href="https://www.dgist.ac.kr/eng/index.do" target="_blank" rel="noopener noreferrer" className="text-primary link-underline">@ Daegu Gyeongbuk Institute of Science and Technology (DGIST), South Korea</a>
      </>
    ),
    startDate: "Feb 2021",
    endDate: "Feb 2026",
    description: (
      <>
        • GPA: <i>4.00/4.30 (97.0%)</i> | • Advisor: <i><a href="https://scholar.google.com/citations?user=jsHfhqgAAAAJ" target="_blank" rel="noopener noreferrer" className="text-primary link-underline">Prof. Yeseong Kim</a></i><br />
        • Thesis: <i>"CoDeMP: Color Description Multimodal Pipeline"</i>
      </>
    ),
    workTab: "projects",
    highlightId: 1,
  },
  {
    category: "education",
    title: "M.S. in Electrical Engineering",
    organization: (
      <>
        <a href="https://www.kaist.ac.kr/en/" target="_blank" rel="noopener noreferrer" className="text-primary link-underline">@ Korea Advanced Institute of Science and Technology (KAIST), South Korea</a>
      </>
    ),
    startDate: "Feb 2026",
    endDate: "Present",
    description: (
      <>
        • Lab: <i><a href="http://acss.kaist.ac.kr/" target="_blank" rel="noopener noreferrer" className="text-primary link-underline">Autonomous Control and Stochastic Systems Research (ACSS) Lab</a></i><br />
        • GPA: <i>-/4.30 (-%)</i> | • Advisor: <i><a href="https://soojean.github.io/" target="_blank" rel="noopener noreferrer" className="text-primary link-underline">Prof. Sujin Han</a></i><br />
        • Thesis: <i>"-"</i>
      </>
    ),
  },
  {
    category: "education",
    title: "Freshmen Global Leadership Program (FGLP)",
    organization: (
      <>
        <a href="https://www.ucla.edu/" target="_blank" rel="noopener noreferrer" className="text-primary link-underline">@ University of California, Los Angeles (UCLA), USA</a>
      </>
    ),
    startDate: "Jun 2023",
    endDate: "Aug 2023",
    description: (
      <>
        Broadened international perspectives by participating in the DGIST FGLP, a culture-oriented exchange program.
      </>
    ),
  },
  {
    category: "research",
    title: "Undergraduate Student Researcher | Human-Computer Interaction",
    organization: (
      <>
        <a href="https://diag.kr/" target="_blank" rel="noopener noreferrer" className="text-primary link-underline">@ Designing Intelligence Augmentation Group (DIAG), South Korea</a>
      </>
    ),
    startDate: "Feb 2024",
    endDate: "Sep 2024",
    description: (
      <>
        • Advisor: <i><a href="https://jyskwon.github.io/" target="_blank" rel="noopener noreferrer" className="text-primary link-underline">Prof. Jean Y. Song</a></i><br />
        Co-authored <i>"Easy Come, Easy Go? Exploring Perceptions and Effects of LLM-Based Search-as-Learning Across Students and Educators"</i> as the second author, focusing on the design and execution of user studies.
      </>
    ),
    workTab: "publications",
    highlightId: 1,
  },
  {
    category: "research",
    title: "Undergraduate Student Researcher | Cryptography and Security",
    organization: (
      <>
        <a href="https://sites.google.com/view/pacl/" target="_blank" rel="noopener noreferrer" className="text-primary link-underline">@ Privacy and Applied Cryptography Lab (PACL), South Korea</a>
      </>
    ),
    startDate: "Feb 2025",
    endDate: "Jun 2025",
    description: (
      <>
        • Advisor: <i><a href="https://sites.google.com/site/mypurist/" target="_blank" rel="noopener noreferrer" className="text-primary link-underline">Prof. Young-Sik Kim</a></i><br />
        Focused on building a comprehensive theoretical foundation in cryptography, ranging from classical security to post-quantum cryptography.
      </>
    ),
  },
  {
    category: "research",
    title: "Undergraduate Student Researcher | Artificial Intelligence",
    organization: (
      <>
        <a href="https://sites.google.com/view/isllab-dgist/home?authuser=0" target="_blank" rel="noopener noreferrer" className="text-primary link-underline">@ Intelligent Systems and Learning (ISL) Lab, South Korea</a>
      </>
    ),
    startDate: "Jun 2025",
    endDate: "Feb 2026",
    description: (
      <>
        • Advisor: <i><a href="https://sites.google.com/view/dhpark/" target="_blank" rel="noopener noreferrer" className="text-primary link-underline">Prof. Daehee Park</a></i><br />
        Main contributor for two papers currently under review at CVPR 2026, regarding long-tail problem mitigation and model quantization techniques.
      </>
    ),
    workTab: "publications",
    highlightId: 2,
  },
  {
    category: "work",
    title: "Backend Developer Intern",
    organization: (
      <>
        <a href="https://www.lablup.com/" target="_blank" rel="noopener noreferrer" className="text-primary link-underline">@ Lablup Inc., South Korea</a>
      </>
    ),
    startDate: "Dec 2024",
    endDate: "Feb 2025",
    description: (
      <>
        Contributed to the performance optimization of
        <i><a href="https://github.com/lablup/backend.ai" target="_blank" rel="noopener noreferrer" className="text-primary link-underline"> Backend.AI</a></i>
        , an enterprise-grade open-source platform for AI/GPU resource orchestration.
      </>
    ),
    workTab: "projects",
    highlightId: 2,
  },
  {
    category: "work",
    title: "Notion Campus Leader",
    organization: (
      <>
        <a href="https://www.notion.com/" target="_blank" rel="noopener noreferrer" className="text-primary link-underline">@ Notion</a>
      </>
    ),
    startDate: "Aug 2024",
    endDate: "Present",
    description: (
      <>
        Cohort 3 & 4: Empowering student communities at DGIST <i>(2024-2025)</i> and KAIST <i>(2026)</i> to optimize digital workflows and productivity.
      </>
    ),
    workTab: "press",
    highlightId: 3,
  },
  {
    category: "education",
    title: "H-Mobility Class",
    organization: (
      <>
        <a href="https://h-mobility-class.com/" target="_blank" rel="noopener noreferrer" className="text-primary link-underline">@ Hyundai NGV, South Korea</a>
      </>
    ),
    startDate: "Apr 2025",
    endDate: "Jun 2025",
    description: (
      <>
        Selected for the Autonomous Driving track, completing a comprehensive curriculum covering perception, motion planning, and vehicle network systems.
      </>
    ),
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

// Helper function to generate link from workTab and highlightId
const generateLink = (item: TimelineItem): string => {
  if (!item.workTab) return ""
  const params = new URLSearchParams()
  params.set("tab", item.workTab)
  if (item.highlightId !== undefined) {
    params.set("highlight", item.highlightId.toString())
  }
  return `/work?${params.toString()}`
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

// Timeline card component to avoid duplication
function TimelineCard({ item }: { item: TimelineItem }) {
  const config = categoryConfig[item.category]
  const Icon = config.icon
  const link = generateLink(item)

  return (
    <div className="relative flex gap-6 group">
      {/* Timeline dot */}
      <div
        className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${config.bgColor} border-2 ${config.color} shrink-0 transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon className={`w-4 h-4 ${config.color}`} />
      </div>

      {/* Content */}
      <LinkableCard link={link} unstyled sameTab className="flex-1 pb-2">
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
      </LinkableCard>
    </div>
  )
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
            {sortedItems.slice(0, 5).map((item, index) => (
              <TimelineCard key={`${item.startDate}-${item.title}-${index}`} item={item} />
            ))}

            {showAll && (
              <div className={isAnimating ? "animate-expand space-y-6" : "space-y-6"}>
                {hiddenItems.map((item, index) => (
                  <TimelineCard key={`hidden-${item.startDate}-${item.title}-${index}`} item={item} />
                ))}
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
        <div className="fixed bottom-20 right-6 glass rounded-lg p-4 hidden lg:block">
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

        <ScrollToTop className="bottom-6 right-6" />
      </div>
        <Footer />
      </div>
    </div>
  )
}

