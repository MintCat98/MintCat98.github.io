"use client"

import { useState } from "react"
import { Star, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const projects = [
  {
    id: 1,
    title: "SafeChat Framework",
    description:
      "An open-source framework for building trustworthy conversational AI systems with built-in safety guardrails",
    tags: ["Python", "PyTorch", "Transformers"],
    selected: true,
    link: "#",
    image: "/chat-framework-code-interface.jpg",
  },
  {
    id: 2,
    title: "LLM-Align Toolkit",
    description: "A comprehensive toolkit for aligning large language models with human preferences using RLHF and DPO",
    tags: ["Python", "JAX", "RLHF"],
    selected: true,
    link: "#",
    image: "/machine-learning-alignment-diagram.jpg",
  },
  {
    id: 3,
    title: "MultiLingual-Bench",
    description: "Benchmark suite for evaluating multilingual reasoning capabilities in language models",
    tags: ["Python", "Evaluation", "NLP"],
    selected: true,
    link: "#",
    image: "/multilingual-benchmark-charts.jpg",
  },
  {
    id: 4,
    title: "Interpretable Attention Viewer",
    description: "Interactive visualization tool for understanding attention patterns in transformer models",
    tags: ["React", "D3.js", "Python"],
    selected: false,
    link: "#",
    image: "/attention-visualization-heatmap.jpg",
  },
  {
    id: 5,
    title: "Efficient Fine-tuning Library",
    description: "Memory-efficient fine-tuning methods for large language models including LoRA and QLoRA",
    tags: ["Python", "PyTorch", "PEFT"],
    selected: false,
    link: "#",
    image: "/neural-network-fine-tuning-diagram.jpg",
  },
]

export function ProjectsSection() {
  const [showSelectedOnly, setShowSelectedOnly] = useState(false)
  const displayedProjects = showSelectedOnly ? projects.filter((p) => p.selected) : projects

  return (
    <section id="projects">
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground text-sm">
          {projects.length} projects • {projects.filter((p) => p.selected).length} selected
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedProjects.map((project) => (
          <a
            key={project.id}
            href={project.link}
            className={cn(
              "group block rounded-xl border bg-card overflow-hidden transition-all duration-300",
              "hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40 hover:-translate-y-1",
              project.selected ? "border-primary/30 bg-primary/5" : "border-border",
            )}
          >
            <div className="w-full h-36 overflow-hidden">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  {project.selected && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                      <Star className="w-3 h-3 fill-current" />
                      Selected
                    </span>
                  )}
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
              </div>
              <h3 className="text-foreground font-medium mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 rounded text-xs bg-secondary text-secondary-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
