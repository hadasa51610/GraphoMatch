import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { User, AlertCircle, X } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/store/store"
import { GetUser, Update } from "@/store/slices/userSlice"
import type { UserType } from "@/types/UserType"
import { SuccessNotification } from "@/components/SuccessNotification"
import { AddFile, GetFiles } from "@/store/slices/fileSlice"
import { ImagePreviewDialog } from "@/components/ImagePreview"
import { UserProfileCard } from "@/dashboard/profile/UserProfile"
import { PersonalInfoForm } from "@/dashboard/profile/PersonalInfoForm"
import { DocumentUpload } from "@/dashboard/profile/DocumentUpload"
import { useNavigate } from "react-router-dom"

export default function ProfilePage() {
  const [handwritingFile, setHandwritingFile] = useState<File | null>(null)
  const [handwritingImageUrl, setHandwritingImageUrl] = useState<string | null>(null)
  const router = useNavigate()

  const [previousUser, setPreviousUser] = useState<UserType | null>(null)
  const [previousHandwritingFile, setPreviousHandwritingFile] = useState<File | null>(null)

  const [isLoadingUser, setIsLoadingUser] = useState(false)
  const [isUploadingHandwriting, setIsUploadingHandwriting] = useState(false)
  const [isSavingProfile, setIsSavingProfile] = useState(false)

  const [userError, setUserError] = useState<string | null>(null)
  const [handwritingError, setHandwritingError] = useState<string | null>(null)
  const [profileError, setProfileError] = useState<string | null>(null)

  const dispatch = useDispatch<AppDispatch>()
  const [user, setUser] = useState<UserType | null>(null)
  const [showProfileSuccess, setShowProfileSuccess] = useState(false)

  // Always show the preview dialog when an image is available
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  // Initial data loading
  useEffect(() => {
    const userId = sessionStorage.getItem("userId")
    if(!userId) {
      router("/")
    }
    if (userId) {
      setIsLoadingUser(true)
      setUserError(null)

      dispatch(GetUser(Number(userId)))
        .then((result: any) => {
          if (result.payload) {
            setUser(result.payload as UserType)
            setPreviousUser(result.payload as UserType)
          } else {
            setUserError("Failed to load user data")
          }
        })
        .catch((error) => {
          setUserError(error.message || "Failed to load user data")
        })
        .finally(() => {
          setIsLoadingUser(false)
        })
    }
  }, [dispatch])

  // Load files
  useEffect(() => {
    const userId = sessionStorage.getItem("userId")
    if(!userId) {
      router("/")
    }
    if (userId) {
      dispatch(GetFiles(Number(userId)))
        .then((result: any) => {
          if (result.payload) {
            console.log("Files loaded:", result.payload)

            result.payload.forEach((item: any) => {
              if (item.type === "image") {
                // Set the image URL directly from the payload
                setHandwritingImageUrl(item.url)

                // Also create a file object for compatibility
                const file = new File([], item.fileName)
                setHandwritingFile(file)
                setPreviousHandwritingFile(file)
              }
            })
          }
        })
        .catch((error) => {
          console.error("Failed to load files:", error)
        })
    }
  }, [dispatch])

  const handleHandwritingUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const uploadedFile = e.target.files[0]
      const userId = sessionStorage.getItem("userId")
      if(!userId) {
        router("/")
      }
      if (userId) {
        // Save previous state for rollback
        setPreviousHandwritingFile(handwritingFile)
        const previousUrl = handwritingImageUrl

        // Update UI immediately for better UX
        setHandwritingFile(uploadedFile)
        setIsUploadingHandwriting(true)
        setHandwritingError(null)

        dispatch(AddFile({ data: uploadedFile, userId: Number(userId) }))
          .then((result: any) => {
            if (result.payload) {
              // Extract the URL from the response
              const fileData = result.payload
              if (fileData.url) {
                setHandwritingImageUrl(fileData.url)
                // Open the preview dialog when a new image is uploaded
                setIsPreviewOpen(true)
              }
            } else {
              // Rollback on failure
              setHandwritingFile(previousHandwritingFile)
              setHandwritingImageUrl(previousUrl)
              setHandwritingError("Failed to upload handwriting sample")
            }
          })
          .catch((error) => {
            // Rollback on error
            setHandwritingFile(previousHandwritingFile)
            setHandwritingImageUrl(previousUrl)
            setHandwritingError(error.message || "Failed to upload handwriting sample")
          })
          .finally(() => {
            setIsUploadingHandwriting(false)
          })
      }
    }
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()

    if (user) {
      const userId = sessionStorage.getItem("userId")
      if(!userId) {
        router("/")
      }
      if (userId) {
        // Save previous state for rollback
        setPreviousUser({ ...user })

        setIsSavingProfile(true)
        setProfileError(null)

        dispatch(Update({ data: user, userId: Number(userId) }))
          .then((result: any) => {
            if (result.payload) {
              setUser(result.payload as UserType)
              setShowProfileSuccess(true)
            } else {
              // Rollback on failure
              setUser(previousUser)
              setProfileError("Failed to update profile")
            }
          })
          .catch((error) => {
            // Rollback on error
            setUser(previousUser)
            setProfileError(error.message || "Failed to update profile")
          })
          .finally(() => {
            setIsSavingProfile(false)
          })
      }
    }
  }

  const handleSubmitForAnalysis = () => {
    if (!handwritingFile && !handwritingImageUrl) {
      return
    }
    router("/dashboard/analysis")
  }

  // This function now just ensures the dialog is open
  const handleImagePreview = () => {
    setIsPreviewOpen(true)
  }

  // Function to close the dialog (though we'll keep it open by default)
  const handleClosePreview = () => {
    setIsPreviewOpen(false)
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
            <User className="h-7 w-7 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <p className="text-gray-400">Manage your information and document</p>
        </div>
      </motion.div>

      {userError && (
        <Alert variant="destructive" className="bg-red-900/20 border-red-900/50 text-red-50 mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="ml-2">{userError}</AlertDescription>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto h-5 w-5 p-0 text-red-50 hover:bg-red-900/30"
            onClick={() => setUserError(null)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-1"
        >
          <UserProfileCard
            user={user}
            isLoadingUser={isLoadingUser}
            handwritingFile={handwritingFile || (handwritingImageUrl ? new File([], "cloud-image.jpg") : null)}
            handwritingImageUrl={handwritingImageUrl}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-2"
        >
          <PersonalInfoForm
            user={user}
            isLoadingUser={isLoadingUser}
            isSavingProfile={isSavingProfile}
            profileError={profileError}
            onUserChange={setUser}
            onSaveProfile={handleSaveProfile}
            onClearProfileError={() => setProfileError(null)}
          />

          <DocumentUpload
            handwritingFile={handwritingFile}
            handwritingImageUrl={handwritingImageUrl}
            isUploadingHandwriting={isUploadingHandwriting}
            handwritingError={handwritingError}
            onHandwritingUpload={handleHandwritingUpload}
            onClearHandwritingError={() => setHandwritingError(null)}
            onImagePreview={handleImagePreview}
            onSubmitForAnalysis={handleSubmitForAnalysis}
          />
        </motion.div>
      </div>

      <SuccessNotification
        show={showProfileSuccess}
        onClose={() => setShowProfileSuccess(false)}
        title="Profile Updated!"
        message="Your profile information has been successfully updated. The changes will be reflected across your account."
        color="purple"
      />
      <ImagePreviewDialog
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
         imageUrl={handwritingImageUrl || ""}
      />
    </div>
  )
}
