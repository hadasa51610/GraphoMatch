"use client"

import { useState } from "react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { MessageSquare, Send, ThumbsUp } from "lucide-react"

export function FeedbackSection() {
  const [feedback, setFeedback] = useState("")

  const feedbackItems = [
    {
      id: 1,
      user: "System Analysis",
      avatar: "/placeholder.svg?height=40&width=40&text=SA",
      date: "March 15, 2025",
      content:
        "Your handwriting analysis has been completed. The system has identified strong analytical skills and attention to detail in your writing style. These traits align well with technical and creative roles.",
      isSystem: true,
    },
    {
      id: 2,
      user: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40&text=JD",
      date: "March 16, 2025",
      content:
        "I found the job recommendations to be very accurate. The software development positions match my skills and interests perfectly. Thank you for the insights!",
      isSystem: false,
    },
    {
      id: 3,
      user: "Career Advisor",
      avatar: "/placeholder.svg?height=40&width=40&text=CA",
      date: "March 17, 2025",
      content:
        "Based on your handwriting analysis and resume, we've updated your job matches. You might want to consider UX/UI design roles as well, as your creative problem-solving abilities would be valuable in that field.",
      isSystem: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-70"></div>
          <div className="relative bg-black rounded-full p-2">
            <MessageSquare className="h-7 w-7 text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Feedback & Communication</h2>
          <p className="text-gray-400">Share your thoughts and view system updates</p>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden">
        <div className="p-6">
          <div className="space-y-6">
            {feedbackItems.map((item) => (
              <div key={item.id} className={`flex gap-4 ${item.isSystem ? "bg-white/5" : ""} p-4 rounded-lg`}>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={item.avatar} alt={item.user} />
                  <AvatarFallback className={item.isSystem ? "bg-blue-900" : "bg-purple-900"}>
                    {item.user.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{item.user}</h4>
                      {item.isSystem && (
                        <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full">System</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                  <p className="text-sm text-gray-300 mt-2">{item.content}</p>
                  {!item.isSystem && (
                    <div className="mt-3 flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-400 hover:text-white">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Helpful
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <h4 className="font-medium mb-3">Add Your Feedback</h4>
            <div className="space-y-4">
              <Textarea
                placeholder="Share your thoughts about the job recommendations or analysis..."
                className="bg-white/5 border-white/10 resize-none min-h-[100px]"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <div className="flex justify-end">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-lg">
                  <Send className="h-4 w-4 mr-2" />
                  Send Feedback
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}