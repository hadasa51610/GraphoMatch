import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/Dialog"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent } from "@/components/ui/Tabs"
import { MapPin, DollarSign, Loader2 } from "lucide-react"
import type { JobType } from "@/types/JobType"

interface JobProfileDialogProps {
    isOpen: boolean
    onClose: () => void
    job: JobType
    colorScheme: any
    onApply: () => void
    isApplying: boolean
    alreadyApplied: boolean
}

export function JobProfileDialog({
    isOpen,
    onClose,
    job,
    colorScheme,
    onApply,
    isApplying,
    alreadyApplied,
}: JobProfileDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-4xl bg-gradient-to-br from-gray-900 to-black border border-white/10 text-black p-0 overflow-hidden">
                <div className="relative">
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-gray-800 to-gray-900 overflow-hidden">
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-xl"></div>
                        </div>
                    </div>

                    <div className="relative pt-6 px-6">
                        <div className="flex items-start gap-4">
                            <Avatar
                                className={`h-16 w-16 border-2 ${colorScheme.border} bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg`}
                            >
                                <AvatarImage src={job.logo || "/placeholder.svg"} alt={job.company} />
                                <AvatarFallback className={`bg-gradient-to-br ${colorScheme.gradient} text-white text-lg`}>
                                    {job.company.substring(0, 2)}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                                <DialogTitle className="text-2xl font-bold text-white mb-1">{job.title}</DialogTitle>
                                <DialogDescription className="text-gray-300 text-base">{job.company}</DialogDescription>

                                <div className="flex items-center gap-2 mt-2">
                                    <Badge className={`${colorScheme.bg} ${colorScheme.text} border ${colorScheme.border}`}>
                                        {job.matchLevel} Match
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Tabs defaultValue="details" className="mt-6">
                        <TabsContent value="details" className="p-6 pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-2 space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-white">Job Description</h3>
                                        <p className="text-gray-300 text-sm leading-relaxed">{job.description}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <h3 className="text-lg font-semibold w-full mb-1 text-white">Skills & Technologies</h3>
                                        {job.tags.map((tag, index) => (
                                            <Badge key={index} variant="outline" className="bg-white/5 border-white/10 text-white">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4 bg-white/5 rounded-lg p-4 border border-white/10">
                                    <h3 className="text-lg font-semibold text-white">Job Overview</h3>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-full ${colorScheme.bg} ${colorScheme.border} border`}>
                                                <MapPin className="h-4 w-4 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Location</p>
                                                <p className="text-sm font-medium text-white">{job.location}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-full ${colorScheme.bg} ${colorScheme.border} border`}>
                                                <DollarSign className="h-4 w-4 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Salary Range</p>
                                                <p className="text-sm font-medium text-white">{job.salary}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator className="bg-white/10 my-4" />

                                    <Button
                                        onClick={onApply}
                                        disabled={isApplying || alreadyApplied}
                                        className={`w-full bg-gradient-to-r ${colorScheme.gradient} hover:brightness-110 text-white border-0 rounded-lg shadow-sm ${colorScheme.shadow} hover:shadow-md transition-all ${isApplying ? "opacity-80" : ""}`}
                                    >
                                        {isApplying ? (
                                            <>
                                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                Applying...
                                            </>
                                        ) : alreadyApplied ? (
                                            "Already Applied"
                                        ) : (
                                            "Apply Now"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    )
}