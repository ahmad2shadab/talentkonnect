"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

interface CreditBalanceProps {
  userId: string
}

export function CreditBalance({ userId }: CreditBalanceProps) {
  const [balance, setBalance] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(`/api/credits/balance?userId=${userId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch credit balance")
        }

        const data = await response.json()
        setBalance(data.balance)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchBalance()
  }, [userId])

  return (
    <Card className="border-2 border-primary-blue/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <Sparkles className="h-5 w-5 text-accent-orange mr-2" />
          Credit Balance
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-16 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="flex items-center">
            <span className="text-4xl font-bold text-primary-blue">{balance}</span>
            <span className="ml-2 text-neutral-dark">credits</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
