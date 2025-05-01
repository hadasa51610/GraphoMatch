import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Send, Sparkles } from "lucide-react"

import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Textarea } from "@/components/ui/Textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { SuccessNotification } from "@/components/SuccessNotification"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/store/store"
import type { FeedbackType } from "@/types/FeedbackType"
import { Add, Get } from "@/store/slices/feedbackSlice"
import { GetUser } from "@/store/slices/userSlice"

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const [allFeedbacks, setAllFeedbacks] = useState<FeedbackType[] | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch all feedbacks
  useEffect(() => {
    dispatch(Get()).then((result: any) => {
      if (result.payload) {
        setAllFeedbacks([...result.payload])
      }
    })
  }, [dispatch])

  // Fetch user data for each feedback
  useEffect(() => {
    const fetchUsers = async () => {
      const updatedFeedbacks = allFeedbacks
        ? await Promise.all(
            allFeedbacks.map(async (item) => {
              if (item.userId !== undefined) {
                const res = await dispatch(GetUser(item.userId as number))
                if (res.payload) {
                  return {
                    ...item,
                    userFirstName: res.payload.firstName || "",
                    userLastName: res.payload.lastName || "",
                  }
                }
              }
              return item
            }),
          )
        : []

      // Process feedbacks to get only one per user (the most recent)
      const userMap = new Map()
      updatedFeedbacks.forEach((feedback) => {
        const userId = feedback.userId
        if (!userMap.has(userId) || new Date(feedback.createdAt) > new Date(userMap.get(userId).createdAt)) {
          userMap.set(userId, feedback)
        }
      })

      // Convert map to array and limit to 15 feedbacks
      const uniqueFeedbacks = Array.from(userMap.values())
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 15)

      setAllFeedbacks(uniqueFeedbacks)
    }

    if (allFeedbacks && allFeedbacks.length > 0) {
      fetchUsers()
    }
  }, [allFeedbacks, dispatch])

  const handleSubmitFeedback = () => {
    if (feedback.trim()) {
      setIsSubmitting(true)
      const id = sessionStorage.getItem("userId")
      if (id) {
        const data: FeedbackType = {
          userId: Number(id),
          userFirstName: "",
          userLastName: "",
          content: feedback,
          createdAt: new Date(),
        }
        dispatch(Add(data)).then((result: any) => {
          if (result.payload) {
            setFeedback("")
            setShowSuccess(true)

            // Add the new feedback and ensure we still have only one per user
            dispatch(Get()).then((getResult: any) => {
              if (getResult.payload) {
                setAllFeedbacks([...getResult.payload])
              }
            })

            setIsSubmitting(false)
          }
        })
      }
    }
  }

  // Generate a random pastel color based on user ID for visual differentiation
  const getUserColor = (userId: number) => {
    const colors = [
      "from-purple-500 to-pink-500",
      "from-blue-500 to-indigo-500",
      "from-green-500 to-teal-500",
      "from-red-500 to-orange-500",
      "from-yellow-500 to-amber-500",
      "from-indigo-500 to-violet-500",
      "from-rose-500 to-red-500",
      "from-cyan-500 to-blue-500",
      "from-fuchsia-500 to-purple-500",
      "from-amber-500 to-yellow-500",
    ]

    return colors[userId % colors.length]
  }

  return (
    <div className="max-w-4xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-70"></div>
          <div className="relative bg-black rounded-full p-3">
            <MessageSquare className="h-7 w-7 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Feedback & Communication
          </h1>
          <p className="text-gray-300">Share your thoughts and see what others are saying</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-white/10 backdrop-blur-xl overflow-hidden mb-8 shadow-xl">
          <div className="p-6 relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/20 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              Add Your Feedback
            </h3>

            <div className="space-y-4 relative">
              <Textarea
                placeholder="Share your thoughts about the job recommendations or analysis..."
                className="bg-white/8 border-white/10 resize-none min-h-[100px] text-white focus:ring-purple-500 focus:border-purple-500 transition-all"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <div className="flex justify-end">
                <Button
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-lg shadow-lg shadow-purple-500/20 transition-all hover:shadow-purple-500/40"
                  onClick={handleSubmitFeedback}
                  disabled={isSubmitting || !feedback.trim()}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </div>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Feedback
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-white/10 backdrop-blur-xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              Community Feedback
              <span className="ml-2 text-sm font-normal text-gray-400">
                {allFeedbacks?.length || 0} of {allFeedbacks?.length || 0}
              </span>
            </h3>
          </div>

          <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
            <AnimatePresence>
              {allFeedbacks?.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 text-center text-gray-400"
                >
                  No feedback yet. Be the first to share your thoughts!
                </motion.div>
              )}

              {allFeedbacks?.map((item, index) => (
                <motion.div
                  key={`${item.userId}-${item.createdAt.toString()}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b border-white/5 last:border-0"
                >
                  <div className="p-6 hover:bg-white/5 transition-colors">
                    <div className="flex gap-4">
                      <div className="relative">
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${getUserColor(item.userId as number)} rounded-full blur-sm opacity-70`}
                        ></div>
                        <Avatar className="h-12 w-12 border-2 border-white/10 relative">
                          <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                          <AvatarFallback className={`bg-gradient-to-br ${getUserColor(item.userId as number)}`}>
                            {item.userFirstName?.charAt(0).toUpperCase()}
                            {item.userLastName?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-white">
                              {item.userFirstName} {item.userLastName}
                            </h4>
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-500"></div>
                            <span className="text-xs text-gray-400">
                              {new Date(item.createdAt).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>

                        <div className="mt-2 relative">
                          <p className="text-gray-300 leading-relaxed">{item.content}</p>
                          <div
                            className={`absolute -left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b ${getUserColor(item.userId as number)} opacity-50`}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>

      <SuccessNotification
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Feedback Received!"
        message="Thank you for your feedback! Our team will review your comments soon."
        color="green"
      />

    </div>
  )
}
