import { Star, MapPin, Clock, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface JobCardProps {
  title: string
  company: string
  location: string
  matchPercentage: number
  tags: string[]
  salary: string
  posted: string
  logo: string
}

export function JobCard({ title, company, location, matchPercentage, tags, salary, posted, logo }: JobCardProps) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative h-full rounded-xl p-5 bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden group-hover:border-white/20 transition-all">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>

        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-2 rounded-lg border border-white/10">
            <Avatar className="h-10 w-10">
              <AvatarImage src={logo} alt={company} />
              <AvatarFallback className="bg-purple-900 text-white">{company.substring(0, 2)}</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white">{title}</h3>
              <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full">
                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-medium">{matchPercentage}% Match</span>
              </div>
            </div>

            <p className="text-sm text-gray-400 mt-1">{company}</p>

            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-white/5 text-white border-white/10">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                <span>{salary}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{posted}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-lg"
              >
                Apply Now
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-lg"
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

