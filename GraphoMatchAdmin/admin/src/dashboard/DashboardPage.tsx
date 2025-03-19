import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileText, Upload, User, Check, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/Progress"
import { Badge } from "@/components/ui/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"

export default function ProfilePage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [handwritingFile, setHandwritingFile] = useState<File | null>(null)

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])
    }
  }

  const handleHandwritingUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setHandwritingFile(e.target.files[0])
    }
  }

  const profileCompletion = resumeFile && handwritingFile ? 100 : resumeFile || handwritingFile ? 50 : 25

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
            <User className="h-7 w-7 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <p className="text-gray-400">Manage your information and documents</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-1"
        >
          <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <Avatar className="h-24 w-24 border-2 border-purple-500 mb-4">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                  <AvatarFallback className="bg-purple-900 text-white text-2xl">JD</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-gray-400">Software Developer</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Profile Completion</span>
                  <span className="text-sm font-medium">{profileCompletion}%</span>
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
                        <p className="text-sm font-medium">Personal Info</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                      Complete
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-pink-500/20 p-2 rounded-lg">
                        <FileText className="h-5 w-5 text-pink-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Documents</p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${resumeFile && handwritingFile ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
                    >
                      {resumeFile && handwritingFile ? "Complete" : "Pending"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-2"
        >
          <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden mb-8">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Personal Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    id="first-name"
                    defaultValue="John"
                    className="bg-white/5 border-white/10 focus-visible:ring-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input
                    id="last-name"
                    defaultValue="Doe"
                    className="bg-white/5 border-white/10 focus-visible:ring-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john.doe@example.com"
                    className="bg-white/5 border-white/10 focus-visible:ring-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    defaultValue="+1 (555) 123-4567"
                    className="bg-white/5 border-white/10 focus-visible:ring-purple-500"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="profession">Current Profession</Label>
                  <Input
                    id="profession"
                    defaultValue="Software Developer"
                    className="bg-white/5 border-white/10 focus-visible:ring-purple-500"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-lg">
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Document Upload</h3>
              <p className="text-gray-400 mb-6">
                Upload your resume and a handwriting sample for analysis. The handwriting sample should be at least one
                paragraph written on unlined paper.
              </p>

              <div className="space-y-6">
                <div className="border border-dashed border-white/20 rounded-lg p-6 bg-white/5">
                  <div className="flex flex-col items-center justify-center text-center">
                    {resumeFile ? (
                      <div className="flex items-center gap-2 text-green-400">
                        <Check className="h-5 w-5" />
                        <span>{resumeFile.name}</span>
                      </div>
                    ) : (
                      <>
                        <FileText className="h-10 w-10 text-gray-400 mb-2" />
                        <h4 className="font-medium mb-1">Resume</h4>
                        <p className="text-sm text-gray-400 mb-4">Upload your CV or resume (PDF, DOCX)</p>
                      </>
                    )}

                    <Label
                      htmlFor="resume-upload"
                      className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                        resumeFile
                          ? "bg-white/10 hover:bg-white/20 text-white"
                          : "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                      }`}
                    >
                      <Upload className="h-4 w-4" />
                      <span>{resumeFile ? "Change File" : "Upload Resume"}</span>
                    </Label>
                    <Input
                      id="resume-upload"
                      type="file"
                      accept=".pdf,.docx,.doc"
                      className="hidden"
                      onChange={handleResumeUpload}
                    />
                  </div>
                </div>

                <div className="border border-dashed border-white/20 rounded-lg p-6 bg-white/5">
                  <div className="flex flex-col items-center justify-center text-center">
                    {handwritingFile ? (
                      <div className="flex items-center gap-2 text-green-400">
                        <Check className="h-5 w-5" />
                        <span>{handwritingFile.name}</span>
                      </div>
                    ) : (
                      <>
                        <FileText className="h-10 w-10 text-gray-400 mb-2" />
                        <h4 className="font-medium mb-1">Handwriting Sample</h4>
                        <p className="text-sm text-gray-400 mb-4">
                          Upload a clear image of your handwriting (JPG, PNG)
                        </p>
                      </>
                    )}

                    <Label
                      htmlFor="handwriting-upload"
                      className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                        handwritingFile
                          ? "bg-white/10 hover:bg-white/20 text-white"
                          : "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                      }`}
                    >
                      <Upload className="h-4 w-4" />
                      <span>{handwritingFile ? "Change File" : "Upload Handwriting"}</span>
                    </Label>
                    <Input
                      id="handwriting-upload"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      className="hidden"
                      onChange={handleHandwritingUpload}
                    />
                  </div>
                </div>

                {!resumeFile || !handwritingFile ? (
                  <div className="flex items-start gap-3 bg-yellow-500/10 text-yellow-400 p-4 rounded-lg">
                    <AlertCircle className="h-5 w-5 mt-0.5" />
                    <div>
                      <p className="font-medium">Documents Required</p>
                      <p className="text-sm">
                        Both your resume and handwriting sample are needed for a complete analysis.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-lg">
                      Submit for Analysis
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}