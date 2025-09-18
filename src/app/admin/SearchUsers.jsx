"use client"

import { useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X, Loader2 } from "lucide-react"

export function SearchUsers() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("search") || "")
  const [isPending, startTransition] = useTransition()

  const handleSearch = (e) => {
    e.preventDefault()
    startTransition(() => {
      if (query.trim()) {
        router.push(`/admin?search=${encodeURIComponent(query.trim())}`)
      } else {
        router.push("/admin")
      }
    })
  }

  const clearSearch = () => {
    setQuery("")
    startTransition(() => {
      router.push("/admin")
    })
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search users by name or email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
          disabled={isPending}
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground"
            disabled={isPending}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <Button type="submit" className="px-6" disabled={isPending}>
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Search"
        )}
      </Button>
    </form>
  )
}
