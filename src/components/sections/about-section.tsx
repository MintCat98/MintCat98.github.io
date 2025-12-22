"use client"

import { useState } from "react"
import { Mail, Github, Linkedin, ChevronDown, ChevronUp, NotebookPen, FileUser } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

const socialLinks = [
  { icon: Mail, href: "mailto:mintcat@kaist.ac.kr", label: "Email" },
  { icon: Github, href: "https://github.com/MintCat98", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/mintcatkmc-361a5a294/", label: "LinkedIn" },
  { icon: FileUser, href: "/cv.pdf", label: "CV" },
  { icon: NotebookPen, href: "https://dev-mintcat.tistory.com/", label: "Blog" },
]

const interests = [
  "Physical AI & Robotics",
  "Multimodal AI",
  "Vision-Language Models",
  "Reinforcement Learning",
  "Robustness in AI",
  "AI Safety",
  "Explainable AI",
]

const skills = [
  "Python",
  "C/C++",
  "PyTorch",
  "Django",
  "Figma",
  "CAD & SolidWorks",
]

function QuotationMark() {
  return (
    <svg viewBox="0 0 100 100" className="w-10 h-10 text-muted-foreground/40 -scale-x-100" fill="currentColor">
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
          <div className="w-55 h-55 rounded-full overflow-hidden border-4 border-muted bg-muted">
            <img
              src="/base/0.profile.jpeg"
              alt="Mincheol Kang"
              width={220}
              height={220}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-foreground">Mincheol Kang (강민철)</h1>
        <p className="text-primary font-medium text-lg mt-2">AI Researcher</p>
        <p className="text-muted-foreground text-sm mt-1">M.S. Student @ KAIST EE, South Korea</p>

        <div className="relative mt-8 px-4">
          <div className="absolute left-19 -top-3">
            <QuotationMark />
          </div>
          <p className="text-foreground leading-relaxed text-lg pl-10">
            I&apos;m an AI researcher passionate about building intelligent systems that understand and interact with
            humans naturally. My work lies at the intersection of{" "}
            <span className="text-primary font-medium">robotics AI</span>,{" "}
            <span className="text-primary font-medium">vision language models</span>, and{" "}
            <span className="text-primary font-medium">trustworthy AI</span>.
          </p>
        </div>

        <div className="flex items-center gap-3 mt-8">
          {socialLinks.map((link) => {
            const linkElement = (
              <a
                key={link.label}
                href={link.href}
                className="social-btn"
                aria-label={link.label}
                target={!link.href.startsWith("mailto:") ? "_blank" : undefined}
                rel={!link.href.startsWith("mailto:") ? "noopener noreferrer" : undefined}
              >
                <link.icon className="w-4 h-4 shrink-0" />
                <span className="btn-label text-sm font-medium">{link.label}</span>
              </a>
            )

            if (link.label === "Blog") {
              return (
                <Tooltip key={link.label}>
                  <TooltipTrigger asChild>{linkElement}</TooltipTrigger>
                  <TooltipContent 
                    side="bottom" 
                    sideOffset={0}
                    className="bg-muted text-muted-foreground border border-border"
                    arrowClassName="bg-muted fill-muted"
                  >
                    <p>Korean only</p>
                  </TooltipContent>
                </Tooltip>
              )
            }

            return linkElement
          })}
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
