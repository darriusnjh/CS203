"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Globe, Info, ZoomIn, ZoomOut, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface CountryData {
  name: string
  code: string
  tariffRate: number
  coordinates: [number, number]
  region: string
  population: number
  gdp: string
}

// Comprehensive world map data with realistic coordinates and tariff rates
const worldMapData: CountryData[] = [
  // North America
  {
    name: "United States",
    code: "US",
    tariffRate: 3.2,
    coordinates: [240, 180],
    region: "North America",
    population: 331900000,
    gdp: "$21.4T",
  },
  {
    name: "Canada",
    code: "CA",
    tariffRate: 2.8,
    coordinates: [220, 120],
    region: "North America",
    population: 38000000,
    gdp: "$1.7T",
  },
  {
    name: "Mexico",
    code: "MX",
    tariffRate: 4.1,
    coordinates: [200, 240],
    region: "North America",
    population: 128900000,
    gdp: "$1.3T",
  },

  // South America
  {
    name: "Brazil",
    code: "BR",
    tariffRate: 9.8,
    coordinates: [320, 350],
    region: "South America",
    population: 215300000,
    gdp: "$1.6T",
  },
  {
    name: "Argentina",
    code: "AR",
    tariffRate: 8.5,
    coordinates: [300, 420],
    region: "South America",
    population: 45400000,
    gdp: "$450B",
  },
  {
    name: "Chile",
    code: "CL",
    tariffRate: 6.2,
    coordinates: [280, 400],
    region: "South America",
    population: 19100000,
    gdp: "$320B",
  },
  {
    name: "Colombia",
    code: "CO",
    tariffRate: 7.3,
    coordinates: [290, 300],
    region: "South America",
    population: 50900000,
    gdp: "$314B",
  },

  // Europe
  {
    name: "United Kingdom",
    code: "GB",
    tariffRate: 5.2,
    coordinates: [480, 140],
    region: "Europe",
    population: 67900000,
    gdp: "$2.8T",
  },
  {
    name: "Germany",
    code: "DE",
    tariffRate: 6.1,
    coordinates: [520, 140],
    region: "Europe",
    population: 83200000,
    gdp: "$3.8T",
  },
  {
    name: "France",
    code: "FR",
    tariffRate: 5.8,
    coordinates: [500, 160],
    region: "Europe",
    population: 67400000,
    gdp: "$2.6T",
  },
  {
    name: "Italy",
    code: "IT",
    tariffRate: 6.4,
    coordinates: [530, 180],
    region: "Europe",
    population: 60400000,
    gdp: "$2.1T",
  },
  {
    name: "Spain",
    code: "ES",
    tariffRate: 5.9,
    coordinates: [480, 190],
    region: "Europe",
    population: 47400000,
    gdp: "$1.4T",
  },
  {
    name: "Netherlands",
    code: "NL",
    tariffRate: 5.1,
    coordinates: [510, 130],
    region: "Europe",
    population: 17400000,
    gdp: "$910B",
  },
  {
    name: "Russia",
    code: "RU",
    tariffRate: 11.2,
    coordinates: [600, 120],
    region: "Europe/Asia",
    population: 146200000,
    gdp: "$1.5T",
  },

  // Asia
  {
    name: "China",
    code: "CN",
    tariffRate: 8.7,
    coordinates: [720, 200],
    region: "Asia",
    population: 1439300000,
    gdp: "$14.3T",
  },
  {
    name: "Japan",
    code: "JP",
    tariffRate: 4.3,
    coordinates: [800, 200],
    region: "Asia",
    population: 125800000,
    gdp: "$4.9T",
  },
  {
    name: "South Korea",
    code: "KR",
    tariffRate: 6.2,
    coordinates: [790, 210],
    region: "Asia",
    population: 51800000,
    gdp: "$1.8T",
  },
  {
    name: "India",
    code: "IN",
    tariffRate: 12.3,
    coordinates: [680, 250],
    region: "Asia",
    population: 1380000000,
    gdp: "$3.1T",
  },
  {
    name: "Thailand",
    code: "TH",
    tariffRate: 9.1,
    coordinates: [720, 280],
    region: "Asia",
    population: 69800000,
    gdp: "$544B",
  },
  {
    name: "Vietnam",
    code: "VN",
    tariffRate: 8.9,
    coordinates: [740, 290],
    region: "Asia",
    population: 97300000,
    gdp: "$363B",
  },
  {
    name: "Singapore",
    code: "SG",
    tariffRate: 0.2,
    coordinates: [730, 310],
    region: "Asia",
    population: 5900000,
    gdp: "$340B",
  },
  {
    name: "Malaysia",
    code: "MY",
    tariffRate: 6.8,
    coordinates: [720, 300],
    region: "Asia",
    population: 32400000,
    gdp: "$365B",
  },
  {
    name: "Indonesia",
    code: "ID",
    tariffRate: 8.1,
    coordinates: [750, 320],
    region: "Asia",
    population: 273500000,
    gdp: "$1.3T",
  },

  // Middle East & Africa
  {
    name: "Saudi Arabia",
    code: "SA",
    tariffRate: 5.9,
    coordinates: [580, 250],
    region: "Middle East",
    population: 34800000,
    gdp: "$700B",
  },
  {
    name: "UAE",
    code: "AE",
    tariffRate: 4.8,
    coordinates: [600, 260],
    region: "Middle East",
    population: 9900000,
    gdp: "$421B",
  },
  {
    name: "South Africa",
    code: "ZA",
    tariffRate: 7.6,
    coordinates: [560, 400],
    region: "Africa",
    population: 59300000,
    gdp: "$420B",
  },
  {
    name: "Nigeria",
    code: "NG",
    tariffRate: 12.1,
    coordinates: [520, 300],
    region: "Africa",
    population: 206100000,
    gdp: "$440B",
  },
  {
    name: "Egypt",
    code: "EG",
    tariffRate: 16.8,
    coordinates: [560, 220],
    region: "Africa",
    population: 102300000,
    gdp: "$404B",
  },

  // Oceania
  {
    name: "Australia",
    code: "AU",
    tariffRate: 3.9,
    coordinates: [800, 420],
    region: "Oceania",
    population: 25700000,
    gdp: "$1.4T",
  },
  {
    name: "New Zealand",
    code: "NZ",
    tariffRate: 2.1,
    coordinates: [850, 450],
    region: "Oceania",
    population: 5100000,
    gdp: "$249B",
  },
]

