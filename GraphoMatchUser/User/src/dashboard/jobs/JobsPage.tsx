"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Briefcase, Search, Filter, MapPin, Clock, DollarSign, Sparkles, Printer, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"

// Define types based on the provided data structure
interface CareerRecommendation {
  profession: string
  matchLevel: "Low" | "Medium" | "High" | "Very High"
  reason: string
}

interface Job {
  id: number
  title: string
  company: string
  location: string
  tags: string[]
  salary: string
  posted: string
  logo: string
  matchLevel: "Low" | "Medium" | "High" | "Very High"
  description: string
}

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data fetch - in a real app, this would be an API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRecommendations([
        {
          profession: "Graphic Designer / Calligrapher / Artist",
          matchLevel: "Very High",
          reason:
            "The creative flair, attention to detail, and aesthetic sensibility evident in the handwriting's stylized and rounded forms suggest a talent for visual expression.",
        },
        {
          profession: "Counselor / Therapist / Social Worker",
          matchLevel: "High",
          reason:
            "The sensitivity, empathy, and ability to connect with others shown in the right slant and variations in stroke thickness (emotional responsiveness) support this.",
        },
        {
          profession: "Writer / Journalist / Editor",
          matchLevel: "High",
          reason:
            "The intellectual curiosity, creative expression, and flowing style suggests a natural fluency with language.",
        },
        {
          profession: "Architect / Interior Designer",
          matchLevel: "Medium",
          reason:
            "The attention to detail, aesthetic sense, and ability to balance form and function in the writing suggest a sense of spatial awareness and creativity in design.",
        },
        {
          profession: "Marketing / Public Relations",
          matchLevel: "Medium",
          reason:
            "The expressiveness, sociability, and adaptability shown in the handwriting suggest an ability to connect with others and communicate effectively.",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  // Helper function to get color based on match level
  const getMatchLevelColor = (level: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; gradient: string }> = {
      "Very High": {
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        text: "text-emerald-400",
        gradient: "from-emerald-500 to-green-600",
      },
      High: {
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        text: "text-blue-400",
        gradient: "from-blue-500 to-indigo-600",
      },
      Medium: {
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        text: "text-amber-400",
        gradient: "from-amber-500 to-orange-600",
      },
      Low: {
        bg: "bg-red-500/10",
        border: "border-red-500/20",
        text: "text-red-400",
        gradient: "from-red-500 to-rose-600",
      },
    }
    return colors[level] || colors["Medium"]
  }

  // Generate jobs based on recommendations
  const generateJobs = () => {
    const jobs: Job[] = []

    // Generate jobs for each recommendation
    recommendations.forEach((rec, index) => {
      const professions = rec.profession.split(" / ")

      professions.forEach((profession, i) => {
        const jobId = index * 10 + i + 1

        // Generate tags based on profession
        const tags: string[] = []
        if (profession.includes("Designer") || profession.includes("Artist")) {
          tags.push("Creative", "Visual", "Design")
        } else if (profession.includes("Therapist") || profession.includes("Counselor")) {
          tags.push("Healthcare", "Psychology", "Empathy")
        } else if (profession.includes("Writer") || profession.includes("Editor")) {
          tags.push("Content", "Communication", "Media")
        } else if (profession.includes("Architect")) {
          tags.push("Design", "Technical", "Spatial")
        } else if (profession.includes("Marketing")) {
          tags.push("Communication", "Strategy", "Media")
        }

        // Add a unique tag
        tags.push(profession)

        // Create job
        jobs.push({
          id: jobId,
          title: profession,
          company: `${["Creative", "Global", "Modern", "Elite", "Premier"][Math.floor(Math.random() * 5)]} ${["Solutions", "Group", "Partners", "Associates", "Studios"][Math.floor(Math.random() * 5)]}`,
          location: ["Tel Aviv, Israel", "Jerusalem, Israel", "Haifa, Israel", "Remote", "Hybrid"][
            Math.floor(Math.random() * 5)
          ],
          tags: tags,
          salary: `₪${(Math.floor(Math.random() * 20) + 20) * 1000} - ₪${(Math.floor(Math.random() * 20) + 30) * 1000}`,
          posted: ["Just now", "1 day ago", "3 days ago", "1 week ago", "2 weeks ago"][Math.floor(Math.random() * 5)],
          logo: `/placeholder.svg?height=40&width=40&text=${profession.substring(0, 2).toUpperCase()}`,
          matchLevel: rec.matchLevel,
          description: `This position requires a talented ${profession} with excellent ${tags.join(", ")} skills. ${rec.reason}`,
        })
      })
    })

    return jobs
  }

  const allJobs = generateJobs()

  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    if (selectedCategory === "all") return matchesSearch
    if (selectedCategory === "very-high") return job.matchLevel === "Very High" && matchesSearch
    if (selectedCategory === "high") return job.matchLevel === "High" && matchesSearch
    if (selectedCategory === "medium") return job.matchLevel === "Medium" && matchesSearch
    return matchesSearch
  })

  // Loading state
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-6 mb-10"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-70"></div>
            <div className="relative bg-black rounded-full p-3">
              <Briefcase className="h-8 w-8 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Job Recommendations
            </h1>
            <p className="text-gray-400 mt-1">Finding your perfect career matches...</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Animated loading card 1 */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden h-[300px] relative">
              <div className="absolute inset-0">
                <div className="absolute top-8 left-8 right-8">
                  <div className="h-8 w-48 bg-white/5 rounded-md mb-6 animate-pulse"></div>
                  <div className="space-y-4">
                    <div className="h-4 bg-white/5 rounded-md w-full animate-pulse"></div>
                    <div className="h-4 bg-white/5 rounded-md w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-white/5 rounded-md w-4/6 animate-pulse"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent"></div>
              </div>
              <div className="absolute bottom-8 left-8 right-8 flex space-x-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-8 w-20 bg-white/5 rounded-md animate-pulse"></div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Animated loading card 2 */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden h-[300px] relative">
              <div className="absolute inset-0">
                <div className="absolute top-8 left-8 right-8">
                  <div className="h-8 w-48 bg-white/5 rounded-md mb-6 animate-pulse"></div>
                  <div className="space-y-4">
                    <div className="h-4 bg-white/5 rounded-md w-full animate-pulse"></div>
                    <div className="h-4 bg-white/5 rounded-md w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-white/5 rounded-md w-4/6 animate-pulse"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent"></div>
              </div>
              <div className="absolute bottom-8 left-8 right-8 flex space-x-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-8 w-20 bg-white/5 rounded-md animate-pulse"></div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden relative">
            <div className="p-8 flex flex-col items-center justify-center">
              <div className="relative mb-6">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
                <div className="h-16 w-16 rounded-full border-4 border-t-transparent border-purple-500 animate-spin"></div>
              </div>
              <h3 className="text-xl font-medium mb-2">Analyzing Your Perfect Job Matches</h3>
              <p className="text-gray-400 mb-6 text-center max-w-md">
                We're analyzing your handwriting patterns and career preferences to find your ideal job opportunities
              </p>
              <div className="w-full max-w-md h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                ></motion.div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-6 mb-10"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-70"></div>
          <div className="relative bg-black rounded-full p-3">
            <Briefcase className="h-8 w-8 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Job Recommendations
          </h1>
          <p className="text-gray-400 mt-1">Discover opportunities that match your handwriting profile</p>
        </div>
      </motion.div>

      <Tabs defaultValue="jobs" className="mb-10">
        <TabsList className="grid grid-cols-2 bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl rounded-lg h-auto p-1">
          <TabsTrigger
            value="jobs"
            className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md py-3 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-purple-500"
          >
            Job Listings
          </TabsTrigger>
          <TabsTrigger
            value="recommendations"
            className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md py-3 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-purple-500"
          >
            Career Recommendations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search jobs, companies, or skills..."
                      className="pl-10 bg-white/5 border-white/10 focus-visible:ring-purple-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-[180px] bg-white/5 border-white/10">
                        <SelectValue placeholder="Match Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Jobs</SelectItem>
                        <SelectItem value="very-high">Very High Match</SelectItem>
                        <SelectItem value="high">High Match</SelectItem>
                        <SelectItem value="medium">Medium Match</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-white">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <div className="space-y-6">
            {filteredJobs.length === 0 ? (
              <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden p-8">
                <div className="text-center">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h2 className="text-xl font-medium mb-2">No matching jobs found</h2>
                  <p className="text-gray-400 mb-6">Try adjusting your search criteria or filters</p>
                  <Button
                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-full"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("all")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </Card>
            ) : (
              filteredJobs.map((job, index) => {
                const colorScheme = getMatchLevelColor(job.matchLevel)
                return (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="group"
                  >
                    <div className="relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <Card className="relative bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden group-hover:border-white/20 transition-all">
                        <div className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-2 rounded-lg border border-white/10">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={job.logo || "/placeholder.svg"} alt={job.company} />
                                <AvatarFallback className="bg-purple-900 text-white">
                                  {job.company.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-bold text-white text-lg">{job.title}</h3>
                                <div className="flex items-center gap-1">
                                  <div
                                    className={`h-2 w-2 rounded-full bg-gradient-to-r ${colorScheme.gradient}`}
                                  ></div>
                                  <Badge
                                    className={`${colorScheme.bg} ${colorScheme.text} border ${colorScheme.border}`}
                                  >
                                    {job.matchLevel} Match
                                  </Badge>
                                </div>
                              </div>

                              <p className="text-gray-400 mt-1">{job.company}</p>

                              <div className="flex flex-wrap gap-2 mt-3">
                                {job.tags.map((tag, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="bg-white/5 text-white border-white/10"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-sm text-gray-400">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  <span>{job.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <DollarSign className="h-3 w-3" />
                                  <span>{job.salary}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{job.posted}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 mt-4">
                                <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-lg">
                                  Apply Now
                                </Button>
                                <Button
                                  variant="outline"
                                  className="border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-lg"
                                >
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </motion.div>
                )
              })
            )}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="mt-6">
          <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  <h3 className="text-2xl font-bold">Career Recommendations</h3>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-full"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print Report
                </Button>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-gray-300 leading-relaxed">
                  Based on your handwriting analysis, these career paths are recommended for you. Each recommendation is
                  matched to specific traits identified in your handwriting sample.
                </p>
              </div>

              <div className="space-y-6">
                {recommendations.map((rec, index) => {
                  const colorScheme = getMatchLevelColor(rec.matchLevel)
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group"
                    >
                      <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative rounded-xl bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden group-hover:border-white/20 transition-all">
                          <div className="p-6">
                            <div className="flex-1">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                                <h4 className="text-xl font-bold">{rec.profession}</h4>
                                <div className="flex items-center gap-1">
                                  <div
                                    className={`h-2 w-2 rounded-full bg-gradient-to-r ${colorScheme.gradient}`}
                                  ></div>
                                  <Badge
                                    className={`${colorScheme.bg} ${colorScheme.text} border ${colorScheme.border} md:ml-auto w-fit`}
                                  >
                                    {rec.matchLevel} Match
                                  </Badge>
                                </div>
                              </div>
                              <div className="w-full h-1 bg-white/10 rounded-full mb-3">
                                <div
                                  className={`h-full rounded-full bg-gradient-to-r ${colorScheme.gradient}`}
                                  style={{
                                    width:
                                      rec.matchLevel === "Very High"
                                        ? "95%"
                                        : rec.matchLevel === "High"
                                          ? "80%"
                                          : rec.matchLevel === "Medium"
                                            ? "60%"
                                            : "40%",
                                  }}
                                ></div>
                              </div>
                              <p className="text-gray-300">{rec.reason}</p>
                            </div>
                          </div>
                          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 border-t border-white/10">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-400">Related Jobs</span>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-white hover:bg-white/10 group"
                                onClick={() => {
                                  setSearchQuery(rec.profession.split(" / ")[0])
                                  document.querySelector('[data-state="active"][value="jobs"]')?.click()
                                }}
                              >
                                View Jobs
                                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
