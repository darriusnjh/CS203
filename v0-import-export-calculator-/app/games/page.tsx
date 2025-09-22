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
    title: "Tariff Quiz Challenge",
    description: "Test your knowledge of tariffs, trade policies, and regulations with multiple choice questions.",
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
    description: "Connect countries with optimal trade routes while managing costs and tariffs.",
    icon: Route,
    difficulty: "Medium",
    points: 200,
    estimatedTime: "10-15 min",
    category: "Strategy"
  },
  {
    id: "import-export-match",
    title: "Import/Export Matching",
    description: "Match products with their correct tariff codes and countries of origin.",
    icon: Puzzle,
    difficulty: "Medium",
    points: 150,
    estimatedTime: "8-12 min",
    category: "Puzzle"
  },
  {
    id: "daily-challenge",
    title: "Daily Trade Challenge",
    description: "Solve today's special trade scenario puzzle and earn bonus points.",
    icon: Target,
    difficulty: "Hard",
    points: 300,
    estimatedTime: "15-20 min",
    category: "Daily",
    isDaily: true
  }
]

const dailyTasks: DailyTask[] = [
  {
    id: "quiz-streak",
    title: "Complete 3 Quiz Games",
    description: "Play and complete 3 quiz games to maintain your streak",
    points: 50,
    completed: false,
    progress: 1,
    maxProgress: 3
  },
  {
    id: "perfect-score",
    title: "Get Perfect Score",
    description: "Achieve a perfect score in any game",
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
      case "Easy": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Hard": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
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
                <div className="p-2 bg-primary/10 rounded-lg" aria-hidden="true">
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                  <p className="text-2xl font-bold" aria-label={`${userStats.totalPoints.toLocaleString()} total points`}>
                    {userStats.totalPoints.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg" aria-hidden="true">
                  <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Games Played</p>
                  <p className="text-2xl font-bold" aria-label={`${userStats.gamesPlayed} games played`}>
                    {userStats.gamesPlayed}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg" aria-hidden="true">
                  <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <p className="text-2xl font-bold" aria-label={`${userStats.streak} day streak`}>
                    {userStats.streak} days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg" aria-hidden="true">
                  <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Global Rank</p>
                  <p className="text-2xl font-bold" aria-label={`Rank ${userStats.rank}`}>
                    #{userStats.rank}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Games Section */}
          <section className="lg:col-span-2" aria-label="Available Games">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Available Games</h2>
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-auto">
                <TabsList role="tablist" aria-label="Game category filter">
                  <TabsTrigger value="all" role="tab" aria-selected={selectedCategory === "all"}>All</TabsTrigger>
                  <TabsTrigger value="Quiz" role="tab" aria-selected={selectedCategory === "Quiz"}>Quiz</TabsTrigger>
                  <TabsTrigger value="Strategy" role="tab" aria-selected={selectedCategory === "Strategy"}>Strategy</TabsTrigger>
                  <TabsTrigger value="Puzzle" role="tab" aria-selected={selectedCategory === "Puzzle"}>Puzzle</TabsTrigger>
                  <TabsTrigger value="Daily" role="tab" aria-selected={selectedCategory === "Daily"}>Daily</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="grid" aria-label="Game cards">
              {filteredGames.map((game) => {
                const Icon = game.icon
                return (
                  <Card key={game.id} className="hover:shadow-lg transition-shadow cursor-pointer group" role="gridcell">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors" aria-hidden="true">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{game.title}</CardTitle>
                            <CardDescription className="text-sm">
                              {game.description}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          {game.isNew && (
                            <Badge variant="secondary" className="text-xs" aria-label="New game">
                              <Star className="h-3 w-3 mr-1" aria-hidden="true" />
                              New
                            </Badge>
                          )}
                          {game.isDaily && (
                            <Badge variant="default" className="text-xs" aria-label="Daily challenge">
                              <Calendar className="h-3 w-3 mr-1" aria-hidden="true" />
                              Daily
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className={getDifficultyColor(game.difficulty)} aria-label={`Difficulty: ${game.difficulty}`}>
                          {game.difficulty}
                        </Badge>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Award className="h-4 w-4" aria-hidden="true" />
                            <span aria-label={`${game.points} points`}>{game.points} pts</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" aria-hidden="true" />
                            <span aria-label={`Estimated time: ${game.estimatedTime}`}>{game.estimatedTime}</span>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full" size="sm" asChild aria-label={`Play ${game.title}`}>
                        <Link href={`/games/${game.id}`}>
                          Play Game
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Daily Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Daily Tasks
                </CardTitle>
                <CardDescription>
                  Complete daily challenges to earn bonus points
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {dailyTasks.map((task) => (
                  <div key={task.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{task.title}</h4>
                      <Badge variant={task.completed ? "default" : "secondary"}>
                        {task.points} pts
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{task.description}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{task.progress}/{task.maxProgress}</span>
                      </div>
                      <Progress value={(task.progress / task.maxProgress) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Leaderboard Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Top Players
                </CardTitle>
                <CardDescription>
                  Global leaderboard rankings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "TradeMaster99", points: 15420, rank: 1 },
                    { name: "ImportExpert", points: 14230, rank: 2 },
                    { name: "TariffGuru", points: 13850, rank: 3 },
                    { name: "You", points: userStats.totalPoints, rank: userStats.rank }
                  ].map((player) => (
                    <div key={player.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          player.rank <= 3 
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            : player.name === "You"
                            ? "bg-primary/10 text-primary"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
                        }`}>
                          {player.rank}
                        </div>
                        <span className={`text-sm ${player.name === "You" ? "font-semibold" : ""}`}>
                          {player.name}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {player.points.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 mt-4">
                  <Button variant="outline" className="w-full" size="sm" asChild>
                    <Link href="/games/leaderboard">
                      View Full Leaderboard
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" size="sm" asChild>
                    <Link href="/games/daily-tasks">
                      <Target className="h-4 w-4 mr-2" />
                      Daily Tasks
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
