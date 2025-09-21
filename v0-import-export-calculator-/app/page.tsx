"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, Globe, TrendingUp } from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"
import { WorldMap } from "@/components/world-map"
import { CountryComparison } from "@/components/country-comparison"
import { TariffForm } from "@/components/tariff-form"
import { TariffResult } from "@/components/tariff-result"
// import fetch from "node-fetch"
import { error } from "console"

interface TariffCalculation {
  hts8: string;
  briefDescription: string;
  itemValue: number;
  mfnAdValRate: number;
  mfnSpecificRate: number;
  mfnOtherRate: number;
  tariffAmount: number;
  totalCost: number;
  tariffFound: boolean;
  itemQuantity: number;
  originCountry: string;
  totalTariffPercentage: number;
  dutyTypes: string[];
}

interface FormData {
  htsCode: string
  shipmentValue: string
  shipmentQuantity: string
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
    shipmentQuantity: "",
    countryOfOrigin: "",
    countryOfArrival: "US",
    modeOfTransport: "",
    entryDate: "",
    loadingDate: "",
  })

  const [calculation, setCalculation] = useState<TariffCalculation | null>(null)
  const [loading, setLoading] = useState(false)


  const calculateTariff = async () => {
    setLoading(true) // start loading
    try {
      const response = await fetch("http://localhost:8080/api/tariff/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
  
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`)
      }
  
      const data = await response.json()
      console.log("API Response:", data)
  
      setCalculation({
        hts8: data.hts8 || "-",
        briefDescription: data.briefDescription || "",
        itemValue: data.itemValue || 0,
        mfnAdValRate: data.mfnAdValRate || 0,
        mfnSpecificRate: data.mfnSpecificRate || 0,
        mfnOtherRate: data.mfnOtherRate || 0,
        tariffAmount: data.tariffAmount || 0,
        totalCost: data.totalCost || 0,
        tariffFound: data.tariffFound || false,
        itemQuantity: data.itemQuantity || 0,
        originCountry: data.originCountry || "",
        totalTariffPercentage: data.totalTariffPercentage || 0,
        dutyTypes: data.dutyTypes || [],
      })
    } catch (error) {
      console.error("Fetch error:", error)
      setCalculation({
        hts8: "-",
        briefDescription: "",
        itemValue: 0,
        mfnAdValRate: 0,
        mfnSpecificRate: 0,
        mfnOtherRate: 0,
        tariffAmount: 0,
        totalCost: 0,
        tariffFound: false,
        itemQuantity: 0,
        originCountry: "",
        totalTariffPercentage: 0,
        dutyTypes: [],
      })
    } finally {
      setLoading(false) // stop loading, success or fail
    }
  }
  

  return (
    <div className="bg-background">
      <NavigationHeader />

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
              <TariffForm formData={formData} onFormDataChange={setFormData} onCalculate={calculateTariff} isLoading={loading}/>

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
