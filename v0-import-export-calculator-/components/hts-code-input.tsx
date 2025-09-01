"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface HTSCodeInputProps {
  value: string
  onChange: (value: string) => void
}

// Mock HTS codes database - in real app, this would come from an API
const htsCodeSuggestions = [
  { code: "8471.30.01", description: "Portable automatic data processing machines, weighing not more than 10 kg" },
  { code: "8471.41.01", description: "Data processing machines, digital, comprising CPU, input/output unit" },
  { code: "8471.49.00", description: "Other automatic data processing machines" },
  { code: "8471.60.10", description: "Input or output units for automatic data processing machines" },
  { code: "8471.70.20", description: "Storage units for automatic data processing machines" },
  { code: "8471.80.10", description: "Control or adapter units for automatic data processing machines" },
  { code: "8517.12.00", description: "Telephones for cellular networks or for other wireless networks" },
  { code: "8517.62.00", description: "Machines for reception, conversion, transmission of voice, images" },
  { code: "8528.72.04", description: "Reception apparatus for television, color, with LCD screen" },
  { code: "8528.72.08", description: "Reception apparatus for television, color, with OLED screen" },
  { code: "9013.80.90", description: "Other optical devices, appliances and instruments" },
  { code: "9405.40.84", description: "Other electric lamps and lighting fittings" },
  { code: "6203.42.40", description: "Men's or boys' trousers and breeches of cotton" },
  { code: "6204.62.40", description: "Women's or girls' trousers and breeches of cotton" },
  { code: "6109.10.00", description: "T-shirts, singlets and other vests, of cotton, knitted" },
]

export function HTSCodeInput({ value, onChange }: HTSCodeInputProps) {
  const [open, setOpen] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState(htsCodeSuggestions)

  useEffect(() => {
    if (value) {
      const filtered = htsCodeSuggestions.filter(
        (item) =>
          item.code.toLowerCase().includes(value.toLowerCase()) ||
          item.description.toLowerCase().includes(value.toLowerCase()),
      )
      setFilteredSuggestions(filtered)
    } else {
      setFilteredSuggestions(htsCodeSuggestions)
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
            <CommandInput placeholder="Search HTS codes..." value={value} onValueChange={onChange} />
            <CommandList>
              <CommandEmpty>No HTS codes found.</CommandEmpty>
              <CommandGroup>
                {filteredSuggestions.slice(0, 10).map((item) => (
                  <CommandItem
                    key={item.code}
                    value={item.code}
                    onSelect={(currentValue) => {
                      onChange(currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === item.code ? "opacity-100" : "opacity-0")} />
                    <div className="flex flex-col">
                      <span className="font-mono font-medium">{item.code}</span>
                      <span className="text-sm text-muted-foreground truncate">{item.description}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
