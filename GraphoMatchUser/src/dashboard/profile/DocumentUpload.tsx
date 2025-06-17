import type React from "react"
import { Upload, Check, AlertCircle, Loader2, X, ImageIcon, Trash2, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Alert, AlertDescription } from "@/components/ui/Alert"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface DocumentUploadProps {
  handwritingFile: File | null
  handwritingImageUrl?: string | null
  isUploadingHandwriting: boolean
  isDeletingHandwriting: boolean
  handwritingError: string | null
  onHandwritingUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onHandwritingDelete: () => void
  onClearHandwritingError: () => void
  onImagePreview: () => void
  onSubmitForAnalysis: () => void
}

const FloatingParticle = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute w-1 h-1 bg-purple-400 rounded-full"
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: [0, Math.random() * 100 - 50],
      y: [0, Math.random() * 100 - 50],
    }}
    transition={{
      duration: 2,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: Math.random() * 2,
    }}
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  />
)

export function DocumentUpload({
  handwritingFile,
  handwritingImageUrl,
  isUploadingHandwriting,
  isDeletingHandwriting,
  handwritingError,
  onHandwritingUpload,
  onHandwritingDelete,
  onClearHandwritingError,
  onImagePreview,
  onSubmitForAnalysis,
}: DocumentUploadProps) {
  const hasHandwritingSample = !!handwritingFile || !!handwritingImageUrl
  const isProcessing = isUploadingHandwriting || isDeletingHandwriting

  const [completedSteps, setCompletedSteps] = useState<Array<{ id: number; message: string }>>([])
  const [uploadProgress, setUploadProgress] = useState(0)

  const uploadSteps = [
    "Document security verified ✓",
    "Cloud storage allocated ✓",
    "File integrity confirmed ✓",
    "Upload stream established ✓",
  ]

  useEffect(() => {
    if (isUploadingHandwriting) {
      setCompletedSteps([])
      setUploadProgress(0)

      const totalDuration = 120000 
      const progressInterval = totalDuration / 100

      const progressTimer = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressTimer)
            return 100
          }
          return prev + 1
        })
      }, progressInterval)

      const messageTimings = [
        Math.random() * 30000 + 15000, 
        Math.random() * 40000 + 45000, 
        Math.random() * 30000 + 85000, 
        Math.random() * 20000 + 115000, 
      ]

      messageTimings.forEach((timing, index) => {
        if (index < uploadSteps.length) {
          setTimeout(() => {
            setCompletedSteps((prev) => [
              ...prev,
              {
                id: Date.now() + index,
                message: uploadSteps[index],
              },
            ])
          }, timing)
        }
      })

      return () => {
        clearInterval(progressTimer)
      }
    }
  }, [isUploadingHandwriting])

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4 text-white">Document Upload</h3>
        <p className="text-gray-400 mb-6">
          Upload your handwriting sample for analysis. The handwriting sample should be at least one paragraph written
          on unlined paper.
        </p>

        <div className="space-y-6">
          <div className="border border-dashed border-white/20 rounded-lg p-6 bg-white/5 relative overflow-hidden">
            {handwritingError && (
              <Alert variant="destructive" className="bg-red-900/20 border-red-900/50 text-red-50 mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="ml-2">{handwritingError}</AlertDescription>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto h-5 w-5 p-0 text-red-50 hover:bg-red-900/30"
                  onClick={onClearHandwritingError}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Alert>
            )}

            <div className="flex flex-col items-center justify-center text-center">
              {isUploadingHandwriting ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full max-w-md space-y-6"
                >
                  <div className="relative w-full h-48 mb-6">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-2xl blur-xl"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="relative w-32 h-32"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <motion.div
                          className="absolute inset-0 border-2 border-purple-500/30 rounded-full"
                          animate={{
                            scale: [1, 1.2, 1],
                            borderColor: [
                              "rgba(168, 85, 247, 0.3)",
                              "rgba(236, 72, 153, 0.3)",
                              "rgba(59, 130, 246, 0.3)",
                              "rgba(168, 85, 247, 0.3)",
                            ],
                          }}
                          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
                        />

                        <motion.div
                          className="absolute inset-4 border-2 border-pink-500/50 rounded-full"
                          animate={{ rotate: -360 }}
                          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />

                        <motion.div
                          className="absolute inset-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                          animate={{
                            scale: [1, 1.1, 1],
                            boxShadow: [
                              "0 0 20px rgba(168, 85, 247, 0.5)",
                              "0 0 40px rgba(236, 72, 153, 0.7)",
                              "0 0 20px rgba(168, 85, 247, 0.5)",
                            ],
                          }}
                          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          >
                            <Upload className="h-8 w-8 text-white" />
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </div>

                    {Array.from({ length: 15 }).map((_, i) => (
                      <FloatingParticle key={i} delay={i * 0.4} />
                    ))}

                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 bg-gradient-to-t from-transparent via-purple-400 to-transparent"
                        style={{
                          height: "60%",
                          left: `${15 + i * 12}%`,
                          top: "20%",
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          scaleY: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3,
                          delay: i * 0.8,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 2,
                        }}
                      />
                    ))}

                    <motion.div
                      className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                      animate={{
                        y: [0, 192, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />

                    <motion.div
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-8"
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="w-full h-full bg-gradient-to-t from-blue-500/20 to-transparent rounded-full blur-sm" />
                    </motion.div>
                  </div>

                  <div className="space-y-3 w-full min-h-[200px]">
                    {completedSteps.map((step) => (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -50, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30"
                      >
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                          className="p-2 rounded-full bg-green-500/30"
                        >
                          <Check className="h-5 w-5 text-green-300" />
                        </motion.div>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="text-green-200 font-medium"
                        >
                          {step.message}
                        </motion.span>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: [0, 1.2, 1] }}
                          transition={{ delay: 0.7, duration: 0.5 }}
                          className="ml-auto"
                        >
                          <Sparkles className="h-4 w-4 text-green-400" />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="w-full bg-white/10 rounded-full h-3 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 relative"
                      animate={{
                        width: `${uploadProgress}%`,
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        width: { duration: 1, ease: "easeOut" },
                        backgroundPosition: { duration: 3, repeat: Number.POSITIVE_INFINITY },
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="text-center space-y-2"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <p className="text-lg text-gray-300 font-medium">Uploading to cloud storage...</p>
                    <p className="text-sm text-gray-400">
                      {uploadProgress < 30
                        ? "Preparing your document..."
                        : uploadProgress < 70
                          ? "Transferring to secure servers..."
                          : "Finalizing upload..."}
                    </p>
                  </motion.div>
                </motion.div>
              ) : isDeletingHandwriting ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 text-gray-400"
                >
                  <div className="relative w-32 h-32">
                    <motion.div
                      className="absolute inset-0 border-4 border-red-500/30 rounded-full"
                      animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                        scale: { duration: 1, repeat: Number.POSITIVE_INFINITY },
                      }}
                    />
                    <motion.div
                      className="absolute inset-4 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center"
                      animate={{
                        scale: [1, 0.9, 1],
                      }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Trash2 className="h-8 w-8 text-white" />
                    </motion.div>
                  </div>
                  <span className="text-sm font-medium text-gray-300">Deleting handwriting sample...</span>
                  <span className="text-xs text-gray-500">Removing from cloud storage</span>
                </motion.div>
              ) : hasHandwritingSample ? (
                <div className="space-y-4">
                  <motion.div
                    className="flex items-center gap-2 text-green-400 cursor-pointer hover:text-green-300 transition-colors bg-white/5 p-3 rounded-lg"
                    onClick={onImagePreview}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Check className="h-5 w-5" />
                    <span>{handwritingFile ? handwritingFile.name : "Cloud Image"}</span>
                    <span className="text-xs text-gray-400 ml-2 underline">Click to preview</span>
                  </motion.div>

                  <Button
                    onClick={onHandwritingDelete}
                    disabled={isProcessing}
                    size="sm"
                    className="bg-gradient-to-br from-gray-950 to-gray-950 hover:bg-red-500/30 text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-500/40 transition-colors"
                  >
                    {isDeletingHandwriting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Image
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <>
                  <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                  <h4 className="font-medium mb-1 text-white">Handwriting Sample</h4>
                  <p className="text-sm text-gray-400 mb-4">Upload a clear image of your handwriting (JPG, PNG)</p>

                  <Label
                    htmlFor="handwriting-upload"
                    className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors font-medium"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Upload Handwriting</span>
                  </Label>
                </>
              )}

              <Input
                id="handwriting-upload"
                type="file"
                accept=".jpg,.jpeg,.png"
                className="hidden"
                onChange={onHandwritingUpload}
                disabled={isProcessing}
              />
            </div>
          </div>

          {!hasHandwritingSample ? (
            <div className="flex items-start gap-3 bg-yellow-500/10 text-yellow-400 p-4 rounded-lg">
              <AlertCircle className="h-5 w-5 mt-0.5" />
              <div>
                <p className="font-medium">Document Required</p>
                <p className="text-sm">Your handwriting sample is needed for a complete analysis.</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-end">
              <Button
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-lg"
                onClick={onSubmitForAnalysis}
                disabled={isProcessing}
              >
                Submit for Analysis
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
