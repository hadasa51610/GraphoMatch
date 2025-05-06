import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"

import { JobsHeader } from "./JobHeader"
import { JobSearch } from "./JobSearch"
import { JobsList } from "./JobsList"
import { NoJobsFound } from "./NoJobsFound"
import { Card } from "@/components/ui/Card"
import { JobType } from "@/types/JobType"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store"
import { GetJobs } from "@/store/slices/jobSlice"
import { useNavigate } from "react-router-dom"
import { GetFiles } from "@/store/slices/fileSlice"

export type CareerRecommendation = { profession: string; matchLevel: string; reason: string }

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null)
  const router = useNavigate()

  const dispatch = useDispatch<AppDispatch>()
  const [allJobs, setAllJobs] = useState<JobType[]>([])

  useEffect(() => {
    setLoading(true)
    const userId = sessionStorage.getItem("userId")
    if (!userId) {
      router("/")
      return;
    }

    dispatch(GetFiles(Number(userId)))
      .then((result: any) => {
        if (result.payload) {
          result.payload.forEach((item: any) => {
            if (item.type === "image") {
              try {
                const outer = JSON.parse(item.analysisResult);
                const jsonMatch = outer.analysis.match(/```json\s*([\s\S]*?)\s*```/);
                if (!jsonMatch || jsonMatch.length < 2) {
                  throw new Error("Could not extract JSON block from analysis");
                }

                const parsed = JSON.parse(jsonMatch[1]);
                setRecommendations([...parsed.recommendations]);

              } catch (err) {
                console.error("Error processing analysisResult:", err);
              }
            }
          })
        }
      })
      .catch((error) => {
        console.error("Failed to load files:", error)
      })


    dispatch(GetJobs()).then((result: any) => {
      if (result.payload) {
        const jobs = result.payload;

        jobs.forEach((jobCard: JobType) => {
          const match = recommendations.find((r) => r.profession.toLowerCase().trim() === jobCard.title.toLowerCase().trim());
          if (match) {
            const level = match.matchLevel;
            if (level === "Low" || level === "Medium" || level === "High" || level === "Very High") {
              jobCard.matchLevel = level;
            } else {
              jobCard.matchLevel = "Low"; 
            }

          }
        });

        setAllJobs([...jobs]); // async update
      }
    }).finally(() => {
      setLoading(false)
    })
  }, [dispatch])


  const toggleFilter = (tag: string) => {
    if (activeFilters.includes(tag)) {
      setActiveFilters(activeFilters.filter((t) => t !== tag))
    } else {
      setActiveFilters([...activeFilters, tag])
    }
  }

  const clearFilters = () => {
    setActiveFilters([])
    setSearchQuery("")
    setSelectedCategory("all")
  }


  const filteredJobs = allJobs.filter((jobCard: JobType) => {

    // Filter by search query
    const matchesSearch =
      jobCard.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jobCard.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jobCard.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    // Filter by match level
    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "very-high" && jobCard.matchLevel === "Very High") ||
      (selectedCategory === "high" && jobCard.matchLevel === "High") ||
      (selectedCategory === "medium" && jobCard.matchLevel === "Medium")

    // Filter by active tag filters
    const matchesTags = activeFilters.length === 0 || activeFilters.some((filter) => jobCard.tags.includes(filter))

    return matchesSearch && matchesCategory && matchesTags
  })

  // Loading state
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-70"></div>
            <div className="relative bg-black rounded-full p-2">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Job Recommendations
            </h1>
            <p className="text-sm text-gray-400">Finding your perfect career matches...</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-4"
        >
          {[1, 2, 3].map((i) => (
            <Card
              key={i}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden"
            >
              <div className="p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-white/5 animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-white/5 rounded-md w-1/3 animate-pulse mb-2"></div>
                  <div className="h-3 bg-white/5 rounded-md w-1/4 animate-pulse"></div>
                </div>
                <div className="h-6 w-20 bg-white/5 rounded-md animate-pulse"></div>
              </div>
            </Card>
          ))}

          <div className="flex justify-center mt-6">
            <div className="relative">
              <div className="h-10 w-10 rounded-full border-2 border-t-transparent border-purple-500 animate-spin"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <JobsHeader />
      <JobSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        activeFilters={activeFilters}
        toggleFilter={toggleFilter}
        clearFilters={clearFilters}
      />

      {filteredJobs.length === 0 ? (
        <NoJobsFound clearFilters={clearFilters} />
      ) : (
        <JobsList
          jobs={filteredJobs}
          expandedJobId={expandedJobId}
          setExpandedJobId={setExpandedJobId}
          toggleFilter={toggleFilter}
          activeFilters={activeFilters}
        />
      )}
    </div>
  )
}
