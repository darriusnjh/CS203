"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, Globe, TrendingUp } from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"
import { WorldMap } from "@/components/world-map"
import { CountryComparison } from "@/components/country-comparison"
import { TariffForm } from "@/components/tariff-form"
import { TariffResult } from "@/components/tariff-result"
import { Toaster } from "@/components/ui/toaster"
import { useMutation } from "@tanstack/react-query"
import { toast } from "@/components/ui/use-toast"
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
  });

  const [calculation, setCalculation] = useState<TariffCalculation | null>(null); // ✅ now correctly placed

  const { mutate: calculateTariff, isPending } = useMutation({
    mutationFn: async () => {
      const response = await fetch("http://localhost:8080/api/tariff/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));

      return await response.json();
    },
    onSuccess: (data: TariffCalculation) => {
      setCalculation(data);
    },
    onError: async() => {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setCalculation({
        hts8: "-",
        briefDescription: "Mock description",
        itemValue: 1234,
        mfnAdValRate: 0.1,
        mfnSpecificRate: 0,
        mfnOtherRate: 0,
        tariffAmount: 123,
        totalCost: 1357,
        tariffFound: true,
        itemQuantity: 10,
        originCountry: formData.countryOfOrigin,
        totalTariffPercentage: 0.11,
        dutyTypes: ["Ad Valorem"],
      });
    },
  });

  return (
    <div className="min-h-screen bg-background">
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
              <TariffForm formData={formData} onFormDataChange={setFormData} onCalculate={calculateTariff} />

              <div>
                {isPending && (
                 <div className="flex justify-center items-center mb-4">
                 <div className="h-6 w-6 animate-spin rounded-full border-2 border-t-transparent border-gray-500" />
                 <span className="ml-2 text-sm text-muted-foreground">Calculating tariffs...</span>
               </div>
             )}
                <TariffResult calculation={calculation} formData={formData} />
              </div>
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
