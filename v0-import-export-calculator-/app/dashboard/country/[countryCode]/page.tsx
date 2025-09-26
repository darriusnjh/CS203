"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, TrendingUp, Globe, BarChart3 } from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"

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

interface ProductData {
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
  const [countryData, setCountryData] = useState<CountryData | null>(null)
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([])
  const [importData, setImportData] = useState<ImportCountry[]>([])
  const [productData, setProductData] = useState<ProductData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCountryData = async (code: string) => {
    try {
      setLoading(true)
      setError(null)
      
      console.log(`Fetching country data for: ${code}`)
      
      // Fetch dashboard data
      const dashboardResponse = await fetch(`http://localhost:8080/api/dashboard/data/${code}`)
      console.log(`Dashboard response status: ${dashboardResponse.status}`)
      
      if (!dashboardResponse.ok) {
        throw new Error(`Failed to fetch dashboard data: ${dashboardResponse.status}`)
      }
      
      const dashboardResult = await dashboardResponse.json()
      console.log("Dashboard data received:", dashboardResult)
      
      if (dashboardResult.countryData && dashboardResult.countryData.length > 0) {
        setCountryData(dashboardResult.countryData[0])
        setHeatmapData(dashboardResult.heatmapData || [])
        setImportData(dashboardResult.topImportingCountries || [])
      } else {
        throw new Error("No country data found")
      }
      
      // Fetch product data
      const productResponse = await fetch(`http://localhost:8080/api/dashboard/products/${code}`)
      console.log(`Product response status: ${productResponse.status}`)
      
      if (productResponse.ok) {
        const productResult = await productResponse.json()
        console.log("Product data received:", productResult.length, "products")
        setProductData(productResult)
      }
      
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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavigationHeader />
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading country data...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !countryData) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavigationHeader />
        <div className="container mx-auto p-6">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error || "No data available"}</p>
            <Button onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const countryName = countryOptions.find(c => c.code === countryCode)?.name || countryCode

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />
      
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
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
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
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tariff Rate Distribution</CardTitle>
                  <CardDescription>Breakdown of tariff rates for {countryName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Average MFN Rate:</span>
                      <span className="font-medium">{countryData.averageMfnRate.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Ad Valorem Rate:</span>
                      <span className="font-medium">{countryData.averageAdValRate.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Specific Rate:</span>
                      <span className="font-medium">{countryData.averageSpecificRate.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rate Range:</span>
                      <span className="font-medium">{countryData.minRate.toFixed(3)}% - {countryData.maxRate.toFixed(1)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Importing Countries</CardTitle>
                  <CardDescription>Countries importing to {countryName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {importData.slice(0, 5).map((country, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                          </div>
                          <div>
                            <div className="font-medium">{country.countryName}</div>
                            <div className="text-sm text-gray-500">{country.primaryImportCategory}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{country.averageTariffRate.toFixed(1)}%</div>
                          <div className="text-sm text-gray-500">{country.totalImports.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
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
                <CardTitle>Import Rate Heatmap</CardTitle>
                <CardDescription>
                  Tariff rates from other countries to {countryName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {heatmapData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">{item.originCountry}</span>
                        </div>
                        <div>
                          <div className="font-medium">{item.originCountry} → {item.destinationCountry}</div>
                          <div className="text-sm text-gray-500">{item.productCount.toLocaleString()} products</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{item.averageRate.toFixed(1)}%</div>
                        <Badge variant={item.rateCategory === "High" ? "destructive" : item.rateCategory === "Medium" ? "default" : "secondary"}>
                          {item.rateCategory}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="imports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Import Analysis</CardTitle>
                <CardDescription>Detailed import data and trends for {countryName}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {importData.map((country, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold">{country.countryName}</h4>
                            <p className="text-sm text-gray-600">{country.primaryImportCategory}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{country.averageTariffRate.toFixed(1)}%</div>
                          <div className="text-sm text-gray-500">Avg Rate</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Import Volume:</span>
                          <span className="ml-2 font-medium">{country.totalImports.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Category:</span>
                          <span className="ml-2 font-medium">{country.primaryImportCategory}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}