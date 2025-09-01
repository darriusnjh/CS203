"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingDown, TrendingUp, Minus } from "lucide-react"

interface CountryData {
  country: string
  tariffRate: number
  additionalFees: number
  trend: "up" | "down" | "stable"
  flag: string
}

interface CountryComparisonProps {
  htsCode: string
  shipmentValue: number
}

export function CountryComparison({ htsCode, shipmentValue }: CountryComparisonProps) {
  // Mock data - in real app, this would be fetched based on HTS code
  const countryData: CountryData[] = [
    { country: "Mexico", tariffRate: 0.02, additionalFees: 150, trend: "down", flag: "🇲🇽" },
    { country: "Canada", tariffRate: 0.03, additionalFees: 180, trend: "stable", flag: "🇨🇦" },
    { country: "Vietnam", tariffRate: 0.04, additionalFees: 200, trend: "down", flag: "🇻🇳" },
    { country: "South Korea", tariffRate: 0.05, additionalFees: 220, trend: "up", flag: "🇰🇷" },
    { country: "Taiwan", tariffRate: 0.06, additionalFees: 250, trend: "stable", flag: "🇹🇼" },
    { country: "Germany", tariffRate: 0.07, additionalFees: 280, trend: "up", flag: "🇩🇪" },
    { country: "Japan", tariffRate: 0.08, additionalFees: 300, trend: "down", flag: "🇯🇵" },
    { country: "United Kingdom", tariffRate: 0.09, additionalFees: 320, trend: "stable", flag: "🇬🇧" },
    { country: "India", tariffRate: 0.12, additionalFees: 350, trend: "up", flag: "🇮🇳" },
    { country: "China", tariffRate: 0.15, additionalFees: 400, trend: "up", flag: "🇨🇳" },
  ]

  const calculateTotalCost = (tariffRate: number, additionalFees: number) => {
    const tariffCost = shipmentValue * tariffRate
    return tariffCost + additionalFees
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-green-500" />
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-red-500"
      case "down":
        return "text-green-500"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>Top 10 Countries - Lowest Tariff Costs</CardTitle>
        <CardDescription>
          {htsCode
            ? `Comparison for HTS Code: ${htsCode}`
            : "Enter an HTS code in the calculator to see specific comparisons"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {countryData.map((country, index) => {
            const totalCost = calculateTotalCost(country.tariffRate, country.additionalFees)
            const tariffCost = shipmentValue * country.tariffRate

            return (
              <div
                key={country.country}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-2xl">{country.flag}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{country.country}</span>
                        <Badge variant={index < 3 ? "default" : "secondary"} className="text-xs">
                          #{index + 1}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {(country.tariffRate * 100).toFixed(1)}% tariff rate
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-mono font-semibold">${totalCost.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">
                      ${tariffCost.toLocaleString()} tariff + ${country.additionalFees} fees
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 ${getTrendColor(country.trend)}`}>
                    {getTrendIcon(country.trend)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Calculations based on ${shipmentValue.toLocaleString()} shipment value. Actual costs
            may vary based on specific product classifications, trade agreements, and current regulations.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
