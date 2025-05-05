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

export type CareerRecommendation= { profession: string; matchLevel: string; reason: string }[]

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [recommendations, setRecommendations] = useState<CareerRecommendation>([])
  const [loading, setLoading] = useState(true)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null)

  const dispatch = useDispatch<AppDispatch>()
  const [allJobs, setAllJobs] = useState<JobType[]>([])

  // useEffect(() => {
  //   const userId = sessionStorage.getItem("userId")
  //   if (userId) {
  //     setIsLoadingUser(true)
  //     setUserError(null)

  //     dispatch(GetUser(Number(userId)))
  //       .then((result: any) => {
  //         if (result.payload) {
  //           setUser(result.payload as UserType)
  //           setPreviousUser(result.payload as UserType)
  //         } else {
  //           setUserError("Failed to load user data")
  //         }
  //       })
  //       .catch((error) => {
  //         setUserError(error.message || "Failed to load user data")
  //       })
  //       .finally(() => {
  //         setIsLoadingUser(false)
  //       })
  //   }
  // }, [dispatch])

  useEffect(() => {
    setLoading(true)
    dispatch(GetJobs()).then((result: any) => {
      if (result.payload) {
        setAllJobs([...result.payload])
      }
    }).finally(() => {
      setLoading(false)
    })
  }, [dispatch])

  // Mock data fetch - in a real app, this would be an API call
  // useEffect(() => {
  //   // Simulate API call
  //   setTimeout(() => {
  //     setRecommendations([
  //       {
  //         profession: "Graphic Designer / Calligrapher / Artist",
  //         matchLevel: "Very High",
  //         reason:
  //           "The creative flair, attention to detail, and aesthetic sensibility evident in the handwriting's stylized and rounded forms suggest a talent for visual expression.",
  //       },
  //     ])
  //     setLoading(false)
  //   }, 1000)
  // }, [])

  // Generate jobs based on recommendations
  // const generateJobs = () => {
  //   const jobs: Job[] = []

  //   // Generate jobs for each recommendation
  //   recommendations.forEach((rec, index) => {
  //     const professions = rec.profession.split(" / ")

  //     professions.forEach((profession, i) => {
  //       const jobId = index * 10 + i + 1

  //       // Generate tags based on profession
  //       const tags: string[] = []
  //       if (profession.includes("Designer") || profession.includes("Artist")) {
  //         tags.push("Creative", "Visual", "Design")
  //       } else if (profession.includes("Therapist") || profession.includes("Counselor")) {
  //         tags.push("Healthcare", "Psychology", "Empathy")
  //       } else if (profession.includes("Writer") || profession.includes("Editor")) {
  //         tags.push("Content", "Communication", "Media")
  //       } else if (profession.includes("Architect")) {
  //         tags.push("Design", "Technical", "Spatial")
  //       } else if (profession.includes("Marketing")) {
  //         tags.push("Communication", "Strategy", "Media")
  //       }

  //       // Add a unique tag
  //       tags.push(profession)

  //       // Create job
  //       jobs.push({
  //         id: jobId,
  //         title: profession,
  //         company: `${["Creative", "Global", "Modern", "Elite", "Premier"][Math.floor(Math.random() * 5)]} ${["Solutions", "Group", "Partners", "Associates", "Studios"][Math.floor(Math.random() * 5)]}`,
  //         location: ["Tel Aviv, Israel", "Jerusalem, Israel", "Haifa, Israel", "Remote", "Hybrid"][
  //           Math.floor(Math.random() * 5)
  //         ],
  //         tags: tags,
  //         salary: `₪${(Math.floor(Math.random() * 20) + 20) * 1000} - ₪${(Math.floor(Math.random() * 20) + 30) * 1000}`,
  //         posted: ["Just now", "1 day ago", "3 days ago", "1 week ago", "2 weeks ago"][Math.floor(Math.random() * 5)],
  //         logo: `/placeholder.svg?height=40&width=40&text=${profession.substring(0, 2).toUpperCase()}`,
  //         matchLevel: rec.matchLevel,
  //         description: `This position requires a talented ${profession} with excellent ${tags.join(", ")} skills. ${rec.reason}`,
  //       })
  //     })
  //   })

  //   return jobs
  // }

  // const allJobs = generateJobs()

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

  
  const filteredJobs = allJobs.filter((jobCard:JobType) => {
    console.log("jobCard", jobCard)

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
