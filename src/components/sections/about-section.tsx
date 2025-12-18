"use client"

import { useState } from "react"
import { Mail, Github, Linkedin, FileText, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const skills = [
  "Machine Learning",
  "Deep Learning",
  "Natural Language Processing",
  "Computer Vision",
  "Reinforcement Learning",
  "Human-AI Interaction",
  "PyTorch",
  "TensorFlow",
  "Transformers",
  "LLMs",
]

const interests = [
  "Large Language Models",
  "Multimodal AI",
  "AI Safety & Alignment",
  "Explainable AI",
  "AI for Social Good",
  "Human-Centered AI",
  "Cognitive Science",
  "Computational Linguistics",
]

const socialLinks = [
  { icon: Mail, href: "mailto:alex.chen@university.edu", label: "Email" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FileText, href: "/cv.pdf", label: "CV" },
  { icon: ExternalLink, href: "https://tistory.com", label: "Blog" },
]

function QuotationMark() {
  return (
    <svg viewBox="0 0 100 100" className="w-10 h-10 text-muted-foreground/40" fill="currentColor">
      <path d="M30 60c-8.3 0-15-6.7-15-15s6.7-15 15-15c2.8 0 5.4.8 7.6 2.1C35.8 22.8 28.4 15 20 15v-5c15 0 27.5 12.5 27.5 27.5 0 12.4-10.1 22.5-22.5 22.5h5zm40 0c-8.3 0-15-6.7-15-15s6.7-15 15-15c2.8 0 5.4.8 7.6 2.1C75.8 22.8 68.4 15 60 15v-5c15 0 27.5 12.5 27.5 27.5 0 12.4-10.1 22.5-22.5 22.5h5z" />
    </svg>
  )
}

export function AboutSection() {
  const [showAllSkills, setShowAllSkills] = useState(false)
  const [showAllInterests, setShowAllInterests] = useState(false)

  const displayedSkills = showAllSkills ? skills : skills.slice(0, 4)
  const displayedInterests = showAllInterests ? interests : interests.slice(0, 3)

  return (
    <section id="about" className="flex flex-col items-center justify-center min-h-[80vh] py-12">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
        {/* Profile Photo */}
        <div className="relative mb-6">
          <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-muted bg-muted">
            <img
              src="/professional-headshot-of-asian-male-researcher-wit.jpg"
              alt="Mincheol Kang"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-foreground">Mincheol Kang</h1>
        <p className="text-primary font-medium text-lg mt-2">AI Researcher</p>
        <p className="text-muted-foreground text-sm mt-1">M.S. @ KAIST, South Korea</p>

        <div className="relative mt-8 px-4">
          <div className="absolute -left-2 -top-2">
            <QuotationMark />
          </div>
          <p className="text-foreground leading-relaxed text-lg pl-10">
            I&apos;m an AI researcher passionate about building intelligent systems that understand and interact with
            humans naturally. My work lies at the intersection of{" "}
            <span className="text-primary font-medium">machine learning</span>,{" "}
            <span className="text-primary font-medium">natural language processing</span>, and{" "}
            <span className="text-primary font-medium">human-AI interaction</span>.
          </p>
        </div>

        <div className="flex items-center gap-3 mt-8">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="social-btn"
              aria-label={link.label}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <link.icon className="w-4 h-4 shrink-0" />
              <span className="btn-label text-sm font-medium">{link.label}</span>
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 w-full text-left">
          {/* Research Interests */}
          <div className="glass rounded-xl p-6 card-hover">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Research Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {displayedInterests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1.5 rounded-full text-sm bg-primary/10 text-primary border border-primary/20 transition-all duration-200 hover:bg-primary/20"
                >
                  {interest}
                </span>
              ))}
            </div>
            {interests.length > 3 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllInterests(!showAllInterests)}
                className="mt-3 text-muted-foreground hover:text-primary p-0 h-auto"
              >
                {showAllInterests ? (
                  <>
                    Show Less <ChevronUp className="ml-1 w-4 h-4" />
                  </>
                ) : (
                  <>
                    Show More <ChevronDown className="ml-1 w-4 h-4" />
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Technical Skills */}
          <div className="glass rounded-xl p-6 card-hover">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Technical Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {displayedSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-full text-sm bg-secondary text-secondary-foreground transition-all duration-200 hover:bg-secondary/70"
                >
                  {skill}
                </span>
              ))}
            </div>
            {skills.length > 4 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllSkills(!showAllSkills)}
                className="mt-3 text-muted-foreground hover:text-primary p-0 h-auto"
              >
                {showAllSkills ? (
                  <>
                    Show Less <ChevronUp className="ml-1 w-4 h-4" />
                  </>
                ) : (
                  <>
                    Show More <ChevronDown className="ml-1 w-4 h-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
