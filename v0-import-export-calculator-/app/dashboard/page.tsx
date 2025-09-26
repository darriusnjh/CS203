"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  MapPin,
  ArrowUpRight,
  TrendingUp,
  Globe
} from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"

interface CountryData {
  countryCode: string
  countryName: string
  averageMfnRate: number
  totalProducts: number
  maxRate: number
  minRate: number
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

export default function Dashboard() {
  const router = useRouter()
  const [countryData, setCountryData] = useState<CountryData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log("Fetching dashboard data from: http://localhost:8080/api/dashboard/data")
      
      const response = await fetch("http://localhost:8080/api/dashboard/data")
      
      console.log("Response status:", response.status)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log("Dashboard data received:", data)
      
      if (data.countryData && Array.isArray(data.countryData)) {
        setCountryData(data.countryData)
      } else {
        throw new Error("Invalid data format: countryData is not an array")
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err)
      setError("Failed to load dashboard data. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const filteredCountries = countryData.filter(country => 
    country.countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.countryCode.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavigationHeader />
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading dashboard data...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavigationHeader />
        <div className="container mx-auto p-6">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchDashboardData}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />
      
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Tariff Dashboard</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select a country to view detailed tariff information, import costs, and trade comparisons
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Country Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredCountries.map((country) => (
            <Card 
              key={country.countryCode} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => router.push(`/dashboard/country/${country.countryCode}`)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-sm">{country.countryCode}</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-gray-400" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{country.countryName}</h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Avg Rate:</span>
                    <span className="font-medium">{country.averageMfnRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Products:</span>
                    <span className="font-medium">{country.totalProducts.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Range:</span>
                    <span className="font-medium">{country.minRate.toFixed(1)}% - {country.maxRate.toFixed(1)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        {filteredCountries.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Summary Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{filteredCountries.length}</div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {(filteredCountries.reduce((sum, c) => sum + c.averageMfnRate, 0) / filteredCountries.length).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">Average Tariff Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {filteredCountries.reduce((sum, c) => sum + c.totalProducts, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Products</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {filteredCountries.length === 0 && searchTerm && (
          <div className="text-center py-8">
            <p className="text-gray-500">No countries found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  )
}