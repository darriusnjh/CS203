'use client'

import { useMutation } from '@tanstack/react-query'

export function useTariffCalculation() {
  return useMutation({
    mutationFn: async (input: any) => {
      const res = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })

      if (!res.ok) {
        const error = await res.json().catch(() => ({}))
        throw new Error(error.message || 'Something went wrong')
      }

      return res.json()
    },
  })
}
