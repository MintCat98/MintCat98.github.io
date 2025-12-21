import techStacks from "@/data/tech-stacks.json"

interface TechBadgeProps {
  name: string
  className?: string
}

interface TechStackData {
  color: string
  icon: string
  textColor?: string
}

const techStacksData = techStacks as Record<string, TechStackData>

export function TechBadge({ name, className }: TechBadgeProps) {
  const techData = techStacksData[name]

  // 기술 스택 데이터가 없으면 기본 스타일로 표시
  if (!techData) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs bg-secondary text-secondary-foreground ${className || ""}`}>
        {name}
      </span>
    )
  }

  const { color, icon, textColor = "#FFFFFF" } = techData

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${className || ""}`}
      style={{ backgroundColor: color, color: textColor }}
    >
      <span
        className="w-3.5 h-3.5 flex-shrink-0"
        style={{ color: textColor }}
        dangerouslySetInnerHTML={{ __html: icon }}
      />
      {name}
    </span>
  )
}
