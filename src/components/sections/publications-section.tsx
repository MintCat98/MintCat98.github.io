"use client"

import { useState } from "react"
import { Star, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const publications = [
  {
    id: 1,
    title: "Aligning Large Language Models with Human Preferences via Constitutional AI",
    authors: "Alex Chen*, Sarah Kim*, James Liu, Emily Wang",
    venue: "NeurIPS 2024",
    year: 2024,
    selected: true,
    link: "#",
    image: "/ai-neural-network-abstract.png",
  },
  {
    id: 2,
    title: "Multilingual Reasoning in Large Language Models: A Systematic Study",
    authors: "Alex Chen, Michael Brown, Lisa Park",
    venue: "ACL 2024 (Outstanding Paper Award)",
    year: 2024,
    selected: true,
    link: "#",
    image: "/multilingual-text-globe-visualization.jpg",
  },
  {
    id: 3,
    title: "SafeChat: Building Trustworthy Conversational AI Systems",
    authors: "Alex Chen, David Lee, Anna Martinez",
    venue: "ICML 2024",
    year: 2024,
    selected: true,
    link: "#",
    image: "/chatbot-conversation-ai-interface.jpg",
  },
  {
    id: 4,
    title: "Efficient Fine-tuning of Large Language Models for Domain Adaptation",
    authors: "Alex Chen, Tom Wilson",
    venue: "EMNLP 2023",
    year: 2023,
    selected: false,
    link: "#",
    image: "/machine-learning-training-visualization.jpg",
  },
  {
    id: 5,
    title: "Understanding Emergent Capabilities in Transformer Models",
    authors: "Sarah Kim, Alex Chen, Robert Zhang",
    venue: "ICLR 2023",
    year: 2023,
    selected: false,
    link: "#",
    image: "/transformer-architecture-diagram.png",
  },
  {
    id: 6,
    title: "Interpretable Neural Networks for NLP: A Survey",
    authors: "Alex Chen, Emily Wang, James Liu",
    venue: "ACL 2023",
    year: 2023,
    selected: false,
    link: "#",
    image: "/neural-network-interpretability-visualization.jpg",
  },
]

export function PublicationsSection() {
  const [showSelectedOnly, setShowSelectedOnly] = useState(false)
  const displayedPubs = showSelectedOnly ? publications.filter((p) => p.selected) : publications

  return (
    <section id="publications">
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground text-sm">
          {publications.length} publications • {publications.filter((p) => p.selected).length} selected
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
          <a
            key={pub.id}
            href={pub.link}
            className={cn(
              "group block rounded-xl border bg-card transition-all duration-300",
              "hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40 hover:-translate-y-1",
              pub.selected ? "border-primary/30 bg-primary/5" : "border-border",
            )}
          >
            <div className="flex items-stretch">
              <div className="hidden sm:block w-48 shrink-0 overflow-hidden rounded-l-xl">
                <img
                  src={pub.image || "/placeholder.svg"}
                  alt={pub.title}
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
