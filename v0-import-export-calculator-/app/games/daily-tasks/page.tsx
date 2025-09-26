"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Target, 
  ArrowLeft, 
  Trophy, 
  Star,
  Clock,
  Calendar,
  CheckCircle,
  Award,
  Zap,
  TrendingUp,
  Users
} from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"
import Link from "next/link"

interface DailyTask {
  id: string
  title: string
  description: string
  category: "games" | "streak" | "score" | "social"
  points: number
  completed: boolean
  progress: number
  maxProgress: number
  difficulty: "Easy" | "Medium" | "Hard"
  icon: React.ComponentType<{ className?: string }>
  reward?: string
  expiresAt: string
}

interface WeeklyChallenge {
  id: string
  title: string
  description: string
  points: number
  completed: boolean
  progress: number
  maxProgress: number
  daysLeft: number
  icon: React.ComponentType<{ className?: string }>
}

interface UserStats {
  totalPoints: number
  dailyTasksCompleted: number
  weeklyChallengesCompleted: number
  currentStreak: number
  longestStreak: number
  rank: number
  level: number
  xpToNextLevel: number
  totalXP: number
}

const dailyTasks: DailyTask[] = [
  {
    id: "quiz-streak",
    title: "Quiz Master",
    description: "Complete 3 quiz games with at least 80% score",
    category: "games",
    points: 100,
    completed: false,
    progress: 1,
    maxProgress: 3,
    difficulty: "Medium",
    icon: Star,
    reward: "Quiz Master Badge",
    expiresAt: "2024-01-15T23:59:59Z"
  },
  {
    id: "perfect-score",
    title: "Perfect Performance",
    description: "Achieve a perfect score in any game",
    category: "score",
    points: 150,
    completed: false,
    progress: 0,
    maxProgress: 1,
    difficulty: "Hard",
    icon: Trophy,
    reward: "Perfectionist Badge",
    expiresAt: "2024-01-15T23:59:59Z"
  },
  {
    id: "daily-challenge",
    title: "Daily Challenge",
    description: "Complete today's daily challenge",
    category: "games",
    points: 200,
    completed: false,
    progress: 0,
    maxProgress: 1,
    difficulty: "Hard",
    icon: Target,
    reward: "Daily Warrior Badge",
    expiresAt: "2024-01-15T23:59:59Z"
  },
  {
    id: "route-builder",
    title: "Route Builder",
    description: "Build 5 profitable trade routes",
    category: "games",
    points: 120,
    completed: false,
    progress: 2,
    maxProgress: 5,
    difficulty: "Medium",
    icon: TrendingUp,
    reward: "Route Master Badge",
    expiresAt: "2024-01-15T23:59:59Z"
  },
  {
    id: "matching-expert",
    title: "Matching Expert",
    description: "Complete 2 import/export matching games",
    category: "games",
    points: 80,
    completed: false,
    progress: 1,
    maxProgress: 2,
    difficulty: "Easy",
    icon: CheckCircle,
    reward: "Match Master Badge",
    expiresAt: "2024-01-15T23:59:59Z"
  },
  {
    id: "streak-keeper",
    title: "Streak Keeper",
    description: "Maintain a 7-day playing streak",
    category: "streak",
    points: 300,
    completed: false,
    progress: 5,
    maxProgress: 7,
    difficulty: "Hard",
    icon: Zap,
    reward: "Streak Master Badge",
    expiresAt: "2024-01-15T23:59:59Z"
  }
]

const weeklyChallenges: WeeklyChallenge[] = [
  {
    id: "weekly-quiz-master",
    title: "Weekly Quiz Master",
    description: "Complete 10 quiz games with 90%+ average score",
    points: 500,
    completed: false,
    progress: 7,
    maxProgress: 10,
    daysLeft: 3,
    icon: Star
  },
  {
    id: "trade-route-champion",
    title: "Trade Route Champion",
    description: "Build 20 profitable trade routes",
    points: 750,
    completed: false,
    progress: 12,
    maxProgress: 20,
    daysLeft: 3,
    icon: TrendingUp
  },
  {
    id: "perfect-week",
    title: "Perfect Week",
    description: "Complete all daily challenges for 7 days",
    points: 1000,
    completed: false,
    progress: 4,
    maxProgress: 7,
    daysLeft: 3,
    icon: Trophy
  }
]

const userStats: UserStats = {
  totalPoints: 1250,
  dailyTasksCompleted: 8,
  weeklyChallengesCompleted: 2,
  currentStreak: 5,
  longestStreak: 12,
  rank: 23,
  level: 3,
  xpToNextLevel: 250,
  totalXP: 1750
}

