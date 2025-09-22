"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Puzzle, 
  ArrowLeft, 
  Trophy, 
  Star,
  Clock,
  Target,
  RotateCcw,
  CheckCircle,
  XCircle,
  Package,
  MapPin
} from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"
import Link from "next/link"

interface Product {
  id: string
  name: string
  category: string
  htsCode: string
  origin: string
  tariff: number
}

interface MatchItem {
  id: string
  type: "product" | "hts" | "origin"
  content: string
  matched: boolean
  correctMatch?: string
}

interface GameState {
  products: Product[]
  matchItems: MatchItem[]
  selectedItems: string[]
  matches: { [key: string]: string }
  score: number
  moves: number
  maxMoves: number
  timeSpent: number
  startTime: number
  level: number
}

const productData: Product[] = [
  {
    id: "electronics-1",
    name: "Smartphone",
    category: "Electronics",
    htsCode: "8517.12.00",
    origin: "China",
    tariff: 2.5
  },
  {
    id: "electronics-2", 
    name: "Laptop Computer",
    category: "Electronics",
    htsCode: "8471.30.01",
    origin: "Taiwan",
    tariff: 0.0
  },
  {
    id: "textiles-1",
    name: "Cotton T-Shirt",
    category: "Textiles",
    htsCode: "6109.10.00",
    origin: "Bangladesh",
    tariff: 16.5
  },
  {
    id: "textiles-2",
    name: "Wool Sweater",
    category: "Textiles", 
    htsCode: "6110.11.00",
    origin: "Italy",
    tariff: 12.0
  },
  {
    id: "automotive-1",
    name: "Car Engine",
    category: "Automotive",
    htsCode: "8408.20.00",
    origin: "Germany",
    tariff: 2.5
  },
  {
    id: "automotive-2",
    name: "Tire",
    category: "Automotive",
    htsCode: "4011.10.00",
    origin: "Thailand",
    tariff: 4.0
  },
  {
    id: "food-1",
    name: "Coffee Beans",
    category: "Food & Beverages",
    htsCode: "0901.11.00",
    origin: "Colombia",
    tariff: 0.0
  },
  {
    id: "food-2",
    name: "Wine",
    category: "Food & Beverages",
    htsCode: "2204.21.00",
    origin: "France",
    tariff: 0.5
  },
  {
    id: "machinery-1",
    name: "Industrial Pump",
    category: "Machinery",
    htsCode: "8413.70.20",
    origin: "Japan",
    tariff: 2.0
  },
  {
    id: "machinery-2",
    name: "Conveyor Belt",
    category: "Machinery",
    htsCode: "4010.12.00",
    origin: "South Korea",
    tariff: 3.5
  }
]

