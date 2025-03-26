import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/Dialog"
import { ArrowRight, User, Mail, Lock, Loader2 } from "lucide-react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store"
import { Register } from "@/store/slices/authSlice"
import { Link, useNavigate } from 'react-router'
import { UserType } from "@/types/UserType"


interface RegisterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RegisterDialog({ open, onOpenChange }: RegisterDialogProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); 
  const [isLoading, setIsLoading] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [profession, setProfession] = useState("")


  const handleSubmit = (e: React.FormEvent, data: UserType) => {
    e.preventDefault()
    setIsLoading(true)
    dispatch(Register(data))
    setTimeout(() => {
      setIsLoading(false);
      onOpenChange(false);
      navigate('/dashboard')
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] border-white/10 bg-black/90 backdrop-blur-xl text-black">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-20 -z-10"></div>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Create Your Account
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Join GraphoMatch to find your perfect career match
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => handleSubmit(e, {
          firstName: firstName, lastName: lastName, email: email, password: password, phone: phone, profession: profession
        })}>
          <div className="grid gap-5 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name" className="text-sm font-medium text-gray-300"> First name </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="h-4 w-4 text-gray-500" />
                  </div>
                  <Input
                    id="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white focus-visible:ring-purple-500"
                    required
                  />
                </div>
              </div>
              <div
                className="bg-white/5 border-white/10 text-white focus-visible:ring-purple-500">
                <Label htmlFor="last-name" className="text-sm font-medium text-gray-300"> Last name </Label>
                <Input
                  id="last-name"
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-white/5 border-white/10 text-white focus-visible:ring-purple-500"
                  required
                />
              </div>
            </div>
            <div className="bg-white/5 border-white/10 text-white focus-visible:ring-purple-500">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-300">Phone</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-white/5 border-white/10 text-white focus-visible:ring-purple-500"
                required
              />
            </div>

            <div className="bg-white/5 border-white/10 text-white focus-visible:ring-purple-500">
              <Label htmlFor="profession" className="text-sm font-medium text-gray-300">Current Profession</Label>
              <Input
                id="profession"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="bg-white/5 border-white/10 text-white focus-visible:ring-purple-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-300"> Email </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-500" />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="graphologist@example.com"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-purple-500"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-300"> Password </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-500" />
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white focus-visible:ring-purple-500"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-300"> Confirm Password </Label>
              <Input
                id="confirm-password"
                type="password"
                className="bg-white/5 border-white/10 text-white focus-visible:ring-purple-500"
                required
              />
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
                    Processing...
                  </>
                ) : (
                  <>
                    Complete Registration
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}