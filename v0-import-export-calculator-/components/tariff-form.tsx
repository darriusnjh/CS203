"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Ship, Plane, Truck, Calendar, DollarSign } from "lucide-react"
import { HTSCodeInput } from "@/components/hts-code-input"
import { useToast } from "@/lib/use-toast"

interface TariffInfo {
  hts8: string
  briefDescription: string
  mfnTextRate: string
  mfnAdValRate: number
  mfnSpecificRate: number
  mfnOtherRate: number
}

interface FormData {
  hts8: string
  itemValue: string
  itemQuantity: string
  originCountry: string
  arrivalCountry: string
  modeOfTransport: string
  entryDate: string
  loadingDate: string
}

interface TariffFormProps {
  formData: FormData
  onFormDataChange: (data: FormData) => void
  onCalculate: (data: FormData) => void
}

export function TariffForm({ formData, onFormDataChange, onCalculate }: TariffFormProps) {
  const [selectedTariff, setSelectedTariff] = useState<TariffInfo | null>(null)
  const { toast } = useToast()
  
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
  ]

  const transportModes = [
    { value: "sea", label: "Sea Freight", icon: Ship },
    { value: "air", label: "Air Freight", icon: Plane },
    { value: "land", label: "Land Transport", icon: Truck },
  ]

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  // Validate if a date is not in the past
  const validateDate = (dateString: string) => {
    if (!dateString) return true
    const selectedDate = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Reset time to start of day
    return selectedDate >= today
  }

  // Validate if a number is not negative
  const validateNumber = (value: string) => {
    if (!value) return true
    const numValue = parseFloat(value)
    return !isNaN(numValue) && numValue >= 0
  }

  const updateFormData = (field: keyof FormData, value: string) => {
    // Validate numerical inputs for negative values
    if ((field === 'itemValue' || field === 'itemQuantity') && value && !validateNumber(value)) {
      toast({
        title: "Invalid Input",
        description: "Please insert valid values for the respective parameters",
        variant: "destructive",
      })
      return
    }

    // Validate dates for past dates
    if ((field === 'entryDate' || field === 'loadingDate') && value && !validateDate(value)) {
      toast({
        title: "Invalid Date",
        description: "Please select a current or future date",
        variant: "destructive",
      })
      return
    }

    onFormDataChange({ ...formData, [field]: value })
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Tariff Calculator
        </CardTitle>
        <CardDescription>Enter your shipment details to calculate import costs</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <HTSCodeInput 
            value={formData.hts8} 
            onChange={(value) => updateFormData("hts8", value)}
            onTariffSelect={setSelectedTariff}
          />
          <div className="space-y-2">
            <Label htmlFor="itemValue">Shipment Value (USD)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="itemValue"
                type="number"
                placeholder="10000"
                className="pl-10"
                value={formData.itemValue}
                onChange={(e) => updateFormData("itemValue", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="itemQuantity">
              Shipment Quantity
              {selectedTariff?.mfnTextRate && (
                <span className="text-sm text-muted-foreground ml-2">
                  ({selectedTariff.mfnTextRate})
                </span>
              )}
            </Label>
            <Input
              id="itemQuantity"
              type="number"
              placeholder="1"
              value={formData.itemQuantity}
              onChange={(e) => updateFormData("itemQuantity", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Country of Origin</Label>
            <Select
              value={formData.originCountry}
              onValueChange={(value) => updateFormData("originCountry", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select origin country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Country of Arrival</Label>
            <Select
              value={formData.arrivalCountry}
              onValueChange={(value) => updateFormData("arrivalCountry", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="United States" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="United States">United States</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Mode of Transport</Label>
          <Select value={formData.modeOfTransport} onValueChange={(value) => updateFormData("modeOfTransport", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select transport mode" />
            </SelectTrigger>
            <SelectContent>
              {transportModes.map((mode) => {
                const Icon = mode.icon
                return (
                  <SelectItem key={mode.value} value={mode.value}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {mode.label}
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="entryDate">Entry Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="entryDate"
                type="date"
                className="pl-10"
                min={getTodayDate()}
                value={formData.entryDate}
                onChange={(e) => updateFormData("entryDate", e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="loadingDate">Date of Loading</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="loadingDate"
                type="date"
                className="pl-10"
                min={getTodayDate()}
                value={formData.loadingDate}
                onChange={(e) => updateFormData("loadingDate", e.target.value)}
              />
            </div>
          </div>
        </div>

        <Button
          onClick={() => onCalculate(formData)}
          className="w-full"
          size="lg"
          disabled={!formData.hts8 || !formData.itemValue || !formData.originCountry}
        >
          Calculate Tariff Costs
        </Button>
      </CardContent>
    </Card >
  )
}
