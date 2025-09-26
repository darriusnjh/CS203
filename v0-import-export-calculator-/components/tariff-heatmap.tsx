"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Globe, 
  Info, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react"

interface TariffHeatmapData {
  originCountry: string
  destinationCountry: string
  averageRate: number
  productCount: number
  rateCategory: string
}

interface TariffHeatmapProps {
  data: TariffHeatmapData[]
  selectedCountry?: string
}

const countryNames: Record<string, string> = {
  "US": "United States",
  "CN": "China",
  "SG": "Singapore", 
  "GB": "United Kingdom",
  "JP": "Japan",
  "KR": "South Korea",
  "CA": "Canada",
  "AU": "Australia",
  "FR": "France",
  "IN": "India",
  "ID": "Indonesia",
  "IL": "Israel",
  "IT": "Italy",
  "MX": "Mexico",
  "SA": "Saudi Arabia",
  "ZA": "South Africa",
  "TR": "Turkey",
  "BR": "Brazil"
}

const countryCoordinates: Record<string, [number, number]> = {
  "US": [100, 120],
  "CA": [80, 100],
  "MX": [90, 160],
  "BR": [150, 200],
  "GB": [300, 80],
  "FR": [320, 100],
  "IT": [340, 120],
  "DE": [330, 90],
  "CN": [500, 100],
  "JP": [550, 120],
  "KR": [520, 110],
  "IN": [450, 150],
  "SG": [510, 180],
  "ID": [520, 200],
  "AU": [550, 250],
  "SA": [380, 160],
  "ZA": [360, 220],
  "TR": [360, 120],
  "IL": [370, 140]
}

