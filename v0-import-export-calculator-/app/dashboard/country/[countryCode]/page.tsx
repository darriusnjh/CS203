"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Globe, BarChart3, PieChart, Map } from "lucide-react"
import TariffHeatmap from "@/components/tariff-heatmap"
import CountryComparisonChart from "@/components/country-comparison-chart"
import TopImportingCountries from "@/components/top-importing-countries"
import TariffStatistics from "@/components/tariff-statistics"

interface CountryData {
  countryCode: string
  countryName: string
  averageMfnRate: number
  averageAdValRate: number
  averageSpecificRate: number
  totalProducts: number
  maxRate: number
  minRate: number
  freeTradeProducts: number
  highTariffProducts: number
  tradeAgreementCoverage: number
  topProductCategory: string
}

interface HeatmapData {
  originCountry: string
  destinationCountry: string
  averageRate: number
  productCount: number
  rateCategory: string
}

interface ImportCountry {
  countryCode: string
  countryName: string
  totalImports: number
  averageTariffRate: number
  primaryImportCategory: string
}

interface TradeAgreement {
  agreementName: string
  country1: string
  country2: string
  productsCovered: number
  averageRateReduction: number
  tradeVolumeImpact: number
}

interface ProductCategory {
  category: string
  country: string
  productCount: number
  averageRate: number
  rateRange: number
  topHtsCode: string
}

interface TrendInsight {
  country: string
  trend: string
  changePercentage: number
  description: string
  recommendation: string
}

interface DashboardData {
  countryData: CountryData[]
  heatmapData: HeatmapData[]
  topImportingCountries: ImportCountry[]
  tradeAgreementInsights: TradeAgreement[]
  productCategoryInsights: ProductCategory[]
  tariffTrendInsights: TrendInsight[]
}

interface ProductTariffData {
  hts8: string
  briefDescription: string
  mfnAdValRate: number | null
  mfnSpecificRate: number | null
  mfnOtherRate: number | null
  rateType: string
  productCategory: string
  countryCode: string
}

const countryOptions = [
  { code: "US", name: "United States" },
  { code: "CN", name: "China" },
  { code: "SG", name: "Singapore" },
  { code: "GB", name: "United Kingdom" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "FR", name: "France" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "IL", name: "Israel" },
  { code: "IT", name: "Italy" },
  { code: "MX", name: "Mexico" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "ZA", name: "South Africa" },
  { code: "TR", name: "Turkey" },
  { code: "BR", name: "Brazil" }
]

