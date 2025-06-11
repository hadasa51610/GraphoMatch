import { motion } from "framer-motion"
import { MapPin, DollarSign, ChevronDown, Building, Loader2, AlertCircle, CheckCircle, X } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"
import type { JobType } from "@/types/JobType"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/store/store"
import { ApplyJob } from "@/store/slices/jobSlice"
import { useState } from "react"
import { JobProfileDialog } from "@/dashboard/jobs/JobProfileDialog"

interface JobCardProps {
  jobCard: JobType
  index: number
  isExpanded: boolean
  toggleExpand: () => void
  toggleFilter: (tag: string) => void
  activeFilters: string[]
}

export function JobCard({ jobCard, index, isExpanded, toggleExpand, toggleFilter, activeFilters }: JobCardProps) {
  const [isApplying, setIsApplying] = useState(false)
  const [applyError, setApplyError] = useState<string | null>(null)
  const [applySuccess, setApplySuccess] = useState(false)
  const [alreadyApplied, setAlreadyApplied] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

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

  const dispatch = useDispatch<AppDispatch>()
  const colorScheme = getMatchLevelColor(jobCard.matchLevel)

  const handleApplyJob = () => {
    const userId = sessionStorage.getItem("userId")
    if (!userId) {
      setApplyError("You must be logged in to apply for jobs")
      return
    }

    setApplyError(null)
    setApplySuccess(false)
    setAlreadyApplied(false)
    setIsApplying(true)

    dispatch(ApplyJob({ id: jobCard.id, userId: Number(userId) }))
      .then((result: any) => {
        setIsApplying(false)

        if (result.error) {
          if (result.payload && result.payload.includes("400")) {
            setAlreadyApplied(true)
          } else {
            setApplyError(result.error.message || "Failed to apply for this job")
          }
          return
        }

        if (result.payload) {
          setApplySuccess(true)
          setTimeout(() => {
            setApplySuccess(false)
          }, 5000)
        } else {
          setApplyError("Something went wrong. Please try again.")
        }
      })
      .catch((error: any) => {
        setIsApplying(false)
        setApplyError(error.message || "An unexpected error occurred")
      })
  }

  const handleOpenProfile = () => {
    setIsProfileOpen(true)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
        className="group"
      >
        <Collapsible open={isExpanded} onOpenChange={toggleExpand}>
          <div className="relative">
            <div
              className={`absolute -inset-0.5 rounded-xl blur opacity-${jobCard.matchLevel === "Very High" ? "30" : jobCard.matchLevel === "High" ? "20" : "10"} group-hover:opacity-100 transition-opacity`}
            ></div>

            <Card
              className={`relative bg-gradient-to-br from-gray-900 to-black border ${jobCard.matchLevel === "Very High" ? "border-white/20" : "border-white/10"} backdrop-blur-xl overflow-hidden group-hover:border-white/20 transition-all ${colorScheme.shadow}`}
            >
              <CollapsibleTrigger asChild>
                <div className="p-4 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Avatar
                      className={`h-10 w-10 border ${colorScheme.border} bg-gradient-to-br from-gray-800 to-gray-900`}
                    >
                      <AvatarImage src={jobCard.logo || "../company-64.png"} alt={jobCard.company} />
                      <AvatarFallback className={`bg-gradient-to-br ${colorScheme.gradient} text-white text-xs`}>
                        {jobCard.company.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-white text-base truncate">{jobCard.title}</h3>
                        <div className="flex items-center gap-1 ml-2 shrink-0">
                          <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${colorScheme.gradient}`}></div>
                          <Badge
                            className={`${colorScheme.bg} ${colorScheme.text} border ${colorScheme.border} text-xs`}
                          >
                            {jobCard.matchLevel}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-400 truncate">{jobCard.company}</p>
                        <ChevronDown
                          className={`h-4 w-4 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{jobCard.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      <span>{jobCard.salary}</span>
                    </div>
                  </div>
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="px-4 pb-4 pt-1 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {jobCard.tags.map((tag, index) => (
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

                  <p className="text-sm text-gray-300 mb-3">{jobCard.description}</p>

                  {/* Application Status Alerts */}
                  {applySuccess && (
                    <Alert className="mb-3 bg-green-500/10 border-green-500/20 text-white">
                      <CheckCircle className="h-4 w-4 text-green-400 bg-green-400" />
                      <AlertTitle className="text-green-400">Application Submitted!</AlertTitle>
                      <AlertDescription className="text-gray-300">
                        Your application has been successfully submitted. We'll notify you of any updates.
                      </AlertDescription>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 h-6 w-6 p-0 text-gray-400 hover:bg-green-500/10 hover:text-white"
                        onClick={() => setApplySuccess(false)}
                      >
                        <X className="h-3 w-3 text-black" />
                      </Button>
                    </Alert>
                  )}

                  {alreadyApplied && (
                    <Alert className="mb-3 bg-blue-500/10 border-blue-500/20 text-white">
                      <CheckCircle className="h-4 w-4 text-blue-400 bg-blue-400" />
                      <AlertTitle className="text-blue-400">Already Applied</AlertTitle>
                      <AlertDescription className="text-gray-300">
                        You've already applied for this position. We're reviewing your application and will be in touch
                        soon.
                      </AlertDescription>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 h-6 w-6 p-0 text-white hover:bg-blue-500/10 hover:text-white"
                        onClick={() => setAlreadyApplied(false)}
                      >
                        <X className="h-3 w-3 text-black" />
                      </Button>
                    </Alert>
                  )}

                  {applyError && (
                    <Alert className="mb-3 bg-red-500/10 border-red-500/20 text-white">
                      <AlertCircle className="h-4 w-4 text-red-400 bg-red-400" />
                      <AlertTitle className="text-red-400">Application Error</AlertTitle>
                      <AlertDescription className="text-gray-300">{applyError}</AlertDescription>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 h-6 w-6 p-0 text-gray-400 hover:bg-red-500/10 hover:text-white"
                        onClick={() => setApplyError(null)}
                      >
                        <X className="h-3 w-3 text-black" />
                      </Button>
                    </Alert>
                  )}

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleApplyJob}
                      disabled={isApplying || alreadyApplied}
                      size="sm"
                      className={`bg-gradient-to-r ${colorScheme.gradient} hover:brightness-110 text-white border-0 rounded-lg h-8 shadow-sm ${colorScheme.shadow} hover:shadow-md transition-all ${isApplying ? "opacity-80" : ""}`}
                    >
                      {isApplying ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />
                          Applying...
                        </>
                      ) : alreadyApplied ? (
                        "Applied"
                      ) : (
                        "Apply Now"
                      )}
                    </Button>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/10 bg-white/5 hover:bg-white/10 text-black rounded-lg h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleOpenProfile()
                            }}
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

      {/* Job Profile Dialog */}
      <JobProfileDialog
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        job={jobCard}
        colorScheme={colorScheme}
        onApply={handleApplyJob}
        isApplying={isApplying}
        alreadyApplied={alreadyApplied}
      />
    </>
  )
}
