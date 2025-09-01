"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calculator, DollarSign, Ship, Plane, Truck } from "lucide-react"

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

interface TariffResultProps {
  calculation: TariffCalculation | null
  formData: FormData
}

export function TariffResult({ calculation, formData }: TariffResultProps) {
  const transportModes = [
    { value: "sea", label: "Sea Freight", icon: Ship },
    { value: "air", label: "Air Freight", icon: Plane },
    { value: "land", label: "Land Transport", icon: Truck },
  ]

  const getTransportLabel = (value: string) => {
    return transportModes.find((m) => m.value === value)?.label || value
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          Cost Breakdown
        </CardTitle>
        <CardDescription>Detailed tariff calculation results</CardDescription>
      </CardHeader>
      <CardContent>
        {calculation ? (
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Base Tariff</span>
                <span className="font-mono text-lg">${calculation.baseTariff.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Additional Fees</span>
                <span className="font-mono text-lg">${calculation.additionalFees.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border-2 border-primary/20">
                <span className="font-semibold">Total Cost</span>
                <span className="font-mono text-2xl font-bold text-primary">${calculation.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">Calculation Details</Badge>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• HTS Code: {formData.htsCode}</p>
                <p>• Origin: {formData.countryOfOrigin}</p>
                <p>• Destination: {formData.countryOfArrival || "United States"}</p>
                <p>• Shipment Value: ${Number.parseFloat(formData.shipmentValue).toLocaleString()}</p>
                <p>• Transport: {getTransportLabel(formData.modeOfTransport)}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Enter shipment details and click calculate to see results</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
