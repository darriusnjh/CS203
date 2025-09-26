"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Package, DollarSign, Globe } from "lucide-react"

interface TopImportingCountry {
  countryCode: string
  countryName: string
  totalImports: number
  averageTariffRate: number
  primaryImportCategory: string
}

interface TopImportingCountriesProps {
  countries: TopImportingCountry[]
}

const countryFlags: Record<string, string> = {
  "US": "🇺🇸",
  "CN": "🇨🇳",
  "DE": "🇩🇪",
  "JP": "🇯🇵",
  "GB": "🇬🇧",
  "FR": "🇫🇷",
  "IT": "🇮🇹",
  "CA": "🇨🇦",
  "AU": "🇦🇺",
  "BR": "🇧🇷",
  "IN": "🇮🇳",
  "KR": "🇰🇷",
  "MX": "🇲🇽",
  "SG": "🇸🇬",
  "ZA": "🇿🇦",
  "TR": "🇹🇷",
  "SA": "🇸🇦",
  "IL": "🇮🇱",
  "ID": "🇮🇩"
}

export function TopImportingCountries({ countries }: TopImportingCountriesProps) {
  const maxImports = Math.max(...countries.map(c => c.totalImports))
  const maxRate = Math.max(...countries.map(c => c.averageTariffRate))

  const getRateColor = (rate: number) => {
    if (rate <= 3) return "text-emerald-600 dark:text-emerald-400"
    if (rate <= 6) return "text-green-600 dark:text-green-400"
    if (rate <= 10) return "text-yellow-600 dark:text-yellow-400"
    if (rate <= 15) return "text-orange-600 dark:text-orange-400"
    return "text-red-600 dark:text-red-400"
  }

  const getRateBadgeVariant = (rate: number) => {
    if (rate <= 3) return "default"
    if (rate <= 6) return "secondary"
    if (rate <= 10) return "outline"
    return "destructive"
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "electronics":
      case "technology":
        return "💻"
      case "automotive":
        return "🚗"
      case "manufacturing":
        return "🏭"
      case "agriculture":
        return "🌾"
      case "mining":
      case "natural resources":
        return "⛏️"
      case "luxury goods":
        return "💎"
      case "fashion":
        return "👗"
      case "financial services":
        return "💰"
      default:
        return "📦"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Top Importing Countries
        </CardTitle>
        <CardDescription>
          Countries with highest import volumes and their tariff rates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {countries.map((country, index) => (
            <div
              key={country.countryCode}
              className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Badge variant={index < 3 ? "default" : "secondary"} className="text-xs">
                    #{index + 1}
                  </Badge>
                  <span className="text-2xl">
                    {countryFlags[country.countryCode] || "🌍"}
                  </span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{country.countryName}</h4>
                    <span className="text-lg">
                      {getCategoryIcon(country.primaryImportCategory)}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {country.primaryImportCategory}
                  </div>
                  
                  {/* Import Volume Progress */}
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>Import Volume</span>
                      <span>{country.totalImports.toLocaleString()}</span>
                    </div>
                    <Progress 
                      value={(country.totalImports / maxImports) * 100} 
                      className="h-2"
                    />
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={getRateBadgeVariant(country.averageTariffRate)}>
                    {country.averageTariffRate.toFixed(1)}%
                  </Badge>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Avg Tariff Rate
                </div>
                
                {/* Rate Progress */}
                <div className="mt-1">
                  <Progress 
                    value={(country.averageTariffRate / maxRate) * 100} 
                    className="h-1 w-16"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Statistics */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Total Imports:</span>
              <span className="font-medium">
                {countries.reduce((sum, c) => sum + c.totalImports, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Avg Rate:</span>
              <span className="font-medium">
                {(countries.reduce((sum, c) => sum + c.averageTariffRate, 0) / countries.length).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
