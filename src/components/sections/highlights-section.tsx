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
    image: "/placeholder.svg",
  },
  {
    id: "projects",
    icon: FolderOpen,
    title: "Featured Project",
    subtitle: "Open Source",
    content: "Code Refactoring: Folder APIs in storage-proxy in Backend.AI",
    link: "/work?tab=projects",
    linkText: "See More Projects",
    image: "/projects/backendai-folder-api-refactor.png",
  },
  {
    id: "awards",
    icon: Award,
    title: "Featured Honor",
    subtitle: "2025",
    content: "Recognized as a top-tier undergraduate engineer for technical vision and scientific contributions!",
    link: "/work?tab=awards",
    linkText: "See More Awards",
    image: "/awards/ipesk-next-generation-engineering-talent-2025.png",
  },
]

export function HighlightsSection() {
  return (
    <section id="highlights" className="flex flex-col items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <a key={item.id} href={item.link} className="h-full">
              <Card className="group cursor-pointer bg-card border-border hover:border-primary/50 card-hover h-full overflow-hidden p-0">
                {/* 16:9 이미지 영역 with 오버레이 아이콘/subtitle */}
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* 하단 그림자 오버레이 */}
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/7 to-transparent pointer-events-none" />
                  {/* 오버레이: 아이콘과 subtitle (하단) */}
                  <div className="absolute bottom-3 left-5 right-5 flex items-end justify-between">
                    <div className="p-2 rounded-lg bg-background/80 backdrop-blur-sm shadow-sm group-hover:bg-primary/20 transition-colors duration-300">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    {item.subtitle && (
                      <span className="px-2.5 py-1 text-xs font-medium text-foreground bg-background/80 backdrop-blur-sm rounded-full shadow-sm">
                        {item.subtitle}
                      </span>
                    )}
                  </div>
                </div>
                <CardContent className="p-6 pb-8 pt-0 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{item.content}</p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all duration-300 mt-auto">
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
