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
  RotateCcw,
  CheckCircle,
  XCircle,
  Calendar,
  TrendingUp,
  DollarSign,
  AlertTriangle
} from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"
import Link from "next/link"

interface TradeScenario {
  id: string
  title: string
  description: string
  products: string[]
  countries: string[]
  constraints: string[]
  optimalSolution: {
    product: string
    country: string
    reasoning: string
  }
  alternatives: {
    product: string
    country: string
    reasoning: string
    penalty: number
  }[]
}

interface GameState {
  currentScenario: TradeScenario
  selectedProduct: string | null
  selectedCountry: string | null
  score: number
  timeSpent: number
  startTime: number
  completed: boolean
  attempts: number
  maxAttempts: number
}

const dailyScenarios: TradeScenario[] = [
  {
    id: "scenario-1",
    title: "Electronics Import Challenge",
    description: "You need to import electronic components for your manufacturing business. Consider tariffs, quality, and supply chain reliability.",
    products: ["Smartphone Components", "Computer Chips", "LED Displays", "Battery Cells"],
    countries: ["China", "South Korea", "Taiwan", "Vietnam"],
    constraints: [
      "Budget limit: $500,000",
      "Must arrive within 30 days",
      "Quality standards: ISO 9001 certified",
      "Tariff preference: Under 5%"
    ],
    optimalSolution: {
      product: "Computer Chips",
      country: "Taiwan",
      reasoning: "Taiwan offers high-quality chips with low tariffs (2.5%), excellent supply chain reliability, and meets all quality standards."
    },
    alternatives: [
      {
        product: "Smartphone Components",
        country: "China",
        reasoning: "Lower cost but higher tariffs (6.5%) and longer shipping times.",
        penalty: 50
      },
      {
        product: "LED Displays",
        country: "South Korea",
        reasoning: "Good quality but expensive and limited availability.",
        penalty: 75
      }
    ]
  },
  {
    id: "scenario-2",
    title: "Textile Sourcing Dilemma",
    description: "Your fashion brand needs sustainable cotton fabric. Balance cost, sustainability, and market access.",
    products: ["Organic Cotton", "Recycled Polyester", "Bamboo Fiber", "Hemp Fabric"],
    countries: ["India", "Bangladesh", "Turkey", "Peru"],
    constraints: [
      "Sustainability certification required",
      "Minimum order: 10,000 yards",
      "Lead time: 45 days maximum",
      "Price target: Under $8/yard"
    ],
    optimalSolution: {
      product: "Organic Cotton",
      country: "India",
      reasoning: "India is the world's largest organic cotton producer with excellent sustainability certifications, competitive pricing, and reliable delivery."
    },
    alternatives: [
      {
        product: "Bamboo Fiber",
        country: "Peru",
        reasoning: "Sustainable but limited production capacity and higher costs.",
        penalty: 60
      },
      {
        product: "Recycled Polyester",
        country: "Turkey",
        reasoning: "Good sustainability credentials but higher price point.",
        penalty: 40
      }
    ]
  },
  {
    id: "scenario-3",
    title: "Automotive Parts Crisis",
    description: "Supply chain disruption requires finding alternative suppliers for critical automotive components.",
    products: ["Engine Parts", "Brake Systems", "Transmission Components", "Electrical Systems"],
    countries: ["Germany", "Japan", "Mexico", "Thailand"],
    constraints: [
      "Quality: OEM standards only",
      "Delivery: 2-week maximum",
      "Certification: ISO/TS 16949",
      "Cost: Within 15% of current supplier"
    ],
    optimalSolution: {
      product: "Engine Parts",
      country: "Germany",
      reasoning: "German automotive parts meet highest OEM standards, have excellent certification, and can deliver within timeframe."
    },
    alternatives: [
      {
        product: "Brake Systems",
        country: "Japan",
        reasoning: "High quality but longer lead times and higher costs.",
        penalty: 80
      },
      {
        product: "Transmission Components",
        country: "Mexico",
        reasoning: "Good proximity but quality concerns and certification delays.",
        penalty: 90
      }
    ]
  }
]

