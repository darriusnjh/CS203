"use client"

import { useState, useEffect, useCallback } from "react"
import { Label } from "@/components/ui/label"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface HTSCodeInputProps {
  value: string
  onChange: (value: string) => void
  onTariffSelect?: (tariffInfo: TariffInfo | null) => void
}

interface TariffInfo {
  hts8: string
  briefDescription: string
  mfnTextRate: string
  mfnAdValRate: number
  mfnSpecificRate: number
  mfnOtherRate: number
}

// Fallback mock data
const mockTariffInfoSuggestions: TariffInfo[] = [
  { 
    hts8: "8471.30.01", 
    briefDescription: "Portable automatic data processing machines, weighing not more than 10 kg",
    mfnTextRate: "",
    mfnAdValRate: 0.0,
    mfnSpecificRate: 0.0,
    mfnOtherRate: 0.0
  },
  { 
    hts8: "8471.41.01", 
    briefDescription: "Data processing machines, digital, comprising CPU, input/output unit",
    mfnTextRate: "",
    mfnAdValRate: 0.0,
    mfnSpecificRate: 0.0,
    mfnOtherRate: 0.0
  },
  { 
    hts8: "8471.49.00", 
    briefDescription: "Other automatic data processing machines",
    mfnTextRate: "",
    mfnAdValRate: 0.0,
    mfnSpecificRate: 0.0,
    mfnOtherRate: 0.0
  },
  { 
    hts8: "8517.12.00", 
    briefDescription: "Telephones for cellular networks or for other wireless networks",
    mfnTextRate: "",
    mfnAdValRate: 0.0,
    mfnSpecificRate: 0.0,
    mfnOtherRate: 0.0
  },
  { 
    hts8: "8528.72.04", 
    briefDescription: "Reception apparatus for television, color, with LCD screen",
    mfnTextRate: "",
    mfnAdValRate: 0.0,
    mfnSpecificRate: 0.0,
    mfnOtherRate: 0.0
  }
]

export function HTSCodeInput({ value, onChange, onTariffSelect }: HTSCodeInputProps) {
  const [open, setOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<TariffInfo[]>(mockTariffInfoSuggestions)
  const [loading, setLoading] = useState(false)
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null)

  const fetchHTSCodes = useCallback(async (searchTerm: string) => {
    if (!searchTerm || searchTerm.length < 2) {
      setSuggestions(mockTariffInfoSuggestions)
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`http://localhost:8080/api/tariff/search?q=${encodeURIComponent(searchTerm)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data: TariffInfo[] = await response.json()
        setSuggestions(data)
      } else {
        // Fallback to mock data if API fails
        const filtered = mockTariffInfoSuggestions.filter(
          (item) =>
            item.hts8.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.briefDescription.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        setSuggestions(filtered)
      }
    } catch (error) {
      console.error("Error fetching HTS codes:", error)
      // Fallback to filtered mock data
      const filtered = mockTariffInfoSuggestions.filter(
        (item) =>
          item.hts8.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.briefDescription.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setSuggestions(filtered)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleSearch = useCallback((searchValue: string) => {
    onChange(searchValue)
    
    // Clear existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }

    // Set new timeout for debounced search
    const timeout = setTimeout(() => {
      fetchHTSCodes(searchValue)
    }, 300) // 300ms delay

    setSearchTimeout(timeout)
  }, [onChange, fetchHTSCodes, searchTimeout])

  useEffect(() => {
    // Cleanup timeout on unmount
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout)
      }
    }
  }, [searchTimeout])

  useEffect(() => {
    // Initial load
    if (!value) {
      setSuggestions(mockTariffInfoSuggestions)
    }
  }, [value])

  return (
    <div className="space-y-2">
      <Label htmlFor="htsCode">HTS Code</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-normal bg-transparent"
          >
            {value || "Search HTS codes..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput 
              placeholder="Search HTS codes..." 
              value={value} 
              onValueChange={handleSearch} 
            />
            <CommandList>
              {loading ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="ml-2 text-sm text-muted-foreground">Searching...</span>
                </div>
              ) : (
                <>
                  <CommandEmpty>No HTS codes found.</CommandEmpty>
                  <CommandGroup>
                    {suggestions.slice(0, 10).map((item) => (
                      <CommandItem
                        key={item.hts8}
                        value={item.hts8}
                        onSelect={(currentValue) => {
                          onChange(currentValue)
                          onTariffSelect?.(item)
                          setOpen(false)
                        }}
                      >
                        <Check className={cn("mr-2 h-4 w-4", value === item.hts8 ? "opacity-100" : "opacity-0")} />
                        <div className="flex flex-col">
                          <span className="font-mono font-medium">{item.hts8}</span>
                          <span className="text-sm text-muted-foreground truncate">{item.briefDescription}</span>
                          <div className="flex gap-2 mt-1">
                            <span className="text-xs text-blue-600">Ad Val: {item.mfnAdValRate}%</span>
                            <span className="text-xs text-green-600">Specific: {item.mfnSpecificRate}</span>
                            <span className="text-xs text-purple-600">Other: {item.mfnOtherRate}</span>
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
