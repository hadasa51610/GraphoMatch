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

  const normalize = (word: string) => {
    if (!word) return "";

    return word
      .toLowerCase()
      .replace(/(ing|er|ors|or|s|ion|ment|al|ive|ed|y)$/g, '');
  };


  useEffect(() => {
    setLoading(true);
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      router("/");
      return;
    }

    dispatch(GetFiles(Number(userId)))
      .then((result: any) => {
        if (result.payload) {
          const imageItem = result.payload.find((item: any) => item.type === "image");
          if (!imageItem) return;

          try {
            let recs: any[] = [];
            if (imageItem.analysisResult !== 'none') {
              const outer = JSON.parse(imageItem.analysisResult);
              const jsonMatch = outer.analysis.match(/```json\s*([\s\S]*?)\s*```/);
              if (!jsonMatch || jsonMatch.length < 2) {
                throw new Error("Could not extract JSON block from analysis");
              }

              const parsed = JSON.parse(jsonMatch[1]);
              recs = parsed.recommendations;
              setRecommendations(recs);
            }
            dispatch(GetJobs()).then((jobsResult: any) => {
              if (jobsResult.payload) {
                const jobs = jobsResult.payload.map((jobCard: any) => {
                  const jobTitleWords = jobCard.title
                    .toLowerCase()
                    .trim()
                    .split(/[\s\/\-]+/)
                    .map(normalize);

                  const match = recs.find((r: any) => {
                    const professionWords = r.profession
                      .toLowerCase()
                      .trim()
                      .split(/[\s\/\-]+/)
                      .map(normalize);

                    return professionWords.some((word: string) => jobTitleWords.includes(word)) ||
                      jobTitleWords.some((word: string) => professionWords.includes(word));
                  });

                  const level = match?.matchLevel;

                  return {
                    ...jobCard,
                    matchLevel:
                      level === "Very High" || level === "High" || level === "Medium"
                        ? level
                        : "Low",
                    logo: jobCard.logo || "",
                  } as JobType;
                });

                setAllJobs(jobs);
              }
            });

          } catch (err) {
            console.error("Error processing analysisResult:", err);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);



  const toggleFilter = (tag: string) => {
    console.log("all jobs", allJobs);
    console.log("recommendations", recommendations);


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

    const matchesSearch =
      jobCard.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jobCard.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jobCard.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "very-high" && jobCard.matchLevel === "Very High") ||
      (selectedCategory === "high" && jobCard.matchLevel === "High") ||
      (selectedCategory === "medium" && jobCard.matchLevel === "Medium")

    const matchesTags = activeFilters.length === 0 || activeFilters.some((filter) => jobCard.tags.includes(filter))

    return matchesSearch && matchesCategory && matchesTags
  })

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
