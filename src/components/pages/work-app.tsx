"use client"

import { PageShell } from "@/components/page-shell"
import { WorkPageContent } from "@/components/pages/work-page"

export function WorkApp({ pathname }: { pathname: string }) {
  return (
    <PageShell pathname={pathname}>
      <WorkPageContent />
    </PageShell>
  )
}