export default function DailyChallengePage() {
  const [gameState, setGameState] = useState<GameState>({
    currentScenario: dailyScenarios[0],
    selectedProduct: null,
    selectedCountry: null,
    score: 0,
    timeSpent: 0,
    startTime: Date.now(),
    completed: false,
    attempts: 0,
    maxAttempts: 3
  })

  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [selectedSolution, setSelectedSolution] = useState<any>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        timeSpent: Math.floor((Date.now() - prev.startTime) / 1000)
      }))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleProductSelect = (product: string) => {
    if (gameState.completed) return
    setGameState(prev => ({ ...prev, selectedProduct: product }))
  }

  const handleCountrySelect = (country: string) => {
    if (gameState.completed) return
    setGameState(prev => ({ ...prev, selectedCountry: country }))
  }

  const handleSubmitSolution = () => {
    if (!gameState.selectedProduct || !gameState.selectedCountry) return

    const isOptimal = 
      gameState.selectedProduct === gameState.currentScenario.optimalSolution.product &&
      gameState.selectedCountry === gameState.currentScenario.optimalSolution.country

    const alternative = gameState.currentScenario.alternatives.find(
      alt => alt.product === gameState.selectedProduct && alt.country === gameState.selectedCountry
    )

    let points = 0
    let solution = null

    if (isOptimal) {
      points = 300
      solution = gameState.currentScenario.optimalSolution
    } else if (alternative) {
      points = Math.max(50, 300 - alternative.penalty)
      solution = alternative
    } else {
      points = 25
      solution = {
        product: gameState.selectedProduct,
        country: gameState.selectedCountry,
        reasoning: "This combination doesn't meet the optimal criteria for this scenario."
      }
    }

    setGameState(prev => ({
      ...prev,
      score: prev.score + points,
      completed: true,
      attempts: prev.attempts + 1
    }))

    setIsCorrect(isOptimal)
    setSelectedSolution(solution)
    setShowResult(true)
  }

  const handleRestartChallenge = () => {
    const randomScenario = dailyScenarios[Math.floor(Math.random() * dailyScenarios.length)]
    setGameState({
      currentScenario: randomScenario,
      selectedProduct: null,
      selectedCountry: null,
      score: 0,
      timeSpent: 0,
      startTime: Date.now(),
      completed: false,
      attempts: 0,
      maxAttempts: 3
    })
    setShowResult(false)
    setIsCorrect(false)
    setSelectedSolution(null)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getScoreRating = (score: number) => {
    if (score >= 250) return { rating: "Excellent", color: "text-green-600", icon: Trophy }
    if (score >= 200) return { rating: "Good", color: "text-blue-600", icon: Star }
    if (score >= 100) return { rating: "Fair", color: "text-yellow-600", icon: Target }
    return { rating: "Needs Improvement", color: "text-red-600", icon: AlertTriangle }
  }

  if (showResult && gameState.completed) {
    const scoreRating = getScoreRating(gameState.score)
    const RatingIcon = scoreRating.icon

    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <Card className="text-center">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  <div className={`p-4 rounded-full ${isCorrect ? "bg-green-100 dark:bg-green-900" : "bg-orange-100 dark:bg-orange-900"}`}>
                    <RatingIcon className={`h-12 w-12 ${isCorrect ? "text-green-600 dark:text-green-400" : "text-orange-600 dark:text-orange-400"}`} />
                  </div>
                </div>
                <CardTitle className="text-3xl">
                  {isCorrect ? "Perfect Solution!" : "Solution Submitted"}
                </CardTitle>
                <CardDescription className="text-lg">
                  {isCorrect 
                    ? "You found the optimal trade solution!" 
                    : "Here's how your solution performed"
                  }
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className={`text-2xl font-bold ${scoreRating.color}`}>{gameState.score}</div>
                    <div className="text-sm text-muted-foreground">Points Earned</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{formatTime(gameState.timeSpent)}</div>
                    <div className="text-sm text-muted-foreground">Time Spent</div>
                  </div>
                </div>

                <div className="text-center">
                  <Badge className={`text-lg px-4 py-2 ${scoreRating.color}`}>
                    {scoreRating.rating} Performance
                  </Badge>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Your Solution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Product:</span>
                        <span>{gameState.selectedProduct}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Country:</span>
                        <span>{gameState.selectedCountry}</span>
                      </div>
                      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold mb-2">Analysis:</h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedSolution?.reasoning}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {!isCorrect && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Optimal Solution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium">Product:</span>
                          <span>{gameState.currentScenario.optimalSolution.product}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Country:</span>
                          <span>{gameState.currentScenario.optimalSolution.country}</span>
                        </div>
                        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">Why this is optimal:</h4>
                          <p className="text-sm text-green-600 dark:text-green-400">
                            {gameState.currentScenario.optimalSolution.reasoning}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-4">
                  <Button asChild className="w-full" size="lg">
                    <Link href="/games">
                      Back to Games
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={handleRestartChallenge} className="w-full" size="lg">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Try Another Challenge
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
        <div className="max-w-4xl mx-auto">
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
                Daily Trade Challenge
              </h1>
              <p className="text-muted-foreground mt-2">
                Solve today's special trade scenario puzzle and earn bonus points
              </p>
            </div>
          </div>

          {/* Game Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Daily Challenge</p>
                    <p className="text-lg font-semibold">Day {new Date().getDate()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="text-lg font-semibold">{formatTime(gameState.timeSpent)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Max Points</p>
                    <p className="text-lg font-semibold">300</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Challenge Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Scenario Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Trade Scenario
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-xl font-semibold">{gameState.currentScenario.title}</h3>
                  <p className="text-muted-foreground">{gameState.currentScenario.description}</p>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Constraints:</h4>
                    <ul className="space-y-1">
                      {gameState.currentScenario.constraints.map((constraint, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          {constraint}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Product Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Select Product</CardTitle>
                  <CardDescription>Choose the best product for this scenario</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {gameState.currentScenario.products.map((product) => (
                      <button
                        key={product}
                        onClick={() => handleProductSelect(product)}
                        disabled={gameState.completed}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          gameState.selectedProduct === product
                            ? "border-primary bg-primary/10"
                            : "border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-primary/5"
                        } ${gameState.completed ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                      >
                        <div className="font-medium">{product}</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Country Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Select Country</CardTitle>
                  <CardDescription>Choose the best country for sourcing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {gameState.currentScenario.countries.map((country) => (
                      <button
                        key={country}
                        onClick={() => handleCountrySelect(country)}
                        disabled={gameState.completed}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          gameState.selectedCountry === country
                            ? "border-primary bg-primary/10"
                            : "border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-primary/5"
                        } ${gameState.completed ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                      >
                        <div className="font-medium">{country}</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button 
                  onClick={handleSubmitSolution}
                  disabled={!gameState.selectedProduct || !gameState.selectedCountry || gameState.completed}
                  size="lg"
                >
                  Submit Solution
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Challenge Rules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p>Read the scenario carefully</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p>Consider all constraints</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p>Select optimal product-country combination</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p>Submit your solution</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Scoring</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Optimal solution:</span>
                    <span className="font-semibold text-green-600">300 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Good alternative:</span>
                    <span className="font-semibold text-blue-600">200-250 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Acceptable choice:</span>
                    <span className="font-semibold text-yellow-600">100-150 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Poor choice:</span>
                    <span className="font-semibold text-red-600">25-50 pts</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Daily Bonus</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">+100</div>
                    <div className="text-sm text-muted-foreground">Daily completion bonus</div>
                  </div>
                </CardContent>
              </Card>

              <Button variant="outline" onClick={handleRestartChallenge} className="w-full">
                <RotateCcw className="h-4 w-4 mr-2" />
                New Challenge
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
