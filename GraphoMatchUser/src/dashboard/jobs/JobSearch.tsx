import { motion } from "framer-motion"
import { Search, Filter, X } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"

interface JobSearchProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  activeFilters: string[]
  toggleFilter: (filter: string) => void
  clearFilters: () => void
}

export function JobSearch({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  activeFilters,
  toggleFilter,
  clearFilters,
}: JobSearchProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-4"
    >
      <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden shadow-lg">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search jobs, companies, or skills..."
                className="pl-10 bg-white/5 border-white/10 focus-visible:ring-purple-500 text-white h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[140px] bg-white/5 border-white/10 h-9">
                  <SelectValue placeholder="Match Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Jobs</SelectItem>
                  <SelectItem value="very-high">Very High Match</SelectItem>
                  <SelectItem value="high">High Match</SelectItem>
                  <SelectItem value="medium">Medium Match</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                className="border-white/10 bg-white/5 hover:bg-white/10 text-black h-9"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {activeFilters.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2 items-center">
              <span className="text-xs text-gray-400">Active filters:</span>
              {activeFilters.map((filter) => (
                <Badge
                  key={filter}
                  className="bg-white/10 hover:bg-white/20 text-white border-0 cursor-pointer flex items-center gap-1 py-0"
                  onClick={() => toggleFilter(filter)}
                >
                  {filter}
                  <X className="h-3 w-3" />
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs text-gray-400 hover:black"
                onClick={clearFilters}
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
