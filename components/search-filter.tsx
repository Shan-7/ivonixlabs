"use client"

import type React from "react"

import { useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface SearchFilterProps {
  categories: string[]
  onSearch: (query: string) => void
  onFilter: (categories: string[]) => void
}

export default function SearchFilter({ categories, onSearch, onFilter }: SearchFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
      onFilter(newCategories)
      return newCategories
    })
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 bg-gray-900/50 border-gray-800"
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Categories</SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              {categories.map((category) => (
                <label key={category} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="form-checkbox h-4 w-4 text-yellow-500 rounded border-gray-700 bg-gray-900"
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
