import { useState, useEffect, useRef } from "react"
import { AlertCircle, Loader2, ZoomIn, ZoomOut, RotateCw } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/Dialog"
import { Button } from "@/components/ui/Button"

interface ImagePreviewDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    file: File | null
    imageUrl?: string | null // Add support for direct image URLs
    title?: string
    description?: string
}

export function ImagePreviewDialog({
    open,
    onOpenChange,
    file,
    imageUrl: externalImageUrl, // Rename to avoid confusion with our state
    title = "Handwriting Sample",
    description = "Preview of your uploaded handwriting sample",
}: ImagePreviewDialogProps) {
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const cachedUrlRef = useRef<string | null>(null)

    // Add zoom and rotation controls
    const [zoomLevel, setZoomLevel] = useState(1)
    const [rotation, setRotation] = useState(0)

    useEffect(() => {
        if (open) {
            setIsLoading(true)
            setError(null)

            try {
                // First priority: use external image URL if provided
                if (externalImageUrl) {
                    setImageUrl(externalImageUrl)
                    cachedUrlRef.current = externalImageUrl
                    setIsLoading(false)
                    return
                }

                // Second priority: use cached URL if available
                if (cachedUrlRef.current) {
                    setImageUrl(cachedUrlRef.current)
                    setIsLoading(false)
                    return
                }

                // Third priority: create URL from file if available
                if (file) {
                    // Check if the file has actual content
                    if (file.size === 0) {
                        // For demo purposes, use a placeholder image instead
                        const placeholderUrl = "/placeholder.svg?height=400&width=600&text=Handwriting+Sample"
                        setImageUrl(placeholderUrl)
                        cachedUrlRef.current = placeholderUrl
                        setIsLoading(false)
                    } else {
                        // Create a URL for the file to display it
                        const url = URL.createObjectURL(file)
                        setImageUrl(url)
                        cachedUrlRef.current = url
                        setIsLoading(false)
                    }
                } else {
                    // No image source available
                    setError("No image source available")
                    setIsLoading(false)
                }
            } catch (err) {
                console.error("Error creating object URL:", err)
                setError("Failed to load image preview")
                setIsLoading(false)
            }
        }

        // Reset zoom and rotation when dialog opens
        if (open) {
            setZoomLevel(1)
            setRotation(0)
        }

        return () => {
            if (!open) {
                // Don't revoke the URL when just closing the dialog
                setIsLoading(false)
                setError(null)
            }
        }
    }, [file, externalImageUrl, open])

    // Add a cleanup function for component unmount
    useEffect(() => {
        return () => {
            // Only revoke blob URLs, not external URLs
            if (cachedUrlRef.current && cachedUrlRef.current.startsWith("blob:")) {
                URL.revokeObjectURL(cachedUrlRef.current)
                cachedUrlRef.current = null
            }
        }
    }, [])

    const handleZoomIn = () => {
        setZoomLevel((prev) => Math.min(prev + 0.25, 3))
    }

    const handleZoomOut = () => {
        setZoomLevel((prev) => Math.max(prev - 0.25, 0.5))
    }

    const handleRotate = () => {
        setRotation((prev) => (prev + 90) % 360)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[800px] md:max-w-[900px] border-white/10 bg-black/90  text-black w-[90vw] max-h-[90vh] overflow-y-auto">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-20 -z-10"></div>
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-bold text-white">{title}</DialogTitle>
                    </div>
                    <DialogDescription className="text-gray-400">{description}</DialogDescription>
                </DialogHeader>

                <div className="mt-4 relative rounded-lg overflow-hidden border border-white/10 bg-black/50">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-[300px] gap-3">
                            <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
                            <p className="text-gray-400">Loading image preview...</p>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center h-[300px] gap-3 text-red-400">
                            <AlertCircle className="h-8 w-8" />
                            <p>{error}</p>
                        </div>
                    ) : imageUrl ? (
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center p-2 overflow-hidden">
                                <img
                                    src={imageUrl || "/placeholder.svg"}
                                    alt="Handwriting Sample"
                                    className="max-w-full max-h-[60vh] object-contain rounded"
                                    style={{
                                        transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                                        transition: "transform 0.3s ease",
                                    }}
                                    onError={() => {
                                        setError("Failed to load image. The file may be corrupted or in an unsupported format.")
                                    }}
                                />
                            </div>

                            {/* Add image controls */}
                            <div className="flex items-center justify-center gap-2 mt-2 p-2 bg-black/30 rounded-lg">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-white/10 bg-white/5 hover:bg-white/10 text-black"
                                    onClick={handleZoomIn}
                                >
                                    <ZoomIn className="h-4 w-4 mr-1" />
                                    Zoom In
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-white/10 bg-white/5 hover:bg-white/10 text-black"
                                    onClick={handleZoomOut}
                                >
                                    <ZoomOut className="h-4 w-4 mr-1" />
                                    Zoom Out
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-white/10 bg-white/5 hover:bg-white/10 text-black"
                                    onClick={handleRotate}
                                >
                                    <RotateCw className="h-4 w-4 mr-1" />
                                    Rotate
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-[300px]">
                            <p className="text-gray-400">No image to display</p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}