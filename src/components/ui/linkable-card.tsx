"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface LinkableCardProps {
  link?: string
  className?: string
  children: React.ReactNode
}

/**
 * A card wrapper component that conditionally renders as a clickable link or a static div.
 * - If `link` is provided: renders as an `<a>` tag with hover cursor
 * - If `link` is not provided: renders as a `<div>` tag
 * - Hover effects are always applied via the `group` class
 */
export const LinkableCard = forwardRef<HTMLDivElement | HTMLAnchorElement, LinkableCardProps>(
  ({ link, className, children }, ref) => {
    const baseClasses = cn(
      "group block rounded-xl border bg-card transition-all duration-300",
      "hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40 hover:-translate-y-1",
      className,
    )

    if (link) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(baseClasses, "cursor-pointer")}
        >
          {children}
        </a>
      )
    }

    return (
      <div ref={ref as React.Ref<HTMLDivElement>} className={baseClasses}>
        {children}
      </div>
    )
  },
)

LinkableCard.displayName = "LinkableCard"
