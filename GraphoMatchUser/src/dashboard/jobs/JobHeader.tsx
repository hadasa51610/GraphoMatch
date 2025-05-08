import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"

export function JobsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-4 mb-6 relative"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-70"></div>
        <div className="relative bg-black rounded-full p-3">
          <Briefcase className="h-6 w-6 text-white" />
        </div>
      </div>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          Job Recommendations
        </h1>
        <p className="text-sm text-gray-400">Discover opportunities that match your handwriting profile</p>
      </div>
    </motion.div>
  )
}
