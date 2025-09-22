"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LucideIcon } from "lucide-react"

interface StatItem {
  label: string
  value: string | number
  icon: LucideIcon
  color?: string
  progress?: number
}

interface GameStatsProps {
  stats: StatItem[]
}

export function GameStats({ stats }: GameStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${stat.color || "text-primary"}`} />
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-lg font-semibold">{stat.value}</p>
                </div>
              </div>
              {stat.progress !== undefined && (
                <Progress value={stat.progress} className="mt-2" />
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
