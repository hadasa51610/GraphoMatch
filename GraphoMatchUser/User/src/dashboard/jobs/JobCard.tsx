"use client"

import { motion } from "framer-motion"
import { MapPin, Clock, DollarSign, ChevronDown, Star, Building } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { Job } from "./JobsPage"

interface JobCardProps {
  job: Job
  index: number
  isExpanded: boolean
  toggleExpand: () => void
  toggleFilter: (tag: string) => void
  activeFilters: string[]
}

export function JobCard({ job, index, isExpanded, toggleExpand, toggleFilter, activeFilters }: JobCardProps) {
  // Helper function to get color based on match level
  const getMatchLevelColor = (level: string) => {
    const colors: Record<
      string,
      { bg?: string; border?: string; text?: string; gradient?: string; shadow?: string; glow?: string }
    > = {
      "Very High": {
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30",
        text: "text-emerald-400",
        gradient: "from-emerald-500 to-green-600",
        shadow: "shadow-emerald-500/20",
        glow: "group-hover:shadow-emerald-500/30",
      },
      High: {
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
        text: "text-blue-400",
        gradient: "from-blue-500 to-indigo-600",
        shadow: "shadow-blue-500/20",
        glow: "group-hover:shadow-blue-500/30",
      },
      Medium: {
        bg: "bg-amber-500/10",
        border: "border-amber-500/30",
        text: "text-amber-400",
        gradient: "from-amber-500 to-orange-600",
        shadow: "shadow-amber-500/20",
        glow: "group-hover:shadow-amber-500/30",
      },
      Low: {
        bg: "bg-red-500/10",
        border: "border-red-500/30",
        text: "text-red-400",
        gradient: "from-red-500 to-rose-600",
        shadow: "shadow-red-500/20",
        glow: "group-hover:shadow-red-500/30",
      },
    }
    return colors[level] || colors["Medium"]
  }

  const colorScheme = getMatchLevelColor(job.matchLevel)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
      className="group"
    >
      <Collapsible open={isExpanded} onOpenChange={toggleExpand}>
        <div className="relative">
          <div
            className={`absolute -inset-0.5 rounded-xl blur opacity-${job.matchLevel === "Very High" ? "30" : job.matchLevel === "High" ? "20" : "10"} group-hover:opacity-100 transition-opacity`}
          ></div>

          <Card
            className={`relative bg-gradient-to-br from-gray-900 to-black border ${job.matchLevel === "Very High" ? "border-white/20" : "border-white/10"} backdrop-blur-xl overflow-hidden group-hover:border-white/20 transition-all ${colorScheme.shadow}`}
          >
            <CollapsibleTrigger asChild>
              <div className="p-4 cursor-pointer">
                <div className="flex items-center gap-3">
                  <Avatar
                    className={`h-10 w-10 border ${colorScheme.border} bg-gradient-to-br from-gray-800 to-gray-900`}
                  >
                    <AvatarImage src={job.logo || "/placeholder.svg"} alt={job.company} />
                    <AvatarFallback className={`bg-gradient-to-br ${colorScheme.gradient} text-white text-xs`}>
                      {job.company.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white text-base truncate">{job.title}</h3>
                      <div className="flex items-center gap-1 ml-2 shrink-0">
                        <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${colorScheme.gradient}`}></div>
                        <Badge className={`${colorScheme.bg} ${colorScheme.text} border ${colorScheme.border} text-xs`}>
                          {job.matchLevel}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-gray-400 truncate">{job.company}</p>
                      <ChevronDown
                        className={`h-4 w-4 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-400">
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
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="px-4 pb-4 pt-1 border-t border-white/5">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {job.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className={`
                        bg-white/5 text-xs text-white border-white/10 cursor-pointer
                        ${activeFilters.includes(tag) ? "bg-white/20 border-white/20" : ""}
                      `}
                      onClick={() => toggleFilter(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <p className="text-sm text-gray-300 mb-3">{job.description}</p>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className={`bg-gradient-to-r ${colorScheme.gradient} hover:brightness-110 text-white border-0 rounded-lg h-8 shadow-sm ${colorScheme.shadow} hover:shadow-md transition-all`}
                  >
                    Apply Now
                  </Button>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/10 bg-white/5 hover:bg-white/10 text-black rounded-lg h-8 w-8 p-0"
                        >
                          <Star className="h-3.5 w-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Save Job</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/10 bg-white/5 hover:bg-white/10 text-black rounded-lg h-8 w-8 p-0"
                        >
                          <Building className="h-3.5 w-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Company Profile</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </div>
      </Collapsible>
    </motion.div>
  )
}
