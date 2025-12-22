"use client"

import { PageShell } from "@/components/page-shell"
import { WorkPageContent } from "@/components/pages/work-page"

interface WorkAppProps {
  pathname: string
  activeTab?: string
}

export function WorkApp({ pathname, activeTab = "publications" }: WorkAppProps) {
  return (
    <PageShell pathname={pathname}>
      <WorkPageContent activeTab={activeTab} />
    </PageShell>
  )
}
