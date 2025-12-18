"use client"

import { PageShell } from "@/components/page-shell"
import { ExperiencePageContent } from "@/components/pages/experience-page"

export function ExperienceApp({ pathname }: { pathname: string }) {
  return (
    <PageShell pathname={pathname}>
      <ExperiencePageContent />
    </PageShell>
  )
}
