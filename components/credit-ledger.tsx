"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"

interface LedgerEntry {
  id: string
  date: string
  source: string
  amount: number
}

interface CreditLedgerProps {
  userId: string
}

export function CreditLedger({ userId }: CreditLedgerProps) {
  const [entries, setEntries] = useState<LedgerEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const fetchLedger = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/credits/history?userId=${userId}&page=${page}&limit=5`)

      if (!response.ok) {
        throw new Error("Failed to fetch credit history")
      }

      const data = await response.json()
      setEntries(data.entries)
      setHasMore(data.hasMore)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLedger()
  }, [userId, page])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <Card className="border-2 border-primary-blue/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <Clock className="h-5 w-5 text-accent-orange mr-2" />
          Credit History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 p-4">{error}</div>
        ) : entries.length === 0 ? (
          <div className="text-center py-12 text-neutral-dark">No credit history found</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Credits</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{formatDate(entry.date)}</TableCell>
                    <TableCell>{entry.source}</TableCell>
                    <TableCell
                      className={`text-right font-medium ${entry.amount > 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {entry.amount > 0 ? `+${entry.amount}` : entry.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1 || isLoading}
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Previous
        </Button>
        <span className="text-sm text-neutral-dark">Page {page}</span>
        <Button variant="outline" size="sm" onClick={() => setPage((p) => p + 1)} disabled={!hasMore || isLoading}>
          Next <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  )
}
