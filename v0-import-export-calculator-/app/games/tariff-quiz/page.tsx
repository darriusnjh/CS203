"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Brain, 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  Trophy, 
  Star,
  Clock,
  Target,
  RotateCcw
} from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"
import Link from "next/link"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: string
  difficulty: "Easy" | "Medium" | "Hard"
}

interface QuizResult {
  score: number
  totalQuestions: number
  correctAnswers: number
  timeSpent: number
  pointsEarned: number
  perfectScore: boolean
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is a tariff?",
    options: [
      "A tax imposed on imported goods",
      "A subsidy given to domestic producers",
      "A quota limit on exports",
      "A trade agreement between countries"
    ],
    correctAnswer: 0,
    explanation: "A tariff is a tax imposed by a government on imported goods to protect domestic industries and generate revenue.",
    category: "Basic Concepts",
    difficulty: "Easy"
  },
  {
    id: 2,
    question: "Which organization oversees global trade rules?",
    options: [
      "United Nations",
      "World Trade Organization (WTO)",
      "International Monetary Fund",
      "World Bank"
    ],
    correctAnswer: 1,
    explanation: "The WTO is responsible for overseeing global trade rules and resolving trade disputes between countries.",
    category: "Trade Organizations",
    difficulty: "Easy"
  },
  {
    id: 3,
    question: "What does HTS code stand for?",
    options: [
      "Harmonized Tariff Schedule",
      "High Trade Standards",
      "Heavy Transport System",
      "Human Trade Services"
    ],
    correctAnswer: 0,
    explanation: "HTS stands for Harmonized Tariff Schedule, a standardized system for classifying goods for import/export.",
    category: "Classification",
    difficulty: "Medium"
  },
  {
    id: 4,
    question: "Which type of tariff is calculated as a percentage of the product's value?",
    options: [
      "Specific tariff",
      "Ad valorem tariff",
      "Compound tariff",
      "Prohibitive tariff"
    ],
    correctAnswer: 1,
    explanation: "Ad valorem tariffs are calculated as a percentage of the product's value, making them proportional to price changes.",
    category: "Tariff Types",
    difficulty: "Medium"
  },
  {
    id: 5,
    question: "What is the purpose of a free trade agreement (FTA)?",
    options: [
      "To increase tariffs between countries",
      "To eliminate or reduce tariffs between participating countries",
      "To establish trade quotas",
      "To create trade barriers"
    ],
    correctAnswer: 1,
    explanation: "FTAs are designed to eliminate or significantly reduce tariffs and other trade barriers between participating countries.",
    category: "Trade Agreements",
    difficulty: "Medium"
  },
  {
    id: 6,
    question: "Which country is the world's largest exporter?",
    options: [
      "United States",
      "China",
      "Germany",
      "Japan"
    ],
    correctAnswer: 1,
    explanation: "China has been the world's largest exporter since 2009, exporting goods worth over $3 trillion annually.",
    category: "Global Trade",
    difficulty: "Hard"
  },
  {
    id: 7,
    question: "What is dumping in international trade?",
    options: [
      "Exporting goods at prices below their domestic market value",
      "Importing goods illegally",
      "Destroying excess inventory",
      "Selling goods at premium prices"
    ],
    correctAnswer: 0,
    explanation: "Dumping occurs when a company exports goods at prices lower than their normal value in the domestic market.",
    category: "Trade Practices",
    difficulty: "Hard"
  },
  {
    id: 8,
    question: "Which document is required for most international shipments?",
    options: [
      "Commercial invoice",
      "Bill of lading",
      "Certificate of origin",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Most international shipments require a commercial invoice, bill of lading, and certificate of origin.",
    category: "Documentation",
    difficulty: "Medium"
  },
  {
    id: 9,
    question: "What is the difference between CIF and FOB?",
    options: [
      "CIF includes insurance and freight, FOB does not",
      "FOB includes insurance and freight, CIF does not",
      "They are the same thing",
      "CIF is for exports, FOB is for imports"
    ],
    correctAnswer: 0,
    explanation: "CIF (Cost, Insurance, Freight) includes insurance and freight costs, while FOB (Free on Board) does not.",
    category: "Shipping Terms",
    difficulty: "Hard"
  },
  {
    id: 10,
    question: "Which factor does NOT typically affect tariff rates?",
    options: [
      "Country of origin",
      "Product classification",
      "Trade agreements",
      "Weather conditions"
    ],
    correctAnswer: 3,
    explanation: "Weather conditions do not affect tariff rates, which are based on trade policies, agreements, and product classifications.",
    category: "Tariff Factors",
    difficulty: "Easy"
  }
]

