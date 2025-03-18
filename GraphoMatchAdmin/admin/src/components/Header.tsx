import { motion } from "framer-motion";
import { PenLine } from "lucide-react";
import { Button } from "./ui/Button";
import { useEffect, useState } from "react";

const Header = () => {
    const [scrolled, setScrolled] = useState(false)
    const [, setRegisterOpen] = useState(false)
    const [, setLoginOpen] = useState(false)

      useEffect(() => {
            const handleScroll = () => {
                setScrolled(window.scrollY > 50)
            }
            window.addEventListener("scroll", handleScroll)
            return () => window.removeEventListener("scroll", handleScroll)
        }, [])

    return (<>
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-6"}`}
        >
            <div className="container mx-auto flex items-center justify-between px-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-70"></div>
                        <div className="relative bg-black rounded-full p-2">
                            <PenLine className="h-7 w-7 text-white" />
                        </div>
                    </div>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                        GraphoMatch
                    </span>
                </motion.div>

                <nav className="hidden md:flex items-center gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">  About </a>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">  Features </a>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors"> Contact </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex items-center gap-3 ml-4"
                    >
                        <Button
                            variant="ghost"
                            className="text-white hover:bg-white/10 rounded-full"
                            onClick={() => setLoginOpen(true)}
                        >  Login
                        </Button>
                        <Button
                            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-full"
                            onClick={() => setRegisterOpen(true)}
                        >  Register
                        </Button>
                    </motion.div>
                </nav>

                <div className="md:hidden">
                    <Button variant="ghost" className="text-white hover:bg-white/10" onClick={() => setLoginOpen(true)}>
                        Login
                    </Button>
                </div>
            </div>
        </header>
    </>)
}
export default Header;