export default function ImportExportMatchPage() {
  const [gameState, setGameState] = useState<GameState>({
    products: [],
    matchItems: [],
    selectedItems: [],
    matches: {},
    score: 0,
    moves: 0,
    maxMoves: 20,
    timeSpent: 0,
    startTime: Date.now(),
    level: 1
  })

  const [gameCompleted, setGameCompleted] = useState(false)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        timeSpent: Math.floor((Date.now() - prev.startTime) / 1000)
      }))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const initializeGame = () => {
    // Select 6 random products for this level
    const shuffled = [...productData].sort(() => 0.5 - Math.random())
    const selectedProducts = shuffled.slice(0, 6)
    
    // Create match items
    const matchItems: MatchItem[] = []
    
    // Add products
    selectedProducts.forEach(product => {
      matchItems.push({
        id: `product-${product.id}`,
        type: "product",
        content: product.name,
        matched: false,
        correctMatch: `hts-${product.id}`
      })
    })
    
    // Add HTS codes
    selectedProducts.forEach(product => {
      matchItems.push({
        id: `hts-${product.id}`,
        type: "hts",
        content: product.htsCode,
        matched: false,
        correctMatch: `origin-${product.id}`
      })
    })
    
    // Add origins
    selectedProducts.forEach(product => {
      matchItems.push({
        id: `origin-${product.id}`,
        type: "origin",
        content: product.origin,
        matched: false,
        correctMatch: `product-${product.id}`
      })
    })
    
    // Shuffle match items
    const shuffledItems = matchItems.sort(() => 0.5 - Math.random())
    
    setGameState(prev => ({
      ...prev,
      products: selectedProducts,
      matchItems: shuffledItems,
      selectedItems: [],
      matches: {},
      score: 0,
      moves: 0,
      maxMoves: 20,
      timeSpent: 0,
      startTime: Date.now()
    }))
  }

  const handleItemClick = (itemId: string) => {
    if (gameState.moves >= gameState.maxMoves || gameCompleted) return
    
    const item = gameState.matchItems.find(i => i.id === itemId)
    if (!item || item.matched) return

    if (gameState.selectedItems.length === 0) {
      // First selection
      setGameState(prev => ({
        ...prev,
        selectedItems: [itemId]
      }))
    } else if (gameState.selectedItems.length === 1) {
      // Second selection - check for match
      const firstItem = gameState.matchItems.find(i => i.id === gameState.selectedItems[0])!
      const secondItem = gameState.matchItems.find(i => i.id === itemId)!
      
      // Check if this is a valid match (product -> hts -> origin -> product)
      const isValidMatch = 
        (firstItem.type === "product" && secondItem.type === "hts" && secondItem.correctMatch === `origin-${firstItem.id.split('-')[1]}`) ||
        (firstItem.type === "hts" && secondItem.type === "origin" && secondItem.correctMatch === `product-${firstItem.id.split('-')[1]}`) ||
        (firstItem.type === "origin" && secondItem.type === "product" && secondItem.correctMatch === `hts-${firstItem.id.split('-')[1]}`)
      
      if (isValidMatch) {
        // Correct match
        const newMatches = { ...gameState.matches }
        newMatches[firstItem.id] = itemId
        newMatches[itemId] = firstItem.id
        
        const newMatchItems = gameState.matchItems.map(i => 
          i.id === firstItem.id || i.id === itemId 
            ? { ...i, matched: true }
            : i
        )
        
        const pointsEarned = 50 + (20 - gameState.moves) * 2 // Bonus for fewer moves
        
        setGameState(prev => ({
          ...prev,
          matchItems: newMatchItems,
          matches: newMatches,
          selectedItems: [],
          score: prev.score + pointsEarned,
          moves: prev.moves + 1
        }))
        
        // Check if all items are matched
        if (newMatchItems.every(item => item.matched)) {
          setTimeout(() => setGameCompleted(true), 500)
        }
      } else {
        // Wrong match
        setGameState(prev => ({
          ...prev,
          selectedItems: [],
          moves: prev.moves + 1
        }))
      }
    }
  }

  const handleRestartGame = () => {
    initializeGame()
    setGameCompleted(false)
    setShowHint(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getScoreRating = (score: number) => {
    if (score >= 800) return { rating: "Perfect", color: "text-green-600", icon: Trophy }
    if (score >= 600) return { rating: "Excellent", color: "text-blue-600", icon: Star }
    if (score >= 400) return { rating: "Good", color: "text-yellow-600", icon: Target }
    return { rating: "Fair", color: "text-orange-600", icon: CheckCircle }
  }

  const getItemTypeColor = (type: string) => {
    switch (type) {
      case "product": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "hts": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "origin": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  if (gameCompleted) {
    const scoreRating = getScoreRating(gameState.score)
    const RatingIcon = scoreRating.icon
    const matchedPairs = Object.keys(gameState.matches).length / 2

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
                <CardTitle className="text-3xl">Puzzle Complete!</CardTitle>
                <CardDescription className="text-lg">
                  You matched {matchedPairs} product sets correctly
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className={`text-2xl font-bold ${scoreRating.color}`}>{gameState.score}</div>
                    <div className="text-sm text-muted-foreground">Final Score</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{matchedPairs}</div>
                    <div className="text-sm text-muted-foreground">Matches Made</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{gameState.moves}</div>
                    <div className="text-sm text-muted-foreground">Moves Used</div>
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
                <Puzzle className="h-8 w-8 text-primary" />
                Import/Export Matching
              </h1>
              <p className="text-muted-foreground mt-2">
                Match products with their correct HTS codes and countries of origin
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
                  <Star className="h-5 w-5 text-green-600" />
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
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Matches</p>
                    <p className="text-lg font-semibold">
                      {Object.keys(gameState.matches).length / 2}
                    </p>
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
            {/* Matching Game */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Match the Items
                  </CardTitle>
                  <CardDescription>
                    Click on items to match them. Connect products → HTS codes → origins → products.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {gameState.matchItems.map((item) => {
                      const isSelected = gameState.selectedItems.includes(item.id)
                      const isMatched = item.matched
                      
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleItemClick(item.id)}
                          disabled={isMatched || gameState.moves >= gameState.maxMoves}
                          className={`p-4 rounded-lg border-2 transition-all text-center ${
                            isMatched
                              ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                              : isSelected
                              ? "border-primary bg-primary/10"
                              : "border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-primary/5"
                          } ${gameState.moves >= gameState.maxMoves ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                        >
                          <div className="space-y-2">
                            <Badge className={getItemTypeColor(item.type)}>
                              {item.type.toUpperCase()}
                            </Badge>
                            <div className="font-medium text-sm">
                              {item.content}
                            </div>
                            {isMatched && (
                              <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                            )}
                          </div>
                        </button>
                      )
                    })}
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
                    <p>Click on a product to select it</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p>Click on its matching HTS code</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p>Click on the country of origin</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p>Complete the cycle back to the product</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Item Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        PRODUCT
                      </Badge>
                      <span>Product names</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        HTS
                      </Badge>
                      <span>Harmonized Tariff Schedule codes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                        ORIGIN
                      </Badge>
                      <span>Countries of origin</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Scoring</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Correct match:</span>
                    <span className="font-semibold text-green-600">+50 points</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speed bonus:</span>
                    <span className="font-semibold text-blue-600">+2 per move left</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Perfect game:</span>
                    <span className="font-semibold text-purple-600">+100 bonus</span>
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
