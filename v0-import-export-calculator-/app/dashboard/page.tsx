"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { 
  BarChart3, 
  Globe, 
  TrendingUp, 
  Search, 
  Filter,
  Download,
  RefreshCw,
  Info,
  MapPin,
  DollarSign,
  Package,
  Users
} from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"
import { TariffHeatmap } from "@/components/tariff-heatmap"
import { CountryComparisonChart } from "@/components/country-comparison-chart"
import { TopImportingCountries } from "@/components/top-importing-countries"
import { TariffStatistics } from "@/components/tariff-statistics"

interface DashboardData {
  countryData: CountryTariffData[]
  averageRates: Record<string, number>
  productCounts: Record<string, number>
  heatmapData: TariffHeatmapData[]
  topImportingCountries: TopImportingCountry[]
}

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

interface TariffHeatmapData {
  originCountry: string
  destinationCountry: string
  averageRate: number
  productCount: number
  rateCategory: string
}

interface TopImportingCountry {
  countryCode: string
  countryName: string
  totalImports: number
  averageTariffRate: number
  primaryImportCategory: string
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCountry, setSelectedCountry] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [rateFilter, setRateFilter] = useState<string>("all")
  const [error, setError] = useState<string | null>(null)

  const fetchDashboardData = async (countryCode?: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const url = countryCode && countryCode !== "all" 
        ? `http://localhost:8080/api/dashboard/data/${countryCode}`
        : "http://localhost:8080/api/dashboard/data"
      
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setDashboardData(data)
    } catch (err) {
      console.error("Error fetching dashboard data:", err)
      setError("Failed to load dashboard data. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData(selectedCountry)
  }, [selectedCountry])

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode)
  }

  const handleRefresh = () => {
    fetchDashboardData(selectedCountry)
  }

  const filteredCountryData = dashboardData?.countryData?.filter(country => {
    const matchesSearch = country.countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         country.countryCode.toLowerCase().includes(searchTerm.toLowerCase())
    
    let matchesRate = true
    if (rateFilter !== "all") {
      switch (rateFilter) {
        case "low":
          matchesRate = country.averageMfnRate <= 5
          break
        case "medium":
          matchesRate = country.averageMfnRate > 5 && country.averageMfnRate <= 10
          break
        case "high":
          matchesRate = country.averageMfnRate > 10
          break
      }
    }
    
    return matchesSearch && matchesRate
  }) || []

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-6 w-6 animate-spin" />
              <span>Loading dashboard data...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        <div className="container mx-auto px-4 py-8">
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-destructive">
                <Info className="h-5 w-5" />
                <span>{error}</span>
              </div>
              <Button onClick={handleRefresh} className="mt-4">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tariff Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive analysis of global tariff rates and trade patterns
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleRefresh} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search countries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={selectedCountry} onValueChange={handleCountryChange}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="CN">China</SelectItem>
                  <SelectItem value="SG">Singapore</SelectItem>
                  <SelectItem value="GB">United Kingdom</SelectItem>
                  <SelectItem value="JP">Japan</SelectItem>
                  <SelectItem value="KR">South Korea</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>
                  <SelectItem value="AU">Australia</SelectItem>
                  <SelectItem value="FR">France</SelectItem>
                  <SelectItem value="IN">India</SelectItem>
                  <SelectItem value="ID">Indonesia</SelectItem>
                  <SelectItem value="IL">Israel</SelectItem>
                  <SelectItem value="IT">Italy</SelectItem>
                  <SelectItem value="MX">Mexico</SelectItem>
                  <SelectItem value="SA">Saudi Arabia</SelectItem>
                  <SelectItem value="ZA">South Africa</SelectItem>
                  <SelectItem value="TR">Turkey</SelectItem>
                  <SelectItem value="BR">Brazil</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={rateFilter} onValueChange={setRateFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Filter by rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rates</SelectItem>
                  <SelectItem value="low">Low (≤5%)</SelectItem>
                  <SelectItem value="medium">Medium (5-10%)</SelectItem>
                  <SelectItem value="high">High (>10%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        {dashboardData && (
          <TariffStatistics 
            countryData={filteredCountryData}
            totalCountries={dashboardData.countryData.length}
          />
        )}

        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="heatmap" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Heatmap
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Comparison
            </TabsTrigger>
            <TabsTrigger value="imports" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Top Importers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Country List */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Countries Overview
                  </CardTitle>
                  <CardDescription>
                    {filteredCountryData.length} countries found
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {filteredCountryData.map((country) => (
                      <div
                        key={country.countryCode}
                        className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                            {country.countryCode}
                          </div>
                          <div>
                            <div className="font-medium">{country.countryName}</div>
                            <div className="text-sm text-muted-foreground">
                              {country.totalProducts.toLocaleString()} products
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={country.averageMfnRate <= 5 ? "default" : 
                                   country.averageMfnRate <= 10 ? "secondary" : "destructive"}
                          >
                            {country.averageMfnRate.toFixed(1)}%
                          </Badge>
                          <div className="text-xs text-muted-foreground mt-1">
                            Range: {country.minRate.toFixed(1)}% - {country.maxRate.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Importing Countries */}
              {dashboardData?.topImportingCountries && (
                <TopImportingCountries 
                  countries={dashboardData.topImportingCountries}
                />
              )}
            </div>
          </TabsContent>

          <TabsContent value="heatmap" className="space-y-6">
            {dashboardData?.heatmapData && (
              <TariffHeatmap 
                data={dashboardData.heatmapData}
                selectedCountry={selectedCountry}
              />
            )}
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            {dashboardData?.countryData && (
              <CountryComparisonChart 
                data={filteredCountryData}
              />
            )}
          </TabsContent>

          <TabsContent value="imports" className="space-y-6">
            {dashboardData?.topImportingCountries && (
              <div className="grid lg:grid-cols-2 gap-6">
                <TopImportingCountries 
                  countries={dashboardData.topImportingCountries}
                />
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Import Categories
                    </CardTitle>
                    <CardDescription>
                      Primary import categories by country
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {dashboardData.topImportingCountries.map((country, index) => (
                        <div key={country.countryCode} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline">#{index + 1}</Badge>
                            <div>
                              <div className="font-medium">{country.countryName}</div>
                              <div className="text-sm text-muted-foreground">
                                {country.primaryImportCategory}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">
                              {country.totalImports.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {country.averageTariffRate.toFixed(1)}% avg
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
