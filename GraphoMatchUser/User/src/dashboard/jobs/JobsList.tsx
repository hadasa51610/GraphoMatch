import { motion } from "framer-motion"
import { JobCard } from "./JobCard"
import type { Job } from "./JobsPage"

interface JobsListProps {
  jobs: Job[]
  expandedJobId: number | null
  setExpandedJobId: (id: number | null) => void
  toggleFilter: (tag: string) => void
  activeFilters: string[]
}

export function JobsList({ jobs, expandedJobId, setExpandedJobId, toggleFilter, activeFilters }: JobsListProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-3">
      {jobs.map((job, index) => (
        <JobCard
          key={job.id}
          job={job}
          index={index}
          isExpanded={expandedJobId === job.id}
          toggleExpand={() => setExpandedJobId(expandedJobId === job.id ? null : job.id)}
          toggleFilter={toggleFilter}
          activeFilters={activeFilters}
        />
      ))}
    </motion.div>
  )
}
