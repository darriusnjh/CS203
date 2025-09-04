"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calculator, DollarSign, Ship, Plane, Truck } from "lucide-react"

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

  const countries = [
    { name: "China", code: "CN" },
    { name: "Mexico", code: "MX" },
    { name: "Canada", code: "CA" },
    { name: "Germany", code: "DE" },
    { name: "Japan", code: "JP" },
    { name: "United Kingdom", code: "GB" },
    { name: "South Korea", code: "KR" },
    { name: "India", code: "IN" },
    { name: "France", code: "FR" },
    { name: "Italy", code: "IT" },
    { name: "Vietnam", code: "VN" },
    { name: "Taiwan", code: "TW" },
    { name: "United States", code: "US" },
  ]

  const getTransportLabel = (value: string) => {
    return transportModes.find((m) => m.value === value)?.label || value
  }

  const getCountryName = (code: string) => {
    return countries.find((c) => c.code === code)?.name || code
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
            {/* Main Cost Summary */}
            <div className="grid gap-4">
              <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Tariff Amount</span>
                <span className="font-mono text-lg">${calculation.tariffAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Item Value</span>
                <span className="font-mono text-lg">${calculation.itemValue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border-2 border-primary/20">
                <span className="font-semibold">Total Cost</span>
                <span className="font-mono text-2xl font-bold text-primary">${calculation.totalCost.toFixed(2)}</span>
              </div>
            </div>

            {/* Tariff Details */}
            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">Tariff Details</Badge>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">HTS Code:</span>
                  <span className="font-mono">{calculation.hts8}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tariff Found:</span>
                  <Badge variant={calculation.tariffFound ? "default" : "destructive"}>
                    {calculation.tariffFound ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Item Quantity:</span>
                  <span>{calculation.itemQuantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Origin Country:</span>
                  <span>{calculation.originCountry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Tariff %:</span>
                  <span>{calculation.totalTariffPercentage.toFixed(2)}%</span>
                </div>
              </div>
            </div>

            {/* Rate Information */}
            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline">Rate Information</Badge>
              </div>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">MFN Ad Valorem Rate:</span>
                  <span className="font-mono">{calculation.mfnAdValRate.toFixed(4)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">MFN Specific Rate:</span>
                  <span className="font-mono">{calculation.mfnSpecificRate.toFixed(4)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">MFN Other Rate:</span>
                  <span className="font-mono">{calculation.mfnOtherRate.toFixed(4)}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            {calculation.briefDescription && (
              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline">Description</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{calculation.briefDescription}</p>
              </div>
            )}

            {/* Duty Types */}
            {calculation.dutyTypes && calculation.dutyTypes.length > 0 && (
              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline">Duty Types</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {calculation.dutyTypes.map((dutyType, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {dutyType}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Form Data Summary */}
            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">Calculation Details</Badge>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• HTS Code: {formData.htsCode}</p>
                <p>• Origin: {getCountryName(formData.countryOfOrigin)}</p>
                <p>• Destination: {getCountryName(formData.countryOfArrival) || "United States"}</p>
                <p>• Shipment Value: ${Number.parseFloat(formData.shipmentValue).toLocaleString()}</p>
                <p>• Shipment Quantity: {formData.shipmentQuantity}</p>
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
