"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Route, 
  ArrowLeft, 
  Trophy, 
  Star,
  Clock,
  Target,
  RotateCcw,
  MapPin,
  DollarSign,
  TrendingUp,
  CheckCircle
} from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"
import Link from "next/link"

interface Country {
  id: string
  name: string
  x: number
  y: number
  tariffRate: number
  demand: number
  supply: number
  color: string
}

interface Route {
  from: string
  to: string
  cost: number
  tariff: number
  profit: number
  distance: number
}

interface GameState {
  selectedCountry: string | null
  routes: Route[]
  totalCost: number
  totalProfit: number
  score: number
  moves: number
  maxMoves: number
  timeSpent: number
  startTime: number
}

const countries: Country[] = [
  { id: "usa", name: "USA", x: 150, y: 200, tariffRate: 2.5, demand: 8, supply: 6, color: "bg-blue-500" },
  { id: "china", name: "China", x: 400, y: 180, tariffRate: 3.2, demand: 9, supply: 8, color: "bg-red-500" },
  { id: "germany", name: "Germany", x: 250, y: 150, tariffRate: 1.8, demand: 7, supply: 7, color: "bg-yellow-500" },
  { id: "japan", name: "Japan", x: 450, y: 200, tariffRate: 2.1, demand: 6, supply: 8, color: "bg-green-500" },
  { id: "brazil", name: "Brazil", x: 200, y: 350, tariffRate: 4.5, demand: 5, supply: 9, color: "bg-orange-500" },
  { id: "india", name: "India", x: 350, y: 250, tariffRate: 3.8, demand: 8, supply: 7, color: "bg-purple-500" },
  { id: "australia", name: "Australia", x: 450, y: 350, tariffRate: 2.8, demand: 4, supply: 6, color: "bg-cyan-500" },
  { id: "canada", name: "Canada", x: 150, y: 100, tariffRate: 1.5, demand: 5, supply: 8, color: "bg-pink-500" }
]

const calculateRouteCost = (from: Country, to: Country): number => {
  const distance = Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2))
  return Math.round(distance * 0.1) // Base cost per distance unit
}

const calculateRouteProfit = (from: Country, to: Country, cost: number): number => {
  const tariffCost = cost * (to.tariffRate / 100)
  const demandBonus = to.demand * 10
  const supplyBonus = from.supply * 8
  return Math.round(demandBonus + supplyBonus - cost - tariffCost)
}

