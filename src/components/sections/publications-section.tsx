"use client"

import { useState, useEffect, useRef } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LinkableCard } from "@/components/ui/linkable-card"
import { LinkButtons, type LinkButtonItem } from "@/components/ui/link-buttons"
import { cn } from "@/lib/utils"

interface PublicationsSectionProps {
  highlightId?: number | null
}

interface PublicationItem {
  id: number
  title: string
  authors: React.ReactNode
  venue: string
  year: number
  month: number // 1-12, 내부 정렬용
  selected: boolean
  links?: LinkButtonItem[]
  image: string
}

// 카드 하단 버튼은 links 배열로 추가한다. (아이콘/기본 라벨은 link-buttons.tsx 에 미리 정의됨)
// 사용 가능한 type: "project" | "venue" | "paper" | "slides" | "video" | "code" | "custom"
// type 과 url 만 넘기면 되고, "venue"(학회/저널 게재 페이지)처럼 이름이 매번 바뀌는 건 label 로 지정한다.
//
// 예시:
//   links: [
//     { type: "project", url: "https://..." },
//     { type: "venue", url: "https://...", label: "AAAI" }, // 학회/저널명은 label 로
//     { type: "paper", url: "https://..." },
//     { type: "slides", url: "https://..." },
//     { type: "video", url: "https://..." },
//     { type: "code", url: "https://github.com/..." },
//   ],
const publications: PublicationItem[] = [
  {
    id: 1,
    title: "Easy Come, Easy Go? Exploring Perceptions and Effects of LLM-Based Search-as-Learning Across Students and Educators",
    authors: (
      <>
      Yeonsun Yang, Ahyeon Shin, <b>Mincheol Kang</b>, Jiheon Kang, Xu Wang, and Jean Song<sup>†</sup>
      </>
    ),
    venue: "CHI26 Submitted",
    year: 2025,
    month: 9,
    selected: false,
    image: "/publications/chi26-easy_come_easy_go.png",
    links: [
      { type: "paper", url: "https://arxiv.org/abs/2410.01396" },
    ],
  },
  {
    id: 2,
    title: "GOM: Guided Occupancy World Model for Robust Planning in Safety-Critical Scenarios",
    authors: (
      <>
      Sihyeong Lee<sup>*</sup>, <b>Mincheol Kang<sup>*</sup></b>, and Daehee Park<sup>†</sup>
      </>
    ),
    venue: "ECCV26 Submitted",
    year: 2025,
    month: 11,
    selected: false,
    image: "/publications/eccv26-gom.png",
  },
  {
    id: 3,
    title: "BitTP: The Lightweight Trajectory Prediction Model with BitLLM for Edge-Devices",
    authors: (
      <>
      <b>Mincheol Kang<sup>*‡</sup></b>, Hyeonjin Lim<sup>*</sup>, Bomin Kang<sup>*</sup>, and Daehee Park<sup>†</sup>
      </>
    ),
    venue: "CVPR26 Findings",
    year: 2025,
    month: 11,
    selected: true,
    image: "/publications/cvpr26findings-bittp.png",
    links: [
      { type: "project", url: "https://mintcat98.github.io/BitTP/" },
      { type: "venue", url: "https://openaccess.thecvf.com/content/CVPR2026F/html/Kang_BitTP_The_Lightweight_Trajectory_Prediction_Model_with_BitLLM_for_Edge-Devices_CVPRF_2026_paper.html", label: "CVPR" }, // 학회/저널명은 label 로 지정 (게재 페이지)
      { type: "paper", url: "https://arxiv.org/abs/2605.29705" },
      { type: "code", url: "https://github.com/MintCat98/BitTP" },
    ],
  },
]

// selected 우선 정렬 후 year/month 기준 최신순 정렬
const sortedPublications = [...publications].sort((a, b) => {
  if (a.selected !== b.selected) return a.selected ? -1 : 1
  if (b.year !== a.year) return b.year - a.year
  return b.month - a.month
})

export function PublicationsSection({ highlightId }: PublicationsSectionProps) {
  const [showSelectedOnly, setShowSelectedOnly] = useState(false)
  const displayedPubs = showSelectedOnly ? sortedPublications.filter((p) => p.selected) : sortedPublications
  const highlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (highlightId && highlightRef.current) {
      highlightRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [highlightId])

  const CardContent = ({ pub }: { pub: PublicationItem }) => (
    <div className="flex items-stretch">
      {/* 좌측 이미지 프레임: 너비를 카드의 고정 비율(%)로 잡아 뷰포트에 따라 프레임·이미지가 함께 커짐.
          items-stretch 로 카드 높이를 꽉 채우므로(아래 여백 없음) object-cover 로 중앙부터 채우고
          비율이 안 맞으면 가로/세로가 잘림. 모바일에서는 숨김. */}
      <div className="relative hidden sm:block w-[34%] lg:w-[32%] shrink-0 overflow-hidden rounded-l-xl">
        <img
          src={pub.image || "/placeholder.svg"}
          alt={pub.title}
          width={400}
          height={240}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex-1 min-w-0 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {pub.selected && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                  <Star className="w-3 h-3 fill-current" />
                  Selected
                </span>
              )}
              <span className="text-xs text-muted-foreground">{pub.venue}</span>
            </div>
            <h3 className="text-foreground font-medium mb-2 leading-snug group-hover:text-primary transition-colors">
              {pub.title}
            </h3>
            <p className="text-muted-foreground text-sm">{pub.authors}</p>
            <LinkButtons links={pub.links} className="mt-3" />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <section id="publications">
      <div className="flex items-center justify-between gap-4 mb-6">
        <p className="text-muted-foreground text-sm">
          {sortedPublications.length} publications • {sortedPublications.filter((p) => p.selected).length} selected
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSelectedOnly(!showSelectedOnly)}
          className={cn(
            "gap-2 transition-all duration-300",
            showSelectedOnly
              ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
              : "hover:border-primary hover:text-primary",
          )}
        >
          <Star className={cn("w-4 h-4", showSelectedOnly && "fill-current")} />
          {showSelectedOnly ? "Showing Selected" : "Show Selected Only"}
        </Button>
      </div>

      <div className="space-y-4">
        {displayedPubs.map((pub) => (
          <LinkableCard
            key={pub.id}
            ref={pub.id === highlightId ? highlightRef : null}
            className={cn(
              pub.selected ? "border-primary/30 bg-primary/5" : "border-border",
              pub.id === highlightId && "highlight-card",
            )}
          >
            <CardContent pub={pub} />
          </LinkableCard>
        ))}
      </div>
    </section>
  )
}
