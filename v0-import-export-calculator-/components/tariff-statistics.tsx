"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Package, 
  Globe, 
  DollarSign,
  Target,
  Zap
} from "lucide-react"

interface CountryTariffData {
  countryCode: string
  countryName: string
  averageMfnRate: number
  averageAdValRate: number
  averageSpecificRate: number
  totalProducts: number
  maxRate: number
  minRate: number
}

interface TariffStatisticsProps {
  countryData: CountryTariffData[]
  totalCountries: number
}

export function TariffStatistics({ countryData, totalCountries }: TariffStatisticsProps) {
  if (countryData.length === 0) {
    return null
  }

  // Calculate statistics
  const totalProducts = countryData.reduce((sum, country) => sum + country.totalProducts, 0)
  const averageRate = countryData.reduce((sum, country) => sum + country.averageMfnRate, 0) / countryData.length
  const maxRate = Math.max(...countryData.map(c => c.averageMfnRate))
  const minRate = Math.min(...countryData.map(c => c.averageMfnRate))
  const rateRange = maxRate - minRate

  // Find countries with highest and lowest rates
  const highestRateCountry = countryData.find(c => c.averageMfnRate === maxRate)
  const lowestRateCountry = countryData.find(c => c.averageMfnRate === minRate)

  // Calculate rate distribution
  const veryLowCount = countryData.filter(c => c.averageMfnRate <= 3).length
  const lowCount = countryData.filter(c => c.averageMfnRate > 3 && c.averageMfnRate <= 6).length
  const mediumCount = countryData.filter(c => c.averageMfnRate > 6 && c.averageMfnRate <= 10).length
  const highCount = countryData.filter(c => c.averageMfnRate > 10 && c.averageMfnRate <= 15).length
  const veryHighCount = countryData.filter(c => c.averageMfnRate > 15).length

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Countries */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Countries</CardTitle>
          <Globe className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{countryData.length}</div>
          <p className="text-xs text-muted-foreground">
            {totalCountries} total in database
          </p>
        </CardContent>
      </Card>

      {/* Total Products */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProducts.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Across all countries
          </p>
        </CardContent>
      </Card>

      {/* Average Rate */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Rate</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${getRateColor(averageRate)}`}>
            {averageRate.toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground">
            MFN tariff rate
          </p>
        </CardContent>
      </Card>

      {/* Rate Range */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rate Range</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{rateRange.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            {minRate.toFixed(1)}% - {maxRate.toFixed(1)}%
          </p>
        </CardContent>
      </Card>

      {/* Highest Rate Country */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Highest Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Badge variant="destructive" className="text-xs">
              {maxRate.toFixed(1)}%
            </Badge>
            <span className="text-sm font-medium">
              {highestRateCountry?.countryName}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {highestRateCountry?.totalProducts.toLocaleString()} products
          </p>
        </CardContent>
      </Card>

      {/* Lowest Rate Country */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Lowest Rate</CardTitle>
          <TrendingDown className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-xs">
              {minRate.toFixed(1)}%
            </Badge>
            <span className="text-sm font-medium">
              {lowestRateCountry?.countryName}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {lowestRateCountry?.totalProducts.toLocaleString()} products
          </p>
        </CardContent>
      </Card>

      {/* Rate Distribution */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rate Distribution</CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-emerald-600">Very Low (≤3%)</span>
              <span className="font-medium">{veryLowCount}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-green-600">Low (3-6%)</span>
              <span className="font-medium">{lowCount}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-yellow-600">Medium (6-10%)</span>
              <span className="font-medium">{mediumCount}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-orange-600">High (10-15%)</span>
              <span className="font-medium">{highCount}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-red-600">Very High (&gt;15%)</span>
              <span className="font-medium">{veryHighCount}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Product Country */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Most Products</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {(() => {
            const topProductCountry = countryData.reduce((max, country) => 
              country.totalProducts > max.totalProducts ? country : max
            )
            return (
              <>
                <div className="text-sm font-medium">{topProductCountry.countryName}</div>
                <div className="text-xs text-muted-foreground">
                  {topProductCountry.totalProducts.toLocaleString()} products
                </div>
                <Badge variant="outline" className="text-xs mt-1">
                  {topProductCountry.averageMfnRate.toFixed(1)}% avg rate
                </Badge>
              </>
            )
          })()}
        </CardContent>
      </Card>
    </div>
  )
}

export default TariffStatistics
