import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, value, defaultValue, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      value={value ?? defaultValue ?? ""}
      className={cn(/* styling */ className)}
      data-slot="input"
      {...props}
    />
  )
}

export { Input }