export default function TariffQuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null))
  const [startTime, setStartTime] = useState<number>(Date.now())
  const [timeSpent, setTimeSpent] = useState(0)
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)

    return () => clearInterval(timer)
  }, [startTime])

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return
    
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = selectedAnswer
    setAnswers(newAnswers)
    setShowResult(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(answers[currentQuestionIndex + 1])
      setShowResult(false)
    } else {
      // Quiz completed
      const correctAnswers = answers.filter((answer, index) => answer === questions[index].correctAnswer).length
      const score = Math.round((correctAnswers / questions.length) * 100)
      const pointsEarned = correctAnswers * 10 + (score === 100 ? 50 : 0) // Bonus for perfect score
      
      setQuizResult({
        score,
        totalQuestions: questions.length,
        correctAnswers,
        timeSpent,
        pointsEarned,
        perfectScore: score === 100
      })
      setQuizCompleted(true)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setQuizCompleted(false)
    setAnswers(new Array(questions.length).fill(null))
    setStartTime(Date.now())
    setTimeSpent(0)
    setQuizResult(null)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Hard": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (quizCompleted && quizResult) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  {quizResult.perfectScore ? (
                    <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                      <Trophy className="h-12 w-12 text-yellow-600 dark:text-yellow-400" />
                    </div>
                  ) : (
                    <div className="p-4 bg-primary/10 rounded-full">
                      <Star className="h-12 w-12 text-primary" />
                    </div>
                  )}
                </div>
                <CardTitle className="text-3xl">
                  {quizResult.perfectScore ? "Perfect Score!" : "Quiz Completed!"}
                </CardTitle>
                <CardDescription className="text-lg">
                  {quizResult.perfectScore 
                    ? "Outstanding! You got every question right!" 
                    : `You scored ${quizResult.score}% on the Tariff Quiz Challenge`
                  }
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{quizResult.score}%</div>
                    <div className="text-sm text-muted-foreground">Final Score</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{quizResult.correctAnswers}</div>
                    <div className="text-sm text-muted-foreground">Correct Answers</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{formatTime(quizResult.timeSpent)}</div>
                    <div className="text-sm text-muted-foreground">Time Spent</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{quizResult.pointsEarned}</div>
                    <div className="text-sm text-muted-foreground">Points Earned</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button asChild className="w-full" size="lg">
                    <Link href="/games">
                      Back to Games
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={handleRestartQuiz} className="w-full" size="lg">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Retake Quiz
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
                <Brain className="h-8 w-8 text-primary" />
                Tariff Quiz Challenge
              </h1>
              <p className="text-muted-foreground mt-2">
                Test your knowledge of tariffs, trade policies, and regulations
              </p>
            </div>
          </div>

          {/* Progress and Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Progress</p>
                    <p className="text-lg font-semibold">
                      {currentQuestionIndex + 1} / {questions.length}
                    </p>
                  </div>
                </div>
                <Progress value={progress} className="mt-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time Spent</p>
                    <p className="text-lg font-semibold">{formatTime(timeSpent)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Points Available</p>
                    <p className="text-lg font-semibold">
                      {answers.filter(answer => answer !== null).length * 10}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Card */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                  {currentQuestion.difficulty}
                </Badge>
                <Badge variant="outline">
                  {currentQuestion.category}
                </Badge>
              </div>
              <CardTitle className="text-xl">
                Question {currentQuestionIndex + 1}
              </CardTitle>
              <CardDescription className="text-lg">
                {currentQuestion.question}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index
                const isCorrect = index === currentQuestion.correctAnswer
                const isWrong = showResult && isSelected && !isCorrect
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      showResult
                        ? isCorrect
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                          : isWrong
                          ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                          : "border-gray-200 dark:border-gray-700"
                        : isSelected
                        ? "border-primary bg-primary/10"
                        : "border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        showResult
                          ? isCorrect
                            ? "border-green-500 bg-green-500"
                            : isWrong
                            ? "border-red-500 bg-red-500"
                            : "border-gray-300"
                          : isSelected
                          ? "border-primary bg-primary"
                          : "border-gray-300"
                      }`}>
                        {showResult && isCorrect && (
                          <CheckCircle className="h-4 w-4 text-white" />
                        )}
                        {showResult && isWrong && (
                          <XCircle className="h-4 w-4 text-white" />
                        )}
                        {!showResult && isSelected && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <span className={`font-medium ${
                        showResult
                          ? isCorrect
                            ? "text-green-700 dark:text-green-300"
                            : isWrong
                            ? "text-red-700 dark:text-red-300"
                            : ""
                          : ""
                      }`}>
                        {option}
                      </span>
                    </div>
                  </button>
                )
              })}

              {showResult && (
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Explanation:</h4>
                  <p className="text-sm text-muted-foreground">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}

              <div className="flex justify-end mt-6">
                {!showResult ? (
                  <Button 
                    onClick={handleSubmitAnswer} 
                    disabled={selectedAnswer === null}
                    size="lg"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button onClick={handleNextQuestion} size="lg">
                    {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
