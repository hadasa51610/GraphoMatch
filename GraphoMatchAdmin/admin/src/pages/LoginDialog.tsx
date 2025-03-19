import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/Dialog"
import { ArrowRight, Lock, Mail, Loader2 } from "lucide-react"
import { UserLoginType } from "@/types/UserLoginType"
import { AppDispatch } from "@/store/store"
import { useDispatch } from "react-redux"
import { Login } from "@/store/authSlice"
import { Link} from 'react-router'

interface LoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const LoginDialog=({ open, onOpenChange }: LoginDialogProps) =>{
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const handleSubmit = (e: React.FormEvent,data:UserLoginType) => {
    e.preventDefault()
    setIsLoading(true)
    dispatch(Login(data)); 
        setTimeout(() => {
      setIsLoading(false);
      onOpenChange(false);
      <Link to="/dashboard"/>
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] border-white/10 bg-black/90 backdrop-blur-xl text-black">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-20 -z-10"></div>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Welcome Back
          </DialogTitle>
          <DialogDescription className="text-gray-400">
          Login to access your GraphoMatch account          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e)=>{handleSubmit(e,{email:email,password:password})}}>
          <div className="grid gap-5 py-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-300"> Email</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-5 flex items-center pl-3 pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-500" />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-purple-500"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-gray-300"> Password </Label>
                <a href="#" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-500" />
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white focus-visible:ring-purple-500"
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  Login to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}