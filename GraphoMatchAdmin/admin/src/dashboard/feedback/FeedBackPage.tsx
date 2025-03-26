import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MessageSquare, Send } from "lucide-react"

import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Textarea } from "@/components/ui/Textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { SuccessNotification } from "@/components/SuccessNotification"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store"
import { FeedbackType } from "@/types/FeedbackType"
import { Add, Get } from "@/store/slices/feedbackSlice"
import { GetUser } from "@/store/slices/userSlice"

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const dispatch = useDispatch<AppDispatch>();
  const [allFeedbacks, setAllFeedbacks] = useState<FeedbackType[] | null>(null);

  useEffect(() => {
    dispatch(Get()).then((result: any) => {
      if (result.payload) {
        setAllFeedbacks([...result.payload]);
      }
    })
  }, [dispatch]);

  useEffect(() => {
    const fetchUsers = async () => {
      const updatedFeedbacks = allFeedbacks
        ? await Promise.all(allFeedbacks.map(async (item) => {
          if (item.userId !== undefined) {
            const res = await dispatch(GetUser(item.userId as number));
            if (res.payload) {
              return {
                ...item,
                userFirstName: res.payload.firstName || '',
                userLastName: res.payload.lastName || '',
              };
            }
          }
          return item;
        }))
        : [];
      setAllFeedbacks(updatedFeedbacks);
    };

    if (allFeedbacks && allFeedbacks.length > 0) {
      fetchUsers();
    }
  }, [allFeedbacks, dispatch]);


  const handleSubmitFeedback = () => {
    if (feedback.trim()) {
      const id = sessionStorage.getItem('userId');
      if (id) {
        let data: FeedbackType = { userId: Number(id), userFirstName: '', userLastName: '', content: feedback, createdAt: new Date() }
        dispatch(Add(data)).then((result: any) => {
          if (result.payload) {
            setFeedback("")
            setShowSuccess(true)
            setAllFeedbacks([{ ...result.payload }, ...(allFeedbacks || [])]);
          }
        })
      }
    }
  }
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
            <MessageSquare className="h-7 w-7 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold">Feedback & Communication</h1>
          <p className="text-gray-300">Share your thoughts and view system updates</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden mb-8">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4 text-white">Add Your Feedback</h3>
            <div className="space-y-4">
              <Textarea
                placeholder="Share your thoughts about the job recommendations or analysis..."
                className="bg-white/8 border-white/10 resize-none min-h-[100px] text-white"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <div className="flex justify-end">
                <Button
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-lg"
                  onClick={handleSubmitFeedback}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Feedback
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
        <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-6 text-white">Communication History</h3>
          </div>
          <div className="space-y-6">
            {allFeedbacks?.map((item) => (
              <div key={item.createdAt.toString()} className={`flex gap-4 p-4 rounded-lg`}>
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                  <AvatarFallback className="bg-purple-900">
                    {item.userFirstName?.charAt(0).toUpperCase()}{item.userLastName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-white">{item.userFirstName} {item.userLastName}</h4>
                    </div>
                    <span className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-gray-300 mt-2">{item.content}</p>
                </div>
              </div>
            ))}
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