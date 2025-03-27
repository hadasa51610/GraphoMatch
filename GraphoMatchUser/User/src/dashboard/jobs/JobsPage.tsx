"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Briefcase, Search, Filter, Star, MapPin, Clock, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const recommendedJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "Tel Aviv, Israel",
      matchPercentage: 98,
      tags: ["React", "TypeScript", "UI/UX"],
      salary: "₪35,000 - ₪45,000",
      posted: "2 days ago",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "InnovateTech",
      location: "Jerusalem, Israel",
      matchPercentage: 95,
      tags: ["Node.js", "React", "MongoDB"],
      salary: "₪30,000 - ₪40,000",
      posted: "1 week ago",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "DesignHub",
      location: "Haifa, Israel",
      matchPercentage: 92,
      tags: ["Figma", "Adobe XD", "Prototyping"],
      salary: "₪25,000 - ₪35,000",
      posted: "3 days ago",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "CloudSys",
      location: "Remote",
      matchPercentage: 88,
      tags: ["AWS", "Docker", "Kubernetes"],
      salary: "₪40,000 - ₪50,000",
      posted: "Just now",
      logo: "/placeholder.svg?height=40&width=40",
    },
  ]

  const allJobs = [
    ...recommendedJobs,
    {
      id: 5,
      title: "Product Manager",
      company: "ProductCo",
      location: "Tel Aviv, Israel",
      matchPercentage: 85,
      tags: ["Product", "Agile", "Strategy"],
      salary: "₪40,000 - ₪50,000",
      posted: "1 week ago",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 6,
      title: "Data Scientist",
      company: "DataTech",
      location: "Herzliya, Israel",
      matchPercentage: 82,
      tags: ["Python", "ML", "Statistics"],
      salary: "₪35,000 - ₪45,000",
      posted: "3 days ago",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 7,
      title: "Backend Developer",
      company: "ServerSys",
      location: "Remote",
      matchPercentage: 80,
      tags: ["Java", "Spring", "Microservices"],
      salary: "₪30,000 - ₪40,000",
      posted: "5 days ago",
      logo: "/placeholder.svg?height=40&width=40",
    },
  ]

  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    if (selectedCategory === "all") return matchesSearch
    if (selectedCategory === "recommended") return job.matchPercentage >= 85 && matchesSearch
    return matchesSearch
  })

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-70"></div>
          <div className="relative bg-black rounded-full p-2">
            <Briefcase className="h-7 w-7 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold">Job Recommendations</h1>
          <p className="text-gray-400">Discover opportunities that match your profile</p>
        </div>
      </motion.div>

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
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Jobs</SelectItem>
                    <SelectItem value="recommended">Recommended</SelectItem>
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
        {filteredJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-2 rounded-lg border border-white/10">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={job.logo} alt={job.company} />
                      <AvatarFallback className="bg-purple-900 text-white">
                        {job.company.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-lg">{job.title}</h3>
                      <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full">
                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-medium">{job.matchPercentage}% Match</span>
                      </div>
                    </div>

                    <p className="text-gray-400 mt-1">{job.company}</p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {job.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-white/5 text-white border-white/10">
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
          </motion.div>
        ))}
      </div>
    </div>
  )
}