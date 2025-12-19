"use client"

import type { ReactNode } from "react"
import { Navigation } from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"

export function PageShell({ pathname, children }: { pathname: string; children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" storageKey="theme" disableTransitionOnChange>
      <Navigation pathname={pathname} />
      <main className="relative">{children}</main>
    </ThemeProvider>
  )
}
