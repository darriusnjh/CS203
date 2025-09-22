"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Trophy, Star, Target, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface CompletionStats {
  score: number
  totalQuestions?: number
  correctAnswers?: number
  timeSpent: number
  pointsEarned: number
  perfectScore?: boolean
  routesBuilt?: number
  totalProfit?: number
  matchesMade?: number
  movesUsed?: number
}

interface GameCompletionProps {
  title: string
  description: string
  stats: CompletionStats
  onRestart: () => void
  gameType: "quiz" | "strategy" | "puzzle" | "daily"
}

export function GameCompletion({ title, description, stats, onRestart, gameType }: GameCompletionProps) {
  const getScoreRating = (score: number) => {
    if (score >= 1000) return { rating: "Perfect", color: "text-green-600", icon: Trophy }
    if (score >= 500) return { rating: "Excellent", color: "text-blue-600", icon: Star }
    if (score >= 200) return { rating: "Good", color: "text-yellow-600", icon: Target }
    return { rating: "Fair", color: "text-orange-600", icon: AlertTriangle }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const scoreRating = getScoreRating(stats.score)
  const RatingIcon = scoreRating.icon

  const getCompletionIcon = () => {
    if (stats.perfectScore) return Trophy
    return RatingIcon
  }

  const CompletionIcon = getCompletionIcon()

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader className="pb-4">
              <div className="flex justify-center mb-4">
                <div className={`p-4 rounded-full ${
                  stats.perfectScore 
                    ? "bg-yellow-100 dark:bg-yellow-900" 
                    : "bg-primary/10"
                }`}>
                  <CompletionIcon className={`h-12 w-12 ${
                    stats.perfectScore 
                      ? "text-yellow-600 dark:text-yellow-400" 
                      : "text-primary"
                  }`} />
                </div>
              </div>
              <CardTitle className="text-3xl">
                {stats.perfectScore ? "Perfect Score!" : title}
              </CardTitle>
              <CardDescription className="text-lg">
                {stats.perfectScore ? "Outstanding performance!" : description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className={`text-2xl font-bold ${scoreRating.color}`}>{stats.score}%</div>
                  <div className="text-sm text-muted-foreground">Final Score</div>
                </div>
                
                {stats.correctAnswers !== undefined && (
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{stats.correctAnswers}</div>
                    <div className="text-sm text-muted-foreground">Correct Answers</div>
                  </div>
                )}
                
                {stats.routesBuilt !== undefined && (
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{stats.routesBuilt}</div>
                    <div className="text-sm text-muted-foreground">Routes Built</div>
                  </div>
                )}
                
                {stats.matchesMade !== undefined && (
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{stats.matchesMade}</div>
                    <div className="text-sm text-muted-foreground">Matches Made</div>
                  </div>
                )}
                
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{formatTime(stats.timeSpent)}</div>
                  <div className="text-sm text-muted-foreground">Time Spent</div>
                </div>
                
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{stats.pointsEarned}</div>
                  <div className="text-sm text-muted-foreground">Points Earned</div>
                </div>
              </div>

              <div className="text-center">
                <Badge className={`text-lg px-4 py-2 ${scoreRating.color}`}>
                  {scoreRating.rating} Performance
                </Badge>
              </div>

              <div className="space-y-4">
                <Button asChild className="w-full" size="lg">
                  <Link href="/games">
                    Back to Games
                  </Link>
                </Button>
                <Button variant="outline" onClick={onRestart} className="w-full" size="lg">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Play Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
