"use client"

import { AboutSection } from "@/components/sections/about-section"
import { HighlightsSection } from "@/components/sections/highlights-section"
import { NewsSection } from "@/components/sections/news-section"

export function HomePageContent() {
  return (
    <div className="snap-y snap-mandatory">
      <section id="about" className="min-h-screen snap-start snap-always flex items-center pt-20">
        <div className="max-w-6xl mx-auto px-6 w-full py-12">
          <AboutSection />
        </div>
      </section>

      <section id="highlights" className="min-h-screen snap-start snap-always flex items-center bg-secondary/20">
        <div className="max-w-6xl mx-auto px-6 w-full py-12">
          <HighlightsSection />
        </div>
      </section>

      <section id="news" className="min-h-screen snap-start snap-always flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full py-12">
          <NewsSection />
        </div>
      </section>
    </div>
  )
}
