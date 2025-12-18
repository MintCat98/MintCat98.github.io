"use client"

import { PageShell } from "@/components/page-shell"
import { HomePageContent } from "@/components/pages/home-page"

export function HomeApp({ pathname }: { pathname: string }) {
  return (
    <PageShell pathname={pathname}>
      <HomePageContent />
    </PageShell>
  )
}
