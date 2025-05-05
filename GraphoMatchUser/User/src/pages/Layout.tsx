import "@/App.css"
import Footer from "@/components/Footer"
import { PenLine } from "lucide-react"
import { Outlet } from "react-router-dom"


export const metadata = {
  title: "GraphoMatch - Handwriting Analysis for Career Matching",
  description: "Professional platform for graphologists to analyze handwriting and provide career guidance",
  // link: <PenLine/>,
}
// useEffect(() => {
//   const handleScroll = () => {
//     setScrolled(window.scrollY > 50)
//   }
//   window.addEventListener("scroll", handleScroll)
//   return () => window.removeEventListener("scroll", handleScroll)
// }, [])

export default function RootLayout() {
  return (
    <>
      <div className="w-screen min-h-screen bg-black text-white overflow-hidden">
        <Outlet />
        <Footer />
      </div>
    </>
  )
}