interface WorldMapProps {
  selectedHtsCode?: string
  shipmentValue?: number
}

export function WorldMap({ selectedHtsCode, shipmentValue = 10000 }: WorldMapProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCountries, setFilteredCountries] = useState(worldMapData)

  useEffect(() => {
    if (searchTerm) {
      setFilteredCountries(
        worldMapData.filter(
          (country) =>
            country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            country.region.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      )
    } else {
      setFilteredCountries(worldMapData)
    }
  }, [searchTerm])

  const getTariffColor = (rate: number) => {
    if (rate <= 3) return "bg-emerald-500"
    if (rate <= 6) return "bg-green-500"
    if (rate <= 9) return "bg-yellow-500"
    if (rate <= 12) return "bg-orange-500"
    return "bg-red-500"
  }

  const getTariffColorText = (rate: number) => {
    if (rate <= 3) return "text-emerald-600 dark:text-emerald-400"
    if (rate <= 6) return "text-green-600 dark:text-green-400"
    if (rate <= 9) return "text-yellow-600 dark:text-yellow-400"
    if (rate <= 12) return "text-orange-600 dark:text-orange-400"
    return "text-red-600 dark:text-red-400"
  }

  const calculateTotalCost = (tariffRate: number) => {
    const tariffAmount = (shipmentValue * tariffRate) / 100
    return {
      tariffAmount,
      totalCost: shipmentValue + tariffAmount,
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Global Tariff Heatmap
              </CardTitle>
              <CardDescription>
                Interactive world map showing tariff rates by country
                {selectedHtsCode && ` for HTS Code: ${selectedHtsCode}`}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Interactive World Map */}
          <div className="relative bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg border-2 border-border overflow-hidden">
            <div
              className="relative w-full h-[600px]"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center" }}
            >
              {/* World map SVG background */}
              <svg viewBox="0 0 900 500" className="absolute inset-0 w-full h-full">
                {/* Simplified world continents */}
                <g className="fill-muted-foreground/30 stroke-border stroke-1">
                  {/* North America */}
                  <path d="M150 80 L280 70 L300 120 L320 140 L280 200 L240 220 L200 240 L160 200 L140 160 L120 120 Z" />
                  {/* South America */}
                  <path d="M250 280 L320 270 L340 320 L350 380 L320 450 L280 460 L260 420 L240 380 L230 340 Z" />
                  {/* Europe */}
                  <path d="M450 80 L550 70 L580 100 L570 140 L540 160 L480 170 L440 150 L430 120 Z" />
                  {/* Africa */}
                  <path d="M480 200 L580 190 L600 240 L590 300 L570 360 L540 420 L500 430 L460 400 L450 350 L460 300 L470 250 Z" />
                  {/* Asia */}
                  <path d="M580 80 L750 70 L800 100 L820 140 L810 180 L790 220 L760 250 L720 280 L680 300 L640 280 L600 240 L580 200 L570 160 L580 120 Z" />
                  {/* Australia */}
                  <path d="M750 380 L850 370 L870 400 L860 430 L820 440 L780 430 L750 410 Z" />
                </g>
              </svg>

              {/* Country markers */}
              {filteredCountries.map((country) => (
                <button
                  key={country.code}
                  className={`absolute w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 shadow-lg transition-all duration-200 hover:scale-150 hover:z-10 ${getTariffColor(
                    country.tariffRate,
                  )} ${selectedCountry?.code === country.code ? "scale-150 ring-2 ring-primary z-10" : ""}`}
                  style={{
                    left: `${country.coordinates[0]}px`,
                    top: `${country.coordinates[1]}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onClick={() => setSelectedCountry(country)}
                  title={`${country.name}: ${country.tariffRate}%`}
                />
              ))}
            </div>

            {/* Zoom controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.2))}
                className="bg-background/80 backdrop-blur-sm"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.2))}
                className="bg-background/80 backdrop-blur-sm"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Selected Country Info */}
          {selectedCountry && (
            <div className="mt-4 p-6 bg-card border rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-xl">{selectedCountry.name}</h4>
                <Badge variant="outline" className={`${getTariffColorText(selectedCountry.tariffRate)} font-semibold`}>
                  {selectedCountry.tariffRate}% Tariff
                </Badge>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Region:</span>
                    <span className="font-medium">{selectedCountry.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Country Code:</span>
                    <span className="font-medium">{selectedCountry.code}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Population:</span>
                    <span className="font-medium">{selectedCountry.population.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GDP:</span>
                    <span className="font-medium">{selectedCountry.gdp}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipment Value:</span>
                    <span className="font-medium">${shipmentValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tariff Amount:</span>
                    <span className="font-medium text-orange-600 dark:text-orange-400">
                      ${calculateTotalCost(selectedCountry.tariffRate).tariffAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-muted-foreground font-medium">Total Cost:</span>
                    <span className="font-bold text-lg">
                      ${calculateTotalCost(selectedCountry.tariffRate).totalCost.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Info className="h-4 w-4 text-primary" />
              <span className="font-medium">Tariff Rate Legend</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                <span className="text-sm">Very Low (0-3%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-sm">Low (3-6%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Medium (6-9%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <span className="text-sm">High (9-12%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-sm">Very High (12%+)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
