import { useState, useEffect } from "react"
import { useLocation, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { PenLine, User, BrainCircuit, Briefcase, MessageSquare, LogOut, Bell } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { ParticleBackground } from "@/components/ParticleBackground"
import { Outlet } from "react-router"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store"
import { UserType } from "@/types/UserType"
import { GetUser } from "@/store/slices/userSlice"


const DashboardLayout = () => {
  const [scrolled, setScrolled] = useState(false)
  const [notifications,] = useState(3)
  const { pathname } = useLocation()
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<UserType | null>(null);


  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      dispatch(GetUser(Number(userId))).then((result: any) => {
        if (result.payload) {
          setUser(result.payload as UserType);
        }
      });
    }
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Profile", href: "profile", icon: User },
    { name: "Analysis", href: "analysis", icon: BrainCircuit },
    { name: "Jobs", href: "jobs", icon: Briefcase },
    { name: "Feedback", href: "feedback", icon: MessageSquare },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <ParticleBackground />
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

          <nav className="md:flex items-center gap-6">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;
              return (
                <div key={item.name || index}>
                  <Link
                    to={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full transition-colors ${isActive ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Button variant="ghost" size="icon" className="text-black hover:bg-white/10 rounded-full relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold">
                    {notifications}
                  </span>
                )}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Avatar className="h-9 w-9 border-2 border-purple-500">
                <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
                <AvatarFallback className="bg-purple-900 text-white">{user?.firstName.charAt(0).toUpperCase()}{user?.lastName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="md:block">
                <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-gray-400">{user?.profession}</p>
              </div>
            </div>

            <Link to="/">
              <Button variant="ghost" size="icon" className="text-black hover:bg-white/10 rounded-full"
              onClick={() => {
                sessionStorage.removeItem('userId');
                sessionStorage.removeItem('auth_token');
                sessionStorage.removeItem('analysisVisited')
              }}>
                <LogOut className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20 container mx-auto px-4">
        <Outlet />
      </main>
    </div>
  )
}
export default DashboardLayout;