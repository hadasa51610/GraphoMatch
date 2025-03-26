import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, X } from "lucide-react"

interface SuccessNotificationProps {
  show: boolean
  onClose: () => void
  title?: string
  message?: string
  color?: "green" | "purple" | "blue"
  duration?: number
}

export function SuccessNotification({
  show,
  onClose,
  title = "Success!",
  message = "Your action has been completed successfully.",
  color = "green",
  duration = 5000,
}: SuccessNotificationProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [show, onClose, duration])

  const gradients = {
    green: {
      bg: "from-green-400 to-emerald-500",
      text: "from-green-400 to-emerald-500",
    },
    purple: {
      bg: "from-purple-400 to-pink-500",
      text: "from-purple-400 to-pink-500",
    },
    blue: {
      bg: "from-blue-400 to-indigo-500",
      text: "from-blue-400 to-indigo-500",
    },
  }

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-md w-full overflow-hidden"
          >
            <div
              className={`absolute -inset-0.5 bg-gradient-to-r ${gradients[color].bg} rounded-2xl blur opacity-30`}
            ></div>
            <div className="relative bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl">
              <div className="absolute top-3 right-3">
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${gradients[color].bg} rounded-full blur-md opacity-70`}
                  ></div>
                  <div className={`relative bg-gradient-to-r ${gradients[color].bg} rounded-full p-3`}>
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                </div>

                <h3
                  className={`text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${gradients[color].text}`}
                >
                  {title}
                </h3>

                <p className="text-gray-300 mb-4">{message}</p>

                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: duration / 1000, ease: "linear" }}
                  className={`h-1 bg-gradient-to-r ${gradients[color].bg} rounded-full self-start`}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