export default function TradeRoutesPage() {
  const [gameState, setGameState] = useState<GameState>({
    selectedCountry: null,
    routes: [],
    totalCost: 0,
    totalProfit: 0,
    score: 0,
    moves: 0,
    maxMoves: 15,
    timeSpent: 0,
    startTime: Date.now()
  })

  const [gameCompleted, setGameCompleted] = useState(false)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        timeSpent: Math.floor((Date.now() - prev.startTime) / 1000)
      }))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleCountryClick = (countryId: string) => {
    if (gameState.moves >= gameState.maxMoves || gameCompleted) return

    if (!gameState.selectedCountry) {
      setGameState(prev => ({ ...prev, selectedCountry: countryId }))
    } else if (gameState.selectedCountry !== countryId) {
      // Create route
      const fromCountry = countries.find(c => c.id === gameState.selectedCountry)!
      const toCountry = countries.find(c => c.id === countryId)!
      
      const cost = calculateRouteCost(fromCountry, toCountry)
      const profit = calculateRouteProfit(fromCountry, toCountry, cost)
      
      const newRoute: Route = {
        from: gameState.selectedCountry,
        to: countryId,
        cost,
        tariff: cost * (toCountry.tariffRate / 100),
        profit,
        distance: Math.sqrt(Math.pow(toCountry.x - fromCountry.x, 2) + Math.pow(toCountry.y - fromCountry.y, 2))
      }

      const newRoutes = [...gameState.routes, newRoute]
      const newTotalCost = newRoutes.reduce((sum, route) => sum + route.cost, 0)
      const newTotalProfit = newRoutes.reduce((sum, route) => sum + route.profit, 0)
      const newScore = newTotalProfit - newTotalCost

      setGameState(prev => ({
        ...prev,
        routes: newRoutes,
        totalCost: newTotalCost,
        totalProfit: newTotalProfit,
        score: newScore,
        moves: prev.moves + 1,
        selectedCountry: null
      }))

      // Check if game should end
      if (prev.moves + 1 >= prev.maxMoves) {
        setGameCompleted(true)
      }
    } else {
      // Deselect same country
      setGameState(prev => ({ ...prev, selectedCountry: null }))
    }
  }

  const handleRestartGame = () => {
    setGameState({
      selectedCountry: null,
      routes: [],
      totalCost: 0,
      totalProfit: 0,
      score: 0,
      moves: 0,
      maxMoves: 15,
      timeSpent: 0,
      startTime: Date.now()
    })
    setGameCompleted(false)
    setShowHint(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getScoreRating = (score: number) => {
    if (score >= 1000) return { rating: "Excellent", color: "text-green-600", icon: Trophy }
    if (score >= 500) return { rating: "Good", color: "text-blue-600", icon: Star }
    if (score >= 0) return { rating: "Fair", color: "text-yellow-600", icon: Target }
    return { rating: "Poor", color: "text-red-600", icon: TrendingUp }
  }

  if (gameCompleted) {
    const scoreRating = getScoreRating(gameState.score)
    const RatingIcon = scoreRating.icon

    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <RatingIcon className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-3xl">Game Complete!</CardTitle>
                <CardDescription className="text-lg">
                  You built {gameState.routes.length} trade routes
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className={`text-2xl font-bold ${scoreRating.color}`}>{gameState.score}</div>
                    <div className="text-sm text-muted-foreground">Final Score</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{gameState.routes.length}</div>
                    <div className="text-sm text-muted-foreground">Routes Built</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{gameState.totalProfit}</div>
                    <div className="text-sm text-muted-foreground">Total Profit</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{formatTime(gameState.timeSpent)}</div>
                    <div className="text-sm text-muted-foreground">Time Spent</div>
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
                  <Button variant="outline" onClick={handleRestartGame} className="w-full" size="lg">
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
                <Route className="h-8 w-8 text-primary" />
                Trade Route Builder
              </h1>
              <p className="text-muted-foreground mt-2">
                Connect countries with optimal trade routes while managing costs and tariffs
              </p>
            </div>
          </div>

          {/* Game Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Moves Left</p>
                    <p className="text-lg font-semibold">
                      {gameState.maxMoves - gameState.moves}
                    </p>
                  </div>
                </div>
                <Progress 
                  value={((gameState.maxMoves - gameState.moves) / gameState.maxMoves) * 100} 
                  className="mt-2" 
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Profit</p>
                    <p className="text-lg font-semibold">{gameState.totalProfit}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Score</p>
                    <p className="text-lg font-semibold">{gameState.score}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="text-lg font-semibold">{formatTime(gameState.timeSpent)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Game Map */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    World Trade Map
                  </CardTitle>
                  <CardDescription>
                    Click on countries to build trade routes. Connect high-supply countries to high-demand countries for maximum profit.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 rounded-lg p-8 min-h-[400px]">
                    {/* Countries */}
                    {countries.map((country) => (
                      <div
                        key={country.id}
                        onClick={() => handleCountryClick(country.id)}
                        className={`absolute w-12 h-12 rounded-full ${country.color} cursor-pointer transition-all hover:scale-110 shadow-lg flex items-center justify-center text-white font-bold text-sm ${
                          gameState.selectedCountry === country.id 
                            ? "ring-4 ring-primary ring-offset-2 scale-110" 
                            : ""
                        } ${gameState.moves >= gameState.maxMoves ? "cursor-not-allowed opacity-50" : ""}`}
                        style={{ left: country.x, top: country.y }}
                      >
                        {country.name.slice(0, 2).toUpperCase()}
                      </div>
                    ))}

                    {/* Routes */}
                    {gameState.routes.map((route, index) => {
                      const fromCountry = countries.find(c => c.id === route.from)!
                      const toCountry = countries.find(c => c.id === route.to)!
                      
                      return (
                        <svg
                          key={index}
                          className="absolute inset-0 w-full h-full pointer-events-none"
                        >
                          <line
                            x1={fromCountry.x + 24}
                            y1={fromCountry.y + 24}
                            x2={toCountry.x + 24}
                            y2={toCountry.y + 24}
                            stroke={route.profit > 0 ? "#10b981" : "#ef4444"}
                            strokeWidth="3"
                            strokeDasharray="5,5"
                            className="animate-pulse"
                          />
                        </svg>
                      )
                    })}

                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg">
                      <h4 className="font-semibold text-sm mb-2">Legend</h4>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span>Profitable Route</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span>Loss Route</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-primary rounded-full"></div>
                          <span>Selected Country</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Game Info */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How to Play</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p>Click on a country to select it (highlighted in blue)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p>Click on another country to create a trade route</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p>Maximize profit by connecting high-supply to high-demand countries</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p>Consider tariff rates and distance costs</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Country Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    {countries.map((country) => (
                      <div key={country.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 ${country.color} rounded-full`}></div>
                          <span className="font-medium">{country.name}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Tariff: {country.tariffRate}%
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Routes Built</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {gameState.routes.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No routes built yet
                      </p>
                    ) : (
                      gameState.routes.map((route, index) => {
                        const fromCountry = countries.find(c => c.id === route.from)!
                        const toCountry = countries.find(c => c.id === route.to)!
                        
                        return (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded text-sm">
                            <div>
                              <div className="font-medium">
                                {fromCountry.name} → {toCountry.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Cost: {route.cost} | Tariff: {route.tariff.toFixed(1)}
                              </div>
                            </div>
                            <div className={`font-semibold ${route.profit > 0 ? "text-green-600" : "text-red-600"}`}>
                              {route.profit > 0 ? "+" : ""}{route.profit}
                            </div>
                          </div>
                        )
                      })
                    )}
                  </div>
                </CardContent>
              </Card>

              <Button variant="outline" onClick={handleRestartGame} className="w-full">
                <RotateCcw className="h-4 w-4 mr-2" />
                Restart Game
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
