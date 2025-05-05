import type React from "react"
import { Loader2, AlertCircle, X } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { UserType } from "@/types/UserType"

interface PersonalInfoFormProps {
  user: UserType | null
  isLoadingUser: boolean
  isSavingProfile: boolean
  profileError: string | null
  onUserChange: (updatedUser: UserType) => void
  onSaveProfile: (e: React.FormEvent) => void
  onClearProfileError: () => void
}

export function PersonalInfoForm({
  user,
  isLoadingUser,
  isSavingProfile,
  profileError,
  onUserChange,
  onSaveProfile,
  onClearProfileError,
}: PersonalInfoFormProps) {
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden mb-8">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4 text-white">Personal Information</h3>

        {profileError && (
          <Alert variant="destructive" className="bg-red-900/20 border-red-900/50 text-red-50 mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="ml-2">{profileError}</AlertDescription>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto h-5 w-5 p-0 text-red-50 hover:bg-red-900/30"
              onClick={onClearProfileError}
            >
              <X className="h-3 w-3" />
            </Button>
          </Alert>
        )}

        {isLoadingUser ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
          </div>
        ) : (
          <form onSubmit={onSaveProfile}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 text-gray-300">
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  id="first-name"
                  value={user?.firstName || ""}
                  onChange={(e) => {
                    if (user) {
                      onUserChange({ ...user, firstName: e.target.value })
                    }
                  }}
                  className="bg-white/5 border-white/10 focus-visible:ring-purple-500 text-white"
                  disabled={isSavingProfile}
                />
              </div>

              <div className="space-y-2 text-gray-300">
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  id="last-name"
                  value={user?.lastName || ""}
                  onChange={(e) => {
                    if (user) {
                      onUserChange({ ...user, lastName: e.target.value })
                    }
                  }}
                  className="bg-white/5 border-white/10 focus-visible:ring-purple-500 text-white"
                  disabled={isSavingProfile}
                />
              </div>

              <div className="space-y-2 text-gray-300">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ""}
                  onChange={(e) => {
                    if (user) {
                      onUserChange({ ...user, email: e.target.value })
                    }
                  }}
                  className="bg-white/5 border-white/10 focus-visible:ring-purple-500 text-white"
                  disabled={isSavingProfile}
                />
              </div>

              <div className="space-y-2 text-gray-300">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={user?.phone || ""}
                  onChange={(e) => {
                    if (user) {
                      onUserChange({ ...user, phone: e.target.value })
                    }
                  }}
                  className="bg-white/5 border-white/10 focus-visible:ring-purple-500 text-white"
                  disabled={isSavingProfile}
                />
              </div>

              <div className="space-y-2 md:col-span-2 text-gray-300">
                <Label htmlFor="profession">Current Profession</Label>
                <Input
                  id="profession"
                  value={user?.profession || ""}
                  onChange={(e) => {
                    if (user) {
                      onUserChange({ ...user, profession: e.target.value })
                    }
                  }}
                  className="bg-white/5 border-white/10 focus-visible:ring-purple-500 text-white"
                  disabled={isSavingProfile}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-lg"
                disabled={isSavingProfile}
              >
                {isSavingProfile ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </Card>
  )
}
