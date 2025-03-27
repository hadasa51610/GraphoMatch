import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, FileText, BrainCircuit, ChevronRight, Fingerprint, Section } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { LoginDialog } from "@/pages/LoginDialog"
import { RegisterDialog } from "./RegisterDialog"
import { ParticleBackground } from "@/components/ParticleBackground"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Outlet } from "react-router-dom"


export default function Home() {
    const [loginOpen, setLoginOpen] = useState(false)
    const [registerOpen, setRegisterOpen] = useState(false)

    return (
        <div className="w-screen min-h-screen bg-black text-white overflow-hidden">
            <ParticleBackground />
            <Header/>
            <main className="relative pt-32 pb-20">
                <section className="container mx-auto px-4 mb-32">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex justify-center mb-8"
                        >
                            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 backdrop-blur-lg border border-white/10">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                                </span>
                                <span className="text-gray-300 font-medium text-sm">Job Matching Platform</span>
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-5xl md:text-7xl font-bold text-center leading-tight mb-6"
                        >
                            <span className="block">Find Your Perfect</span>
                            <span className="block mt-2">
                                Career Through{" "}
                                <span className="relative">
                                    <span className="absolute -inset-1 blur-xl bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 opacity-30 rounded-lg"></span>
                                    <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                                        Handwriting
                                    </span>
                                </span>
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-xl text-gray-300 max-w-3xl mx-auto text-center mb-10"
                        >
                            Welcome to GraphoMatch, where handwriting analysis and AI technology combine to match you with your ideal
                            career opportunities.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                        >
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 h-14 px-8 rounded-full group"
                                onClick={() => setLoginOpen(true)}
                            >
                                <span>Get Started</span>
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="text-black border-white/20 bg-white/5 hover:bg-white/10 h-14 px-8 rounded-full backdrop-blur-sm"
                                onClick={() => setLoginOpen(true)}
                            >Login to Account
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="relative mx-auto"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-30"></div>
                            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
                                <div className="p-1">
                                    <img
                                        src="picture2.png"
                                        alt="GraphoMatch Dashboard Preview"
                                        className="w-full h-auto rounded-xl object-cover"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section className="container mx-auto px-4 mb-32">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                Our unique approach to job matching combines handwriting analysis with your resume                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="relative h-full">
                                    <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative h-full rounded-2xl p-6 bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden group-hover:border-white/20 transition-all">
                                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
                                        <div className="relative">
                                            <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                <FileText className="h-7 w-7 text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-3">Upload Documents</h3>
                                            <p className="text-gray-300 mb-6">
                                                Submit your resume and a handwriting sample to our secure platform                                            </p>
                                            <div className="mt-auto pt-4">
                                                <a href="#"
                                                    className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
                                                >
                                                    <span>Learn more</span>
                                                    <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="relative h-full">
                                    <div className="absolute -inset-0.5 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative h-full rounded-2xl p-6 bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden group-hover:border-white/20 transition-all">
                                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-full blur-xl"></div>
                                        <div className="relative">
                                            <div className="bg-gradient-to-br from-pink-500 to-red-500 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                <BrainCircuit className="h-7 w-7 text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-3">AI Analysis</h3>
                                            <p className="text-gray-300 mb-6">
                                                Our AI analyzes your handwriting to identify personality traits and career aptitudes                                            </p>
                                            <div className="mt-auto pt-4">
                                                <a href="#"
                                                    className="inline-flex items-center text-sm font-medium text-pink-400 hover:text-pink-300 transition-colors"
                                                >
                                                    <span>Learn more</span>
                                                    <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="relative h-full">
                                    <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative h-full rounded-2xl p-6 bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden group-hover:border-white/20 transition-all">
                                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
                                        <div className="relative">
                                            <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                <Fingerprint className="h-7 w-7 text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-3">Job Matching</h3>
                                            <p className="text-gray-300 mb-6">
                                                Receive personalized job recommendations based on your unique profile                                            </p>
                                            <div className="mt-auto pt-4">
                                                <a href="#"
                                                    className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                                                >
                                                    <span>Learn more</span>
                                                    <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-4 mb-20">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20"></div>
                            <div className="relative rounded-2xl p-8 md:p-12 bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden">
                                <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
                                <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
                                <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12">
                                    <div className="md:w-1/2">
                                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Perfect Job?</h2>
                                        <p className="text-gray-300 mb-6">
                                            Join thousands of job seekers who have discovered their ideal career path through GraphoMatch's
                                            innovative approach.
                                        </p>
                                        <Button
                                            size="lg"
                                            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-full group"
                                            onClick={() => setRegisterOpen(true)}
                                        >
                                            <span>Get Started Now</span>
                                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </div>
                                    <div className="md:w-1/2 flex justify-center">
                                        <div className="relative">
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-50"></div>
                                            <div className="relative rounded-full p-1 bg-black/50 backdrop-blur-sm border border-white/10">
                                                <img
                                                    src="/placeholder.svg?height=300&width=300"
                                                    alt="Job seeker success"
                                                    className="w-64 h-64 rounded-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
            <RegisterDialog open={registerOpen} onOpenChange={setRegisterOpen} />
        </div>
    )
}