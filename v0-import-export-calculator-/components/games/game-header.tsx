"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface GameHeaderProps {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

export function GameHeader({ title, description, icon: Icon }: GameHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/games">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Games
        </Link>
      </Button>
      <div className="flex-1">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Icon className="h-8 w-8 text-primary" />
          {title}
        </h1>
        <p className="text-muted-foreground mt-2">
          {description}
        </p>
      </div>
    </div>
  )
}
