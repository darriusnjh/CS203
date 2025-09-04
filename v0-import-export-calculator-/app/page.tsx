"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { Calculator, Globe, TrendingUp } from "lucide-react"
import { WorldMap } from "@/components/world-map"
import { CountryComparison } from "@/components/country-comparison"
import { TariffForm } from "@/components/tariff-form"
import { TariffResult } from "@/components/tariff-result"
// import fetch from "node-fetch"
import { error } from "console"

interface TariffCalculation {
  baseTariff: number
  additionalFees: number
  total: number
}

interface FormData {
  htsCode: string
  shipmentValue: string
  countryOfOrigin: string
  countryOfArrival: string
  modeOfTransport: string
  entryDate: string
  loadingDate: string
}

export default function TariffCalculator() {
  const [formData, setFormData] = useState<FormData>({
    htsCode: "",
    shipmentValue: "",
    countryOfOrigin: "",
    countryOfArrival: "US",
    modeOfTransport: "",
    entryDate: "",
    loadingDate: "",
  })

  const [calculation, setCalculation] = useState<TariffCalculation | null>(null)

  const calculateTariff = () => {

    fetch("http://localhost:8080/api/tariff/calculate",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }).then(response => {
      if (!response.ok) {
        console.log('HTTP Error! Status:${response.status}')
      }
      return response.json()
    }).then(data => {
      console.log(data)
    }).catch(error => {
      console.log('Fetch error: ', error)
    })

    // Mock calculation - in real app, this would call an API
    const baseRate = Math.random() * 0.15 + 0.05 // 5-20% tariff rate
    const shipmentVal = Number.parseFloat(formData.shipmentValue) || 0
    const baseTariff = shipmentVal * baseRate
    const additionalFees = shipmentVal * 0.02 // 2% additional fees

    setCalculation({
      baseTariff,
      additionalFees,
      total: baseTariff + additionalFees,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">TariffCalc Pro</h1>
              <p className="text-sm text-muted-foreground">Import Export Cost Calculator</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2 text-balance">
            Calculate Import Tariffs with Precision
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Professional tariff calculation tool for businesses. Get accurate cost estimates, compare countries, and
            visualize global trade costs.
          </p>
        </div>

        <Tabs defaultValue="calculator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Calculator
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Compare
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Map
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator">
            <div className="grid lg:grid-cols-2 gap-8">
              <TariffForm formData={formData} onFormDataChange={setFormData} onCalculate={calculateTariff} />

              <TariffResult calculation={calculation} formData={formData} />
            </div>
          </TabsContent>

          <TabsContent value="comparison">
            <CountryComparison
              htsCode={formData.htsCode}
              shipmentValue={Number.parseFloat(formData.shipmentValue) || 10000}
            />
          </TabsContent>

          <TabsContent value="map">
            <WorldMap
              selectedHtsCode={formData.htsCode}
              shipmentValue={Number.parseFloat(formData.shipmentValue) || 10000}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
