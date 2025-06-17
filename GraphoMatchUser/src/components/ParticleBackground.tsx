import { useEffect, useRef } from "react";

export function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const setCanvasDimensions = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        setCanvasDimensions();
        window.addEventListener("resize", setCanvasDimensions);

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;
            alpha: number;

            constructor() {
                this.x = Math.random() * (canvas?.width || 0);
                this.y = Math.random() * (canvas?.height || 0);
                this.size = Math.random() * 3 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;

                const colors = ["rgba(147, 51, 234, ", "rgba(219, 39, 119, ", "rgba(139, 92, 246, "];
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.alpha = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > (canvas?.width || 0) || this.x < 0) { this.speedX = -this.speedX; }
                if (this.y > (canvas?.height || 0) || this.y < 0) { this.speedY = -this.speedY; }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `${this.color}${this.alpha})`;
                ctx.fill();
            }
        }

        const particles: Particle[] = [];
        const particleCount = Math.min(100, (window.innerWidth * window.innerHeight) / 10000);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function connectParticles() {
            if (!ctx) return;
            const maxDistance = 150;

            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const opacity = 1 - distance / maxDistance;
                        const gradient = ctx.createLinearGradient(particles[a].x, particles[a].y, particles[b].x, particles[b].y);

                        gradient.addColorStop(0, `${particles[a].color}${opacity * 0.2})`);
                        gradient.addColorStop(1, `${particles[b].color}${opacity * 0.2})`);

                        ctx.beginPath();
                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        }

        function animate() {
            if (!ctx) return;
            ctx.clearRect(0, 0, (canvas?.width || 0), (canvas?.height || 0));
            for (const particle of particles) {
                particle.update();
                particle.draw();
            }
            connectParticles();
            requestAnimationFrame(animate);
        }
        animate();
        return () => {
            window.removeEventListener("resize", setCanvasDimensions);
        }
    }, [])
    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}