export function TariffHeatmap({ data, selectedCountry }: TariffHeatmapProps) {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [selectedOrigin, setSelectedOrigin] = useState<string>("all")
  const [selectedDestination, setSelectedDestination] = useState<string>("all")
  const [hoveredCell, setHoveredCell] = useState<TariffHeatmapData | null>(null)

  // Get unique countries from data
  const countries = useMemo(() => {
    const countrySet = new Set<string>()
    data.forEach(item => {
      countrySet.add(item.originCountry)
      countrySet.add(item.destinationCountry)
    })
    return Array.from(countrySet).sort()
  }, [data])

  // Filter data based on selections
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const originMatch = selectedOrigin === "all" || item.originCountry === selectedOrigin
      const destinationMatch = selectedDestination === "all" || item.destinationCountry === selectedDestination
      return originMatch && destinationMatch
    })
  }, [data, selectedOrigin, selectedDestination])

  // Create matrix data for heatmap
  const matrixData = useMemo(() => {
    const matrix: Record<string, Record<string, TariffHeatmapData>> = {}
    
    filteredData.forEach(item => {
      if (!matrix[item.originCountry]) {
        matrix[item.originCountry] = {}
      }
      matrix[item.originCountry][item.destinationCountry] = item
    })
    
    return matrix
  }, [filteredData])

  const getRateColor = (rate: number) => {
    if (rate <= 2) return "bg-emerald-500"
    if (rate <= 5) return "bg-green-500"
    if (rate <= 10) return "bg-yellow-500"
    if (rate <= 15) return "bg-orange-500"
    return "bg-red-500"
  }

  const getRateIntensity = (rate: number) => {
    if (rate <= 2) return "opacity-60"
    if (rate <= 5) return "opacity-70"
    if (rate <= 10) return "opacity-80"
    if (rate <= 15) return "opacity-90"
    return "opacity-100"
  }

  const getRateCategoryColor = (category: string) => {
    switch (category) {
      case "Very Low": return "text-emerald-600 dark:text-emerald-400"
      case "Low": return "text-green-600 dark:text-green-400"
      case "Medium": return "text-yellow-600 dark:text-yellow-400"
      case "High": return "text-orange-600 dark:text-orange-400"
      case "Very High": return "text-red-600 dark:text-red-400"
      default: return "text-muted-foreground"
    }
  }

  const getTrendIcon = (rate: number) => {
    if (rate <= 3) return <TrendingDown className="h-3 w-3 text-green-500" />
    if (rate <= 8) return <Minus className="h-3 w-3 text-yellow-500" />
    return <TrendingUp className="h-3 w-3 text-red-500" />
  }

  const resetFilters = () => {
    setSelectedOrigin("all")
    setSelectedDestination("all")
    setZoomLevel(1)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Tariff Rate Heatmap
              </CardTitle>
              <CardDescription>
                Interactive visualization of tariff rates between countries
                {selectedCountry && selectedCountry !== "all" && ` - ${countryNames[selectedCountry]}`}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={resetFilters}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Select value={selectedOrigin} onValueChange={setSelectedOrigin}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by origin country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Origin Countries</SelectItem>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>
                      {countryNames[country] || country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <Select value={selectedDestination} onValueChange={setSelectedDestination}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by destination country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Destination Countries</SelectItem>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>
                      {countryNames[country] || country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.2))}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground min-w-12 text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.2))}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Heatmap Matrix */}
          <div className="overflow-auto">
            <div 
              className="inline-block min-w-full"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
            >
              <div className="grid gap-1" style={{ 
                gridTemplateColumns: `auto repeat(${countries.length}, 1fr)` 
              }}>
                {/* Header row */}
                <div className="p-2 font-medium text-sm text-muted-foreground"></div>
                {countries.map(country => (
                  <div key={country} className="p-2 text-xs font-medium text-center border-b">
                    {country}
                  </div>
                ))}

                {/* Data rows */}
                {countries.map(originCountry => (
                  <div key={originCountry} className="contents">
                    <div className="p-2 text-xs font-medium border-r">
                      {originCountry}
                    </div>
                    {countries.map(destinationCountry => {
                      const cellData = matrixData[originCountry]?.[destinationCountry]
                      const isSameCountry = originCountry === destinationCountry
                      
                      return (
                        <div
                          key={`${originCountry}-${destinationCountry}`}
                          className={`
                            relative p-2 text-xs text-center border cursor-pointer transition-all duration-200
                            ${isSameCountry 
                              ? 'bg-muted/50 text-muted-foreground' 
                              : cellData 
                                ? `${getRateColor(cellData.averageRate)} ${getRateIntensity(cellData.averageRate)} text-white hover:scale-105` 
                                : 'bg-muted/20 text-muted-foreground'
                            }
                          `}
                          onMouseEnter={() => setHoveredCell(cellData || null)}
                          onMouseLeave={() => setHoveredCell(null)}
                        >
                          {isSameCountry ? (
                            <span className="text-muted-foreground">-</span>
                          ) : cellData ? (
                            <div className="flex flex-col items-center gap-1">
                              <span className="font-medium">
                                {cellData.averageRate.toFixed(1)}%
                              </span>
                              {getTrendIcon(cellData.averageRate)}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">N/A</span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hover Tooltip */}
          {hoveredCell && (
            <div className="mt-4 p-4 bg-card border rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">
                  {countryNames[hoveredCell.originCountry]} → {countryNames[hoveredCell.destinationCountry]}
                </h4>
                <Badge className={getRateCategoryColor(hoveredCell.rateCategory)}>
                  {hoveredCell.rateCategory}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Average Rate:</span>
                  <span className="ml-2 font-medium">{hoveredCell.averageRate.toFixed(2)}%</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Products:</span>
                  <span className="ml-2 font-medium">{hoveredCell.productCount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Info className="h-4 w-4 text-primary" />
              <span className="font-medium">Rate Legend</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-emerald-500 rounded opacity-60"></div>
                <span className="text-sm">Very Low (0-2%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded opacity-70"></div>
                <span className="text-sm">Low (2-5%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded opacity-80"></div>
                <span className="text-sm">Medium (5-10%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded opacity-90"></div>
                <span className="text-sm">High (10-15%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded opacity-100"></div>
                <span className="text-sm">Very High (15%+)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
