import { PenLine } from "lucide-react";

const Footer = () => {
    return (<>
        <footer className="relative bg-black/50 backdrop-blur-lg border-t border-white/5 py-10 z-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-2 mb-6 md:mb-0">
                        <div className="relative">
                            <PenLine className="h-6 w-6 text-gray-400" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                            GraphoMatch
                        </span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 mb-6 md:mb-0">
                        <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                            About
                        </a>
                        <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                            Features
                        </a>
                        <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                            Privacy
                        </a>
                        <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                            Terms
                        </a>
                        <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                            Contact
                        </a>
                    </div>

                    <div className="text-sm text-gray-500">© {new Date().getFullYear()} Hadasa Klirs. All rights reserved.</div>
                </div>
            </div>
        </footer>
    </>)
}
export default Footer;