"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, TrendingDown, Minus, BarChart3, PieChart as PieChartIcon } from "lucide-react"

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

interface CountryComparisonChartProps {
  data: CountryTariffData[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C']

export function CountryComparisonChart({ data }: CountryComparisonChartProps) {
  // Prepare data for charts
  const chartData = data
    .sort((a, b) => b.averageMfnRate - a.averageMfnRate)
    .slice(0, 10) // Top 10 countries
    .map(country => ({
      name: country.countryCode,
      fullName: country.countryName,
      rate: country.averageMfnRate,
      products: country.totalProducts,
      maxRate: country.maxRate,
      minRate: country.minRate,
      range: country.maxRate - country.minRate
    }))

  const pieData = data
    .sort((a, b) => b.totalProducts - a.totalProducts)
    .slice(0, 8) // Top 8 countries by product count
    .map((country, index) => ({
      name: country.countryCode,
      fullName: country.countryName,
      value: country.totalProducts,
      color: COLORS[index % COLORS.length]
    }))

  const getRateCategory = (rate: number) => {
    if (rate <= 3) return "Very Low"
    if (rate <= 6) return "Low"
    if (rate <= 10) return "Medium"
    if (rate <= 15) return "High"
    return "Very High"
  }

  const getRateColor = (rate: number) => {
    if (rate <= 3) return "text-emerald-600 dark:text-emerald-400"
    if (rate <= 6) return "text-green-600 dark:text-green-400"
    if (rate <= 10) return "text-yellow-600 dark:text-yellow-400"
    if (rate <= 15) return "text-orange-600 dark:text-orange-400"
    return "text-red-600 dark:text-red-400"
  }

  const getTrendIcon = (rate: number) => {
    if (rate <= 3) return <TrendingDown className="h-3 w-3 text-green-500" />
    if (rate <= 8) return <Minus className="h-3 w-3 text-yellow-500" />
    return <TrendingUp className="h-3 w-3 text-red-500" />
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{data.fullName}</p>
          <p className="text-sm text-muted-foreground">
            Average Rate: <span className="font-medium">{data.rate.toFixed(2)}%</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Products: <span className="font-medium">{data.products.toLocaleString()}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Range: <span className="font-medium">{data.minRate.toFixed(1)}% - {data.maxRate.toFixed(1)}%</span>
          </p>
        </div>
      )
    }
    return null
  }

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{data.fullName}</p>
          <p className="text-sm text-muted-foreground">
            Products: <span className="font-medium">{data.value.toLocaleString()}</span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Tariff Rates Comparison
          </CardTitle>
          <CardDescription>
            Average MFN tariff rates by country (Top 10)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  label={{ value: 'Tariff Rate (%)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="rate" 
                  fill="#8884d8"
                  radius={[4, 4, 0, 0]}
                  className="hover:opacity-80 transition-opacity"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-primary" />
              Product Distribution
            </CardTitle>
            <CardDescription>
              Number of products by country (Top 8)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Country Rankings */}
        <Card>
          <CardHeader>
            <CardTitle>Country Rankings</CardTitle>
            <CardDescription>
              Detailed breakdown by tariff rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {chartData.map((country, index) => (
                <div
                  key={country.name}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant={index < 3 ? "default" : "secondary"} className="text-xs">
                      #{index + 1}
                    </Badge>
                    <div>
                      <div className="font-medium">{country.fullName}</div>
                      <div className="text-sm text-muted-foreground">
                        {country.products.toLocaleString()} products
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${getRateColor(country.rate)}`}>
                        {country.rate.toFixed(1)}%
                      </span>
                      {getTrendIcon(country.rate)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Range: {country.minRate.toFixed(1)}% - {country.maxRate.toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Statistics Summary</CardTitle>
          <CardDescription>
            Key metrics across all countries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg border bg-card">
              <div className="text-2xl font-bold text-primary">
                {data.length}
              </div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
            <div className="text-center p-4 rounded-lg border bg-card">
              <div className="text-2xl font-bold text-green-600">
                {(data.reduce((sum, country) => sum + country.averageMfnRate, 0) / data.length).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Rate</div>
            </div>
            <div className="text-center p-4 rounded-lg border bg-card">
              <div className="text-2xl font-bold text-orange-600">
                {Math.max(...data.map(c => c.averageMfnRate)).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Highest Rate</div>
            </div>
            <div className="text-center p-4 rounded-lg border bg-card">
              <div className="text-2xl font-bold text-emerald-600">
                {Math.min(...data.map(c => c.averageMfnRate)).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Lowest Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
