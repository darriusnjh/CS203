"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Trophy, 
  ArrowLeft, 
  Star,
  Target,
  Calendar,
  TrendingUp,
  Users,
  Award,
  Crown,
  Medal,
  Zap,
  Clock
} from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"
import Link from "next/link"

interface Player {
  id: string
  name: string
  avatar?: string
  totalPoints: number
  gamesPlayed: number
  winRate: number
  streak: number
  rank: number
  lastActive: string
  achievements: string[]
  gameStats: {
    tariffQuiz: { bestScore: number; gamesPlayed: number }
    tradeRoutes: { bestScore: number; gamesPlayed: number }
    importExport: { bestScore: number; gamesPlayed: number }
    dailyChallenge: { bestScore: number; gamesPlayed: number }
  }
}

interface LeaderboardData {
  global: Player[]
  weekly: Player[]
  monthly: Player[]
  gameSpecific: {
    tariffQuiz: Player[]
    tradeRoutes: Player[]
    importExport: Player[]
    dailyChallenge: Player[]
  }
}

const mockPlayers: Player[] = [
  {
    id: "1",
    name: "TradeMaster99",
    totalPoints: 15420,
    gamesPlayed: 45,
    winRate: 87.5,
    streak: 12,
    rank: 1,
    lastActive: "2 hours ago",
    achievements: ["Perfect Score", "Week Champion", "Quiz Master"],
    gameStats: {
      tariffQuiz: { bestScore: 100, gamesPlayed: 15 },
      tradeRoutes: { bestScore: 1200, gamesPlayed: 12 },
      importExport: { bestScore: 850, gamesPlayed: 10 },
      dailyChallenge: { bestScore: 300, gamesPlayed: 8 }
    }
  },
  {
    id: "2",
    name: "ImportExpert",
    totalPoints: 14230,
    gamesPlayed: 38,
    winRate: 82.1,
    streak: 8,
    rank: 2,
    lastActive: "1 hour ago",
    achievements: ["Route Builder", "Daily Streak"],
    gameStats: {
      tariffQuiz: { bestScore: 95, gamesPlayed: 12 },
      tradeRoutes: { bestScore: 1100, gamesPlayed: 15 },
      importExport: { bestScore: 900, gamesPlayed: 8 },
      dailyChallenge: { bestScore: 280, gamesPlayed: 3 }
    }
  },
  {
    id: "3",
    name: "TariffGuru",
    totalPoints: 13850,
    gamesPlayed: 42,
    winRate: 79.8,
    streak: 5,
    rank: 3,
    lastActive: "30 minutes ago",
    achievements: ["Quiz Master", "Speed Demon"],
    gameStats: {
      tariffQuiz: { bestScore: 100, gamesPlayed: 20 },
      tradeRoutes: { bestScore: 950, gamesPlayed: 10 },
      importExport: { bestScore: 750, gamesPlayed: 7 },
      dailyChallenge: { bestScore: 250, gamesPlayed: 5 }
    }
  },
  {
    id: "4",
    name: "GlobalTrader",
    totalPoints: 12500,
    gamesPlayed: 35,
    winRate: 75.2,
    streak: 3,
    rank: 4,
    lastActive: "4 hours ago",
    achievements: ["First Steps"],
    gameStats: {
      tariffQuiz: { bestScore: 85, gamesPlayed: 10 },
      tradeRoutes: { bestScore: 800, gamesPlayed: 12 },
      importExport: { bestScore: 600, gamesPlayed: 8 },
      dailyChallenge: { bestScore: 200, gamesPlayed: 5 }
    }
  },
  {
    id: "5",
    name: "SupplyChainPro",
    totalPoints: 11800,
    gamesPlayed: 28,
    winRate: 71.4,
    streak: 2,
    rank: 5,
    lastActive: "6 hours ago",
    achievements: ["Route Builder"],
    gameStats: {
      tariffQuiz: { bestScore: 80, gamesPlayed: 8 },
      tradeRoutes: { bestScore: 1000, gamesPlayed: 15 },
      importExport: { bestScore: 550, gamesPlayed: 3 },
      dailyChallenge: { bestScore: 180, gamesPlayed: 2 }
    }
  },
  {
    id: "6",
    name: "You",
    totalPoints: 1250,
    gamesPlayed: 12,
    winRate: 66.7,
    streak: 5,
    rank: 23,
    lastActive: "Just now",
    achievements: ["Getting Started"],
    gameStats: {
      tariffQuiz: { bestScore: 90, gamesPlayed: 5 },
      tradeRoutes: { bestScore: 400, gamesPlayed: 3 },
      importExport: { bestScore: 300, gamesPlayed: 2 },
      dailyChallenge: { bestScore: 150, gamesPlayed: 2 }
    }
  }
]

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData>({
    global: mockPlayers,
    weekly: mockPlayers.slice(0, 10),
    monthly: mockPlayers.slice(0, 15),
    gameSpecific: {
      tariffQuiz: mockPlayers.sort((a, b) => b.gameStats.tariffQuiz.bestScore - a.gameStats.tariffQuiz.bestScore),
      tradeRoutes: mockPlayers.sort((a, b) => b.gameStats.tradeRoutes.bestScore - a.gameStats.tradeRoutes.bestScore),
      importExport: mockPlayers.sort((a, b) => b.gameStats.importExport.bestScore - a.gameStats.importExport.bestScore),
      dailyChallenge: mockPlayers.sort((a, b) => b.gameStats.dailyChallenge.bestScore - a.gameStats.dailyChallenge.bestScore)
    }
  })

  const [selectedTab, setSelectedTab] = useState("global")
  const [selectedGame, setSelectedGame] = useState("tariffQuiz")

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />
      case 2: return <Medal className="h-5 w-5 text-gray-400" />
      case 3: return <Medal className="h-5 w-5 text-amber-600" />
      default: return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case 2: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      case 3: return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  const formatWinRate = (rate: number) => {
    return `${rate.toFixed(1)}%`
  }

  const getTimeAgo = (time: string) => {
    return time
  }

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
                <Trophy className="h-8 w-8 text-primary" />
                Leaderboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Compete with players worldwide and climb the rankings
              </p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Players</p>
                    <p className="text-2xl font-bold">{formatNumber(1247)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Games Played Today</p>
                    <p className="text-2xl font-bold">{formatNumber(342)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Your Rank</p>
                    <p className="text-2xl font-bold">#{23}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Your Points</p>
                    <p className="text-2xl font-bold">{formatNumber(1250)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Leaderboard */}
            <div className="lg:col-span-3">
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="global">Global</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
                
                <TabsContent value="global" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Trophy className="h-5 w-5" />
                        Global Leaderboard
                      </CardTitle>
                      <CardDescription>
                        Top players by total points earned
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {leaderboardData.global.map((player, index) => (
                          <div
                            key={player.id}
                            className={`flex items-center justify-between p-4 rounded-lg border ${
                              player.name === "You" 
                                ? "border-primary bg-primary/5" 
                                : "border-border"
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex items-center justify-center w-8 h-8">
                                {getRankIcon(player.rank)}
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white font-bold">
                                  {player.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div className="font-semibold flex items-center gap-2">
                                    {player.name}
                                    {player.name === "You" && (
                                      <Badge variant="secondary" className="text-xs">You</Badge>
                                    )}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {formatNumber(player.totalPoints)} points • {player.gamesPlayed} games
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="text-right">
                                <div className="font-semibold">{formatWinRate(player.winRate)}</div>
                                <div className="text-muted-foreground">Win Rate</div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold">{player.streak}</div>
                                <div className="text-muted-foreground">Streak</div>
                              </div>
                              <div className="text-right">
                                <div className="text-muted-foreground">{getTimeAgo(player.lastActive)}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="weekly" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Weekly Leaderboard
                      </CardTitle>
                      <CardDescription>
                        Top performers this week
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {leaderboardData.weekly.map((player, index) => (
                          <div
                            key={player.id}
                            className={`flex items-center justify-between p-4 rounded-lg border ${
                              player.name === "You" 
                                ? "border-primary bg-primary/5" 
                                : "border-border"
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex items-center justify-center w-8 h-8">
                                {getRankIcon(index + 1)}
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white font-bold">
                                  {player.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div className="font-semibold flex items-center gap-2">
                                    {player.name}
                                    {player.name === "You" && (
                                      <Badge variant="secondary" className="text-xs">You</Badge>
                                    )}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {formatNumber(player.totalPoints)} points
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="text-right">
                                <div className="font-semibold">{player.streak}</div>
                                <div className="text-muted-foreground">Streak</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="monthly" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Monthly Leaderboard
                      </CardTitle>
                      <CardDescription>
                        Top performers this month
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {leaderboardData.monthly.map((player, index) => (
                          <div
                            key={player.id}
                            className={`flex items-center justify-between p-4 rounded-lg border ${
                              player.name === "You" 
                                ? "border-primary bg-primary/5" 
                                : "border-border"
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex items-center justify-center w-8 h-8">
                                {getRankIcon(index + 1)}
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white font-bold">
                                  {player.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div className="font-semibold flex items-center gap-2">
                                    {player.name}
                                    {player.name === "You" && (
                                      <Badge variant="secondary" className="text-xs">You</Badge>
                                    )}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {formatNumber(player.totalPoints)} points
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="text-right">
                                <div className="font-semibold">{player.gamesPlayed}</div>
                                <div className="text-muted-foreground">Games</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Game-Specific Leaderboards */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Game Rankings</CardTitle>
                  <CardDescription>
                    Top players by game type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={selectedGame} onValueChange={setSelectedGame} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="tariffQuiz">Quiz</TabsTrigger>
                      <TabsTrigger value="tradeRoutes">Routes</TabsTrigger>
                    </TabsList>
                    <TabsList className="grid w-full grid-cols-2 mt-2">
                      <TabsTrigger value="importExport">Match</TabsTrigger>
                      <TabsTrigger value="dailyChallenge">Daily</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value={selectedGame} className="mt-4">
                      <div className="space-y-2">
                        {leaderboardData.gameSpecific[selectedGame as keyof typeof leaderboardData.gameSpecific].slice(0, 5).map((player, index) => (
                          <div key={player.id} className="flex items-center justify-between p-2 bg-muted/50 rounded text-sm">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-primary">#{index + 1}</span>
                              <span className="font-medium">{player.name}</span>
                            </div>
                            <span className="text-muted-foreground">
                              {player.gameStats[selectedGame as keyof typeof player.gameStats].bestScore}
                            </span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Your Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Points</span>
                      <span className="font-semibold">{formatNumber(1250)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Games Played</span>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Win Rate</span>
                      <span className="font-semibold">66.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Current Streak</span>
                      <span className="font-semibold">5 days</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">Best Scores</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Tariff Quiz</span>
                        <span className="font-semibold">90%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Trade Routes</span>
                        <span className="font-semibold">400</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Import/Export</span>
                        <span className="font-semibold">300</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Daily Challenge</span>
                        <span className="font-semibold">150</span>
                      </div>
                    </div>
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
                        <div className="text-xs text-muted-foreground">Played your first game</div>
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
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
