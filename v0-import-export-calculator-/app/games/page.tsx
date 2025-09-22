"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Brain, 
  Route, 
  Puzzle, 
  Trophy, 
  Star, 
  Target, 
  Clock, 
  Users,
  Gamepad2,
  Zap,
  Award,
  Calendar
} from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"
import Link from "next/link"

interface Game {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  difficulty: "Easy" | "Medium" | "Hard"
  points: number
  estimatedTime: string
  category: "Quiz" | "Strategy" | "Puzzle" | "Daily"
  isNew?: boolean
  isDaily?: boolean
}

interface DailyTask {
  id: string
  title: string
  description: string
  points: number
  completed: boolean
  progress: number
  maxProgress: number
}

const games: Game[] = [
  {
    id: "tariff-quiz",
    title: "Tariff Knowledge Quiz",
    description: "Test your understanding of tariff classifications and trade regulations",
    icon: Brain,
    difficulty: "Easy",
    points: 100,
    estimatedTime: "5-10 min",
    category: "Quiz",
    isNew: true
  },
  {
    id: "trade-routes",
    title: "Trade Route Builder",
    description: "Build optimal trade routes while managing costs and regulations",
    icon: Route,
    difficulty: "Medium",
    points: 200,
    estimatedTime: "15-20 min",
    category: "Strategy"
  },
  {
    id: "import-export-match",
    title: "Import/Export Matching",
    description: "Match products with their correct HTS codes and tariff rates",
    icon: Puzzle,
    difficulty: "Easy",
    points: 150,
    estimatedTime: "8-12 min",
    category: "Puzzle"
  },
  {
    id: "daily-challenge",
    title: "Daily Challenge",
    description: "Complete today's special challenge for bonus points",
    icon: Target,
    difficulty: "Hard",
    points: 300,
    estimatedTime: "20-30 min",
    category: "Daily",
    isDaily: true
  }
]

const dailyTasks: DailyTask[] = [
  {
    id: "quiz-complete",
    title: "Complete a Quiz",
    description: "Finish any quiz game",
    points: 50,
    completed: true,
    progress: 1,
    maxProgress: 1
  },
  {
    id: "high-score",
    title: "Achieve High Score",
    description: "Get a score above 80% in any game",
    points: 100,
    completed: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: "daily-challenge",
    title: "Complete Daily Challenge",
    description: "Solve today's daily challenge",
    points: 200,
    completed: false,
    progress: 0,
    maxProgress: 1
  }
]

export default function GamesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [userStats] = useState({
    totalPoints: 1250,
    gamesPlayed: 12,
    streak: 5,
    rank: 23
  })

  const filteredGames = selectedCategory === "all" 
    ? games 
    : games.filter(game => game.category === selectedCategory)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": 
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Medium": 
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Hard": 
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default: 
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full" aria-hidden="true">
              <Gamepad2 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Games & Challenges</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Test your knowledge, build trade routes, and compete with others in our interactive tariff and trade games.
          </p>
        </header>

        {/* Stats Overview */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8" aria-label="User Statistics">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                  <p className="text-2xl font-bold">{userStats.totalPoints.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                  <Gamepad2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Games Played</p>
                  <p className="text-2xl font-bold">{userStats.gamesPlayed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg dark:bg-orange-900">
                  <Zap className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Streak</p>
                  <p className="text-2xl font-bold">{userStats.streak} days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900">
                  <Trophy className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rank</p>
                  <p className="text-2xl font-bold">#{userStats.rank}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Tabs defaultValue="games" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="games">Games</TabsTrigger>
            <TabsTrigger value="daily">Daily Tasks</TabsTrigger>
          </TabsList>

          {/* Games Tab */}
          <TabsContent value="games" className="space-y-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
              >
                All Games
              </Button>
              <Button
                variant={selectedCategory === "Quiz" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("Quiz")}
              >
                Quiz
              </Button>
              <Button
                variant={selectedCategory === "Strategy" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("Strategy")}
              >
                Strategy
              </Button>
              <Button
                variant={selectedCategory === "Puzzle" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("Puzzle")}
              >
                Puzzle
              </Button>
              <Button
                variant={selectedCategory === "Daily" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("Daily")}
              >
                Daily
              </Button>
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map((game) => {
                const IconComponent = game.icon
                return (
                  <Card key={game.id} className="group hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{game.title}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getDifficultyColor(game.difficulty)}>
                                {game.difficulty}
                              </Badge>
                              {game.isNew && (
                                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                  New
                                </Badge>
                              )}
                              {game.isDaily && (
                                <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
                                  Daily
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        {game.description}
                      </CardDescription>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          <span>{game.points} points</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{game.estimatedTime}</span>
                        </div>
                      </div>
                      <Button className="w-full" asChild>
                        <Link href={`/games/${game.id}`}>
                          Play Now
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Daily Tasks Tab */}
          <TabsContent value="daily" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dailyTasks.map((task) => (
                <Card key={task.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Target className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                            {task.points} points
                          </Badge>
                          {task.completed && (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              Completed
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {task.description}
                    </CardDescription>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{task.progress}/{task.maxProgress}</span>
                      </div>
                      <Progress value={(task.progress / task.maxProgress) * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Leaderboard Section */}
        <section className="mt-12">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Global Leaderboard</CardTitle>
                  <CardDescription>Top players this week</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "TradeMaster", points: 15420, rank: 1 },
                  { name: "ImportGuru", points: 14230, rank: 2 },
                  { name: "TariffGuru", points: 13850, rank: 3 },
                  { name: "You", points: userStats.totalPoints, rank: userStats.rank }
                ].map((player) => (
                  <div key={player.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        player.rank <= 3 
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
                      }`}>
                        {player.rank}
                      </div>
                      <span className={`text-sm ${player.name === "You" ? "font-semibold" : ""}`}>
                        {player.name}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {player.points.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quick Actions */}
        <section className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="w-full" size="sm" asChild>
                  <Link href="/games/leaderboard">
                    <Trophy className="h-4 w-4 mr-2" />
                    View Leaderboard
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" size="sm" asChild>
                  <Link href="/games/daily-tasks">
                    <Target className="h-4 w-4 mr-2" />
                    Daily Tasks
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" size="sm" asChild>
                  <Link href="/games/daily-challenge">
                    <Calendar className="h-4 w-4 mr-2" />
                    Daily Challenge
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
