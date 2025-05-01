import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { Button } from "@/components/ui/Button"
import { Slider } from "@/components/ui/slider"
import { RotateCcw, RotateCw, ZoomIn, ZoomOut } from "lucide-react"

interface ImagePreviewDialogProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  title?: string
}

export function ImagePreviewDialog({ isOpen, onClose, imageUrl, title = "Image Preview" }: ImagePreviewDialogProps) {
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const dialogContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setZoom(1)
      setRotation(0)
    }
  }, [isOpen])


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        ref={dialogContentRef}
        className="max-w-4xl w-full bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl p-0 overflow-hidden"
        style={{ maxHeight: "90vh" }}
      >
        <DialogHeader className="p-4 flex flex-row items-center justify-between border-b border-white/10">
          <DialogTitle className="text-white">{title}</DialogTitle>
        </DialogHeader>

        <div
          className="relative overflow-auto p-6 flex-1 flex items-center justify-center"
          style={{ height: "calc(90vh - 180px)" }}
        >
          <div
            className="relative transition-transform duration-200 ease-in-out"
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
              maxHeight: "100%",
              maxWidth: "100%",
            }}
          >
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="p-4 border-t border-white/10 bg-black/30">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                  className="h-8 w-8 border-white/10 bg-white/5 text-black"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <div className="w-32">
                  <Slider
                    value={[zoom * 100]}
                    min={50}
                    max={200}
                    step={10}
                    onValueChange={(value) => setZoom(value[0] / 100)}
                    className="w-full"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                  className="h-8 w-8 border-white/10 bg-white/5 text-black"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <span className="text-xs text-white ml-2">{Math.round(zoom * 100)}%</span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setRotation((rotation - 90) % 360)}
                  className="h-8 w-8 border-white/10 bg-white/5 text-black"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setRotation((rotation + 90) % 360)}
                  className="h-8 w-8 border-white/10 bg-white/5 text-black"
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
                <span className="text-xs text-white ml-2">{rotation}°</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
