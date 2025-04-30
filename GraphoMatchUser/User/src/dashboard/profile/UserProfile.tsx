"use client"

import { Loader2, User, FileText } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Progress } from "@/components/ui/Progress"
import { Badge } from "@/components/ui/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import type { UserType } from "@/types/UserType"

interface UserProfileCardProps {
  user: UserType | null
  isLoadingUser: boolean
  resumeFile: File | null
  handwritingFile: File | null
}

export function UserProfileCard({ user, isLoadingUser, resumeFile, handwritingFile }: UserProfileCardProps) {
  const profileCompletion = resumeFile && handwritingFile ? 100 : resumeFile || handwritingFile ? 50 : 0

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden">
      <div className="p-6">
        {isLoadingUser ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 text-purple-500 animate-spin mb-4" />
            <p className="text-gray-400">Loading profile...</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="h-24 w-24 border-2 border-purple-500 mb-4">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                <AvatarFallback className="bg-purple-900 text-white text-2xl">
                  {user?.firstName?.charAt(0).toUpperCase() || ""}
                  {user?.lastName?.charAt(0).toUpperCase() || ""}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold text-white">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-400">{user?.profession}</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Profile Completion</span>
                <span className="text-sm font-medium text-white">{profileCompletion}%</span>
              </div>
              <Progress
                value={profileCompletion}
                className="h-2 bg-white/10"
                indicatorClassName="bg-gradient-to-r from-purple-500 to-pink-500"
              />

              <div className="pt-4 space-y-3">
                <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500/20 p-2 rounded-lg">
                      <User className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Personal Info</p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${user ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
                  >
                    {user ? "Complete" : "Required"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-pink-500/20 p-2 rounded-lg">
                      <FileText className="h-5 w-5 text-pink-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Documents</p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${resumeFile && handwritingFile ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
                  >
                    {resumeFile && handwritingFile ? "Complete" : "Required"}
                  </Badge>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
