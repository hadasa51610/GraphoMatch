import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

interface NoJobsFoundProps {
  clearFilters: () => void
}

export function NoJobsFound({ clearFilters }: NoJobsFoundProps) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
      <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden p-6 shadow-lg">
        <div className="text-center">
          <div className="relative mx-auto w-16 h-16 mb-4">
            <div className="absolute inset-0 bg-purple-600/20 rounded-full filter blur-xl animate-pulse"></div>
            <div className="relative flex items-center justify-center h-full">
              <Sparkles className="h-10 w-10 text-gray-400" />
            </div>
          </div>
          <h2 className="text-lg font-medium mb-2">No matching jobs found</h2>
          <p className="text-sm text-gray-400 mb-4">Try adjusting your search criteria or filters</p>
          <Button
            size="sm"
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-full shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all"
            onClick={clearFilters}
          >
            Reset Filters
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
