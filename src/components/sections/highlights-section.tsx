"use client"

import { FileText, FolderOpen, Award, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const highlights = [
  {
    id: "publications",
    icon: FileText,
    title: "Featured Publication",
    subtitle: "",
    content: "New publications are in progress! Stay tuned for my latest research updates! 👀",
    link: "/work?tab=publications",
    linkText: "See More Publications",
  },
  {
    id: "projects",
    icon: FolderOpen,
    title: "Featured Project",
    subtitle: "Open Source",
    content: "Code Refactoring: Folder APIs in storage-proxy in Backend.AI",
    link: "/work?tab=projects",
    linkText: "See More Projects",
  },
  {
    id: "awards",
    icon: Award,
    title: "Featured Honor",
    subtitle: "2025",
    content: "Recognized as a top-tier undergraduate engineer for technical vision and scientific contributions!",
    link: "/work?tab=awards",
    linkText: "See More Awards",
  },
]

export function HighlightsSection() {
  return (
    <section id="highlights" className="flex flex-col items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <a key={item.id} href={item.link}>
              <Card className="group cursor-pointer bg-card border-border hover:border-primary/50 card-hover h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground">{item.subtitle}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.content}</p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all duration-300">
                    {item.linkText}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
