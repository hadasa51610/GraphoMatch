import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { BrainCircuit } from "lucide-react"

export function HandwritingAnimationLoader() {
    const [currentStage, setCurrentStage] = useState(0)
    const [inkDrops, setInkDrops] = useState<any[]>([])
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isCanvasReady, setIsCanvasReady] = useState(false)

    // Stages of the animation
    const stages = [
        { name: "Handwriting Analysis", duration: 6000 },
        { name: "Personality Traits", duration: 6000 },
        { name: "Career Matching", duration: 6000 },
        { name: "Finalizing Results", duration: 2000 },
    ]

    // Progress through stages
    useEffect(() => {
        if (currentStage >= stages.length) return

        const timer = setTimeout(() => {
            if (currentStage < stages.length - 1) {
                setCurrentStage(currentStage + 1)
            }
        }, stages[currentStage].duration)

        return () => clearTimeout(timer)
    }, [currentStage])   


    // Ink flow animation on canvas
    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set canvas dimensions
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
        setIsCanvasReady(true)

        // Create ink particles
        const particles: any[] = []
        const particleCount = 100

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 1,
                speedY: (Math.random() - 0.5) * 1,
                color: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 50 + 50}, ${Math.random() * 150 + 105}, ${Math.random() * 0.5 + 0.2
                    })`,
            })
        }

        // Create flowing lines
        const lines: any[] = []
        const lineCount = 15

        for (let i = 0; i < lineCount; i++) {
            const startX = Math.random() * canvas.width
            const startY = Math.random() * canvas.height
            const length = Math.random() * 100 + 50
            const angle = Math.random() * Math.PI * 2
            const endX = startX + Math.cos(angle) * length
            const endY = startY + Math.sin(angle) * length

            lines.push({
                startX,
                startY,
                endX,
                endY,
                progress: 0,
                speed: Math.random() * 0.01 + 0.002,
                width: Math.random() * 2 + 0.5,
                color: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 50 + 50}, ${Math.random() * 150 + 105}, ${Math.random() * 0.5 + 0.3
                    })`,
            })
        }

        // Animation loop
        let animationFrameId: number
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Draw particles
            particles.forEach((particle, index) => {
                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
                ctx.fillStyle = particle.color
                ctx.fill()

                // Update position
                particle.x += particle.speedX
                particle.y += particle.speedY

                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

                particles[index] = particle
            })

            // Draw flowing lines
            lines.forEach((line, index) => {
                if (line.progress < 1) {
                    const currentX = line.startX + (line.endX - line.startX) * line.progress
                    const currentY = line.startY + (line.endY - line.startY) * line.progress

                    ctx.beginPath()
                    ctx.moveTo(line.startX, line.startY)
                    ctx.lineTo(currentX, currentY)
                    ctx.strokeStyle = line.color
                    ctx.lineWidth = line.width
                    ctx.stroke()

                    line.progress += line.speed
                } else {
                    // Reset line with new position and direction
                    const startX = Math.random() * canvas.width
                    const startY = Math.random() * canvas.height
                    const length = Math.random() * 100 + 50
                    const angle = Math.random() * Math.PI * 2
                    const endX = startX + Math.cos(angle) * length
                    const endY = startY + Math.sin(angle) * length

                    lines[index] = {
                        startX,
                        startY,
                        endX,
                        endY,
                        progress: 0,
                        speed: Math.random() * 0.01 + 0.002,
                        width: Math.random() * 2 + 0.5,
                        color: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 50 + 50}, ${Math.random() * 150 + 105}, ${Math.random() * 0.5 + 0.3
                            })`,
                    }
                }
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    // Fade out ink drops over time
    useEffect(() => {
        if (inkDrops.length === 0) return

        const fadeInterval = setInterval(() => {
            setInkDrops((prev) =>
                prev
                    .map((drop) => ({
                        ...drop,
                        opacity: drop.opacity - 0.05,
                    }))
                    .filter((drop) => drop.opacity > 0),
            )
        }, 100)

        return () => clearInterval(fadeInterval)
    }, [inkDrops])

    return (
        <div className="max-w-5xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-6 mb-10"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-70"></div>
                    <div className="relative bg-black rounded-full p-3">
                        <BrainCircuit className="h-8 w-8 text-white" />
                    </div>
                </div>
                <div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                        Handwriting Analysis
                    </h1>
                    <p className="text-gray-400 mt-1">Discovering your unique potential...</p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden rounded-xl">
                    <div className="p-8 h-full flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-1 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                            <h3 className="text-xl font-bold">Handwriting Visualization</h3>
                        </div>

                        <div className="flex-1 relative">
                            <canvas
                                ref={canvasRef}
                                className={`w-full h-full rounded-lg ${isCanvasReady ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}
                            />

                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-center">
                                    <div className="text-4xl font-handwriting text-white opacity-50">
                                        {currentStage === 0 && "Analyzing..."}
                                        {currentStage === 1 && "Discovering..."}
                                        {currentStage === 2 && "Matching..."}
                                        {currentStage === 3 && "Completing..."}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden rounded-xl">
                <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="h-1 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                            <h3 className="text-xl font-bold">Analysis Progress</h3>
                        </div>
                        <div className="text-sm text-gray-400">
                            Stage {currentStage + 1} of {stages.length}
                        </div>
                    </div>

                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                            initial={{ width: "0%" }}
                            animate={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        ></motion.div>
                    </div>

                    <div className="mt-6 flex justify-between">
                        {stages.map((stage, index) => (
                            <div
                                key={index}
                                className={`text-xs ${index <= currentStage ? "text-white" : "text-gray-500"
                                    } transition-colors duration-300`}
                            >
                                {stage.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