export default function DailyTasksPage() {
  const [tasks, setTasks] = useState<DailyTask[]>(dailyTasks)
  const [challenges, setChallenges] = useState<WeeklyChallenge[]>(weeklyChallenges)
  const [stats, setStats] = useState<UserStats>(userStats)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Hard": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "games": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "streak": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "score": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "social": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const completedTasks = tasks.filter(task => task.completed).length
  const totalTasks = tasks.length
  const completionRate = (completedTasks / totalTasks) * 100

  const completedChallenges = challenges.filter(challenge => challenge.completed).length
  const totalChallenges = challenges.length

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/games">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Games
              </Link>
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Target className="h-8 w-8 text-primary" />
                Daily Tasks & Challenges
              </h1>
              <p className="text-muted-foreground mt-2">
                Complete daily tasks and weekly challenges to earn bonus points and achievements
              </p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Points</p>
                    <p className="text-2xl font-bold">{stats.totalPoints.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Tasks Completed</p>
                    <p className="text-2xl font-bold">{completedTasks}/{totalTasks}</p>
                  </div>
                </div>
                <Progress value={completionRate} className="mt-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Current Streak</p>
                    <p className="text-2xl font-bold">{stats.currentStreak} days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Level</p>
                    <p className="text-2xl font-bold">{stats.level}</p>
                  </div>
                </div>
                <Progress value={(stats.totalXP % 1000) / 10} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Daily Tasks */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Daily Tasks
                  </CardTitle>
                  <CardDescription>
                    Complete these tasks today to earn bonus points and achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tasks.map((task) => {
                      const Icon = task.icon
                      return (
                        <div
                          key={task.id}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            task.completed
                              ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${
                                task.completed 
                                  ? "bg-green-100 dark:bg-green-900" 
                                  : "bg-primary/10"
                              }`}>
                                <Icon className={`h-5 w-5 ${
                                  task.completed 
                                    ? "text-green-600 dark:text-green-400" 
                                    : "text-primary"
                                }`} />
                              </div>
                              <div>
                                <h3 className="font-semibold flex items-center gap-2">
                                  {task.title}
                                  {task.completed && (
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                  )}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {task.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <Badge className={getDifficultyColor(task.difficulty)}>
                                {task.difficulty}
                              </Badge>
                              <div className="text-right">
                                <div className="font-semibold text-primary">{task.points} pts</div>
                                {task.reward && (
                                  <div className="text-xs text-muted-foreground">{task.reward}</div>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm text-muted-foreground">
                              <span>Progress</span>
                              <span>{task.progress}/{task.maxProgress}</span>
                            </div>
                            <Progress value={(task.progress / task.maxProgress) * 100} className="h-2" />
                          </div>
                          
                          {task.category && (
                            <div className="mt-3">
                              <Badge variant="outline" className={getCategoryColor(task.category)}>
                                {task.category}
                              </Badge>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Weekly Challenges */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Weekly Challenges</CardTitle>
                  <CardDescription>
                    Complete these challenges by the end of the week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {challenges.map((challenge) => {
                      const Icon = challenge.icon
                      return (
                        <div
                          key={challenge.id}
                          className={`p-3 rounded-lg border ${
                            challenge.completed
                              ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                              : "border-border"
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <Icon className={`h-4 w-4 ${
                              challenge.completed 
                                ? "text-green-600 dark:text-green-400" 
                                : "text-primary"
                            }`} />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{challenge.title}</h4>
                              <p className="text-xs text-muted-foreground">{challenge.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-primary text-sm">{challenge.points}</div>
                              <div className="text-xs text-muted-foreground">{challenge.daysLeft}d left</div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Progress</span>
                              <span>{challenge.progress}/{challenge.maxProgress}</span>
                            </div>
                            <Progress value={(challenge.progress / challenge.maxProgress) * 100} className="h-1" />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 bg-muted/50 rounded">
                      <div className="p-1 bg-green-100 dark:bg-green-900 rounded">
                        <Trophy className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Getting Started</div>
                        <div className="text-xs text-muted-foreground">Completed first daily task</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-muted/50 rounded">
                      <div className="p-1 bg-blue-100 dark:bg-blue-900 rounded">
                        <Star className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Quiz Master</div>
                        <div className="text-xs text-muted-foreground">Scored 90% in Tariff Quiz</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-muted/50 rounded">
                      <div className="p-1 bg-purple-100 dark:bg-purple-900 rounded">
                        <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Streak Builder</div>
                        <div className="text-xs text-muted-foreground">5-day playing streak</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress to Next Level */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Level Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-3">
                    <div className="text-3xl font-bold text-primary">Level {stats.level}</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>XP to Next Level</span>
                        <span>{stats.xpToNextLevel}/1000</span>
                      </div>
                      <Progress value={(stats.totalXP % 1000) / 10} className="h-2" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total XP: {stats.totalXP.toLocaleString()}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full" size="sm">
                    <Link href="/games/daily-challenge">
                      <Target className="h-4 w-4 mr-2" />
                      Daily Challenge
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full" size="sm">
                    <Link href="/games/leaderboard">
                      <Trophy className="h-4 w-4 mr-2" />
                      View Leaderboard
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full" size="sm">
                    <Link href="/games">
                      <Users className="h-4 w-4 mr-2" />
                      Play Games
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
