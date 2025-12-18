"use client"

import { useState, useRef } from "react"
import { Calendar, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const newsItems = [
  {
    date: "Dec 2024",
    content: "Our paper on constitutional AI has been accepted at NeurIPS 2024",
    type: "publication",
  },
  {
    date: "Nov 2024",
    content: "Gave an invited talk at Google DeepMind on LLM alignment",
    type: "talk",
  },
  {
    date: "Oct 2024",
    content: "Released SafeChat v2.0 with improved safety features",
    type: "project",
  },
  {
    date: "Sep 2024",
    content: "Received the Outstanding Paper Award at ACL 2024",
    type: "award",
  },
  {
    date: "Aug 2024",
    content: "Started collaboration with OpenAI on AI safety research",
    type: "collaboration",
  },
  {
    date: "Jul 2024",
    content: "Our work featured in MIT Technology Review",
    type: "press",
  },
  {
    date: "Jun 2024",
    content: "Presented tutorial on LLM fine-tuning at NAACL 2024",
    type: "talk",
  },
  {
    date: "May 2024",
    content: "Two papers accepted at ICML 2024",
    type: "publication",
  },
]

const typeColors: Record<string, string> = {
  publication: "bg-primary/20 text-primary",
  talk: "bg-chart-2/20 text-chart-2",
  project: "bg-chart-3/20 text-chart-3",
  award: "bg-chart-4/20 text-chart-4",
  collaboration: "bg-chart-5/20 text-chart-5",
  press: "bg-muted text-muted-foreground",
}

export function NewsSection() {
  const [showAll, setShowAll] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const displayedNews = showAll ? newsItems : newsItems.slice(0, 5)
  const hiddenNews = newsItems.slice(5)

  const handleToggle = () => {
    setIsAnimating(true)
    setShowAll(!showAll)
    setTimeout(() => setIsAnimating(false), 400)
  }

  return (
    <section id="news" className="flex flex-col items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-3xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Recent News</h2>
        <div className="space-y-3" ref={contentRef}>
          {newsItems.slice(0, 5).map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg bg-card/50 hover:bg-card border border-transparent hover:border-primary/20 transition-all duration-300 card-hover"
            >
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
            </div>
          ))}

          {showAll && (
            <div className={isAnimating ? "animate-expand" : ""}>
              {hiddenNews.map((item, index) => (
                <div
                  key={index + 5}
                  className="flex items-start gap-4 p-4 rounded-lg bg-card/50 hover:bg-card border border-transparent hover:border-primary/20 transition-all duration-300 card-hover mt-3"
                >
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
                </div>
              ))}
            </div>
          )}
        </div>

        {newsItems.length > 5 && (
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