export default function CountryDashboard() {
  const params = useParams()
  const router = useRouter()
  const [countryCode, setCountryCode] = useState<string>(params.countryCode as string)
  const [data, setData] = useState<DashboardData | null>(null)
  const [productData, setProductData] = useState<ProductTariffData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCountryData = async (code: string) => {
    try {
      setLoading(true)
      setError(null)
      
      // Fetch both dashboard data and product data in parallel
      const [dashboardResponse, productResponse] = await Promise.all([
        fetch(`http://localhost:8080/api/dashboard/data/${code}`),
        fetch(`http://localhost:8080/api/dashboard/products/${code}`)
      ])
      
      if (!dashboardResponse.ok || !productResponse.ok) {
        throw new Error("Failed to fetch country data")
      }
      
      const [dashboardResult, productResult] = await Promise.all([
        dashboardResponse.json(),
        productResponse.json()
      ])
      
      setData(dashboardResult)
      setProductData(productResult)
    } catch (err) {
      setError("Failed to load country data. Please try again later.")
      console.error("Error fetching country data:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (countryCode) {
      fetchCountryData(countryCode)
    }
  }, [countryCode])

  const handleCountryChange = (newCountryCode: string) => {
    setCountryCode(newCountryCode)
    router.push(`/dashboard/country/${newCountryCode}`)
  }

  const getTrendIcon = (trend: string) => {
    switch (trend.toLowerCase()) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-green-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend.toLowerCase()) {
      case "increasing":
        return "text-red-600"
      case "decreasing":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading country data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "No data available"}</p>
          <Button onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  const countryData = data.countryData[0]
  const countryName = countryOptions.find(c => c.code === countryCode)?.name || countryCode

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{countryName} Dashboard</h1>
            <p className="text-gray-600">Country-specific tariff and trade analysis</p>
          </div>
        </div>
        <Select value={countryCode} onValueChange={handleCountryChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {countryOptions.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Tariff Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countryData.averageMfnRate.toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground">
              {countryData.totalProducts.toLocaleString()} products
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trade Agreement Coverage</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countryData.tradeAgreementCoverage.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {countryData.freeTradeProducts.toLocaleString()} free trade products
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Tariff Products</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countryData.highTariffProducts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((countryData.highTariffProducts / countryData.totalProducts) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Product Category</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countryData.topProductCategory}</div>
            <p className="text-xs text-muted-foreground">
              Rate range: {countryData.minRate.toFixed(3)}% - {countryData.maxRate.toFixed(1)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
          <TabsTrigger value="imports">Import Analysis</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tariff Statistics</CardTitle>
                <CardDescription>Detailed breakdown of tariff rates</CardDescription>
              </CardHeader>
              <CardContent>
                <TariffStatistics data={data.countryData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Importing Countries</CardTitle>
                <CardDescription>Countries importing to {countryName}</CardDescription>
              </CardHeader>
              <CardContent>
                <TopImportingCountries data={data.topImportingCountries} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Tariff Rates</CardTitle>
              <CardDescription>
                Detailed tariff rates for products imported to {countryName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  Showing {productData.length} products with tariff rates
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="grid gap-2">
                    {productData.slice(0, 100).map((product, index) => (
                      <div key={index} className="border rounded-lg p-3 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-mono text-sm font-medium">{product.hts8}</span>
                              <Badge variant="outline" className="text-xs">
                                {product.productCategory}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {product.briefDescription}
                            </p>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-sm font-medium">
                              {product.rateType === "Ad Valorem" && product.mfnAdValRate && (
                                <span className="text-blue-600">{product.mfnAdValRate.toFixed(2)}%</span>
                              )}
                              {product.rateType === "Specific" && product.mfnSpecificRate && (
                                <span className="text-green-600">${product.mfnSpecificRate.toFixed(3)}/unit</span>
                              )}
                              {product.rateType === "Other" && product.mfnOtherRate && (
                                <span className="text-purple-600">{product.mfnOtherRate.toFixed(2)}%</span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500">{product.rateType}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {productData.length > 100 && (
                  <div className="text-center text-sm text-gray-500">
                    Showing first 100 products. Total: {productData.length} products
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heatmap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tariff Heatmap</CardTitle>
              <CardDescription>
                Import rates from other countries to {countryName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TariffHeatmap data={data.heatmapData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="imports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Import Analysis</CardTitle>
              <CardDescription>Detailed import data and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <CountryComparisonChart data={data.topImportingCountries} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Trade Agreements */}
            <Card>
              <CardHeader>
                <CardTitle>Trade Agreements</CardTitle>
                <CardDescription>Active trade agreements and their impact</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.tradeAgreementInsights.map((agreement, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{agreement.agreementName}</h4>
                      <Badge variant="secondary">
                        {agreement.averageRateReduction.toFixed(0)}% reduction
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {agreement.country1} ↔ {agreement.country2}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Products Covered:</span>
                        <span className="ml-2 font-medium">{agreement.productsCovered.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Trade Impact:</span>
                        <span className="ml-2 font-medium">{agreement.tradeVolumeImpact.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Product Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Product Categories</CardTitle>
                <CardDescription>Tariff rates by product category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.productCategoryInsights.map((category, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{category.category}</h4>
                      <Badge variant="outline">{category.averageRate.toFixed(1)}% avg</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Products:</span>
                        <span className="ml-2 font-medium">{category.productCount.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Rate Range:</span>
                        <span className="ml-2 font-medium">{category.rateRange.toFixed(1)}%</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Top HTS: {category.topHtsCode}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Trend Insights */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Trend Analysis</CardTitle>
                <CardDescription>Current trends and recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.tariffTrendInsights.map((trend, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(trend.trend)}
                        <h4 className="font-semibold">{trend.trend} Trend</h4>
                      </div>
                      <Badge className={getTrendColor(trend.trend)}>
                        {trend.changePercentage > 0 ? "+" : ""}{trend.changePercentage.toFixed(1)}%
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{trend.description}</p>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">Recommendation:</p>
                      <p className="text-sm text-blue-700">{trend.recommendation}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
