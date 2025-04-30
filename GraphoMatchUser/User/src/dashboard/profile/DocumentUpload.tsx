import type React from "react"

import { FileText, Upload, Check, AlertCircle, Loader2, X, ImageIcon } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface DocumentUploadProps {
    resumeFile: File | null
    handwritingFile: File | null
    handwritingImageUrl?: string | null
    isUploadingResume: boolean
    isUploadingHandwriting: boolean
    resumeError: string | null
    handwritingError: string | null
    onResumeUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
    onHandwritingUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
    onClearResumeError: () => void
    onClearHandwritingError: () => void
    onImagePreview: () => void
    onSubmitForAnalysis: () => void
}

export function DocumentUpload({
    resumeFile,
    handwritingFile,
    handwritingImageUrl,
    isUploadingResume,
    isUploadingHandwriting,
    resumeError,
    handwritingError,
    onResumeUpload,
    onHandwritingUpload,
    onClearResumeError,
    onClearHandwritingError,
    onImagePreview,
    onSubmitForAnalysis,
}: DocumentUploadProps) {
    const hasHandwritingSample = !!handwritingFile || !!handwritingImageUrl

    return (
        <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden">
            <div className="p-6">
                <h3 className="text-xl font-bold mb-4 text-white">Document Upload</h3>
                <p className="text-gray-400 mb-6">
                    Upload your resume and a handwriting sample for analysis. The handwriting sample should be at least one
                    paragraph written on unlined paper.
                </p>

                <div className="space-y-6">
                    <div className="border border-dashed border-white/20 rounded-lg p-6 bg-white/5">
                        {resumeError && (
                            <Alert variant="destructive" className="bg-red-900/20 border-red-900/50 text-red-50 mb-4">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription className="ml-2">{resumeError}</AlertDescription>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="ml-auto h-5 w-5 p-0 text-red-50 hover:bg-red-900/30"
                                    onClick={onClearResumeError}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </Alert>
                        )}

                        <div className="flex flex-col items-center justify-center text-center">
                            {isUploadingResume ? (
                                <div className="flex flex-col items-center gap-2 text-gray-400">
                                    <Loader2 className="h-10 w-10 animate-spin mb-2" />
                                    <span>Uploading resume...</span>
                                </div>
                            ) : resumeFile ? (
                                <div className="flex items-center gap-2 text-green-400">
                                    <Check className="h-5 w-5" />
                                    <span>{resumeFile.name}</span>
                                </div>
                            ) : (
                                <>
                                    <FileText className="h-10 w-10 text-gray-400 mb-2" />
                                    <h4 className="font-medium mb-1 text-white">Resume</h4>
                                    <p className="text-sm text-gray-400 mb-4">Upload your CV or resume (PDF, DOCX)</p>
                                </>
                            )}

                            <Label
                                htmlFor="resume-upload"
                                className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg ${isUploadingResume
                                    ? "bg-white/5 text-gray-400 cursor-not-allowed"
                                    : resumeFile
                                        ? "bg-white/10 hover:bg-white/20 text-white"
                                        : "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                                    }`}
                            >
                                {isUploadingResume ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4" />}
                                <span>{resumeFile ? "Change File" : "Upload Resume"}</span>
                            </Label>
                            <Input
                                id="resume-upload"
                                type="file"
                                accept=".pdf,.docx,.doc"
                                className="hidden"
                                onChange={onResumeUpload}
                                disabled={isUploadingResume}
                            />
                        </div>
                    </div>

                    <div className="border border-dashed border-white/20 rounded-lg p-6 bg-white/5">
                        {handwritingError && (
                            <Alert variant="destructive" className="bg-red-900/20 border-red-900/50 text-red-50 mb-4">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription className="ml-2">{handwritingError}</AlertDescription>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="ml-auto h-5 w-5 p-0 text-red-50 hover:bg-red-900/30"
                                    onClick={onClearHandwritingError}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </Alert>
                        )}

                        <div className="flex flex-col items-center justify-center text-center">
                            {isUploadingHandwriting ? (
                                <div className="flex flex-col items-center gap-2 text-gray-400">
                                    <div className="relative w-full max-w-[240px] h-[120px] mb-3">
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg overflow-hidden">
                                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 animate-[scan_2s_ease-in-out_infinite]"></div>

                                            {/* Animated handwriting lines */}
                                            <div className="absolute top-1/4 left-4 right-4 h-[2px] bg-purple-400/40 origin-left animate-[write_1.5s_ease-in-out_infinite]"></div>
                                            <div className="absolute top-1/2 left-4 right-12 h-[2px] bg-pink-400/40 origin-left animate-[write_1.8s_ease-in-out_infinite_0.3s]"></div>
                                            <div className="absolute top-3/4 left-4 right-8 h-[2px] bg-purple-400/40 origin-left animate-[write_1.2s_ease-in-out_infinite_0.6s]"></div>

                                            {/* Analysis points */}
                                            <div className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-purple-500/70 animate-pulse"></div>
                                            <div className="absolute top-1/2 right-1/4 h-2 w-2 rounded-full bg-pink-500/70 animate-pulse delay-300"></div>
                                            <div className="absolute bottom-1/4 left-1/3 h-2 w-2 rounded-full bg-purple-500/70 animate-pulse delay-700"></div>

                                            {/* Processing effect */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="h-16 w-16 rounded-full border-2 border-t-transparent border-purple-500 animate-spin"></div>
                                                <div className="absolute h-10 w-10 rounded-full border-2 border-b-transparent border-pink-500 animate-spin animate-[spin_1s_linear_infinite_reverse]"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-300">Analyzing handwriting sample...</span>
                                    <span className="text-xs text-gray-500">Identifying patterns and traits</span>
                                </div>
                            ) : hasHandwritingSample ? (
                                <div
                                    className="flex items-center gap-2 text-green-400 cursor-pointer hover:text-green-300 transition-colors bg-white/5 p-3 rounded-lg"
                                    onClick={onImagePreview}
                                >
                                    <Check className="h-5 w-5" />
                                    <span>
                                        {handwritingFile ? handwritingFile.name : "Cloud Image"}
                                        {handwritingImageUrl && " "}
                                    </span>
                                    <span className="text-xs text-gray-400 ml-2 underline">Click to preview</span>
                                </div>
                            ) : (
                                <>
                                    <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                                    <h4 className="font-medium mb-1 text-white">Handwriting Sample</h4>
                                    <p className="text-sm text-gray-400 mb-4">Upload a clear image of your handwriting (JPG, PNG)</p>
                                </>
                            )}

                            <Label
                                htmlFor="handwriting-upload"
                                className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg ${isUploadingHandwriting
                                    ? "bg-white/5 text-gray-400 cursor-not-allowed"
                                    : handwritingFile || handwritingImageUrl
                                        ? "bg-white/10 hover:bg-white/20 text-white"
                                        : "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                                    }`}
                            >
                                {isUploadingHandwriting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4" />}
                                <span>{handwritingFile ? "Change File" : "Upload HandWriting"}</span>
                            </Label>
                            <Input
                                id="handwriting-upload"
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                className="hidden"
                                onChange={onHandwritingUpload}
                                disabled={isUploadingHandwriting}
                            />
                        </div>
                    </div>

                    {!resumeFile || !hasHandwritingSample ? (
                        <div className="flex items-start gap-3 bg-yellow-500/10 text-yellow-400 p-4 rounded-lg">
                            <AlertCircle className="h-5 w-5 mt-0.5" />
                            <div>
                                <p className="font-medium">Documents Required</p>
                                <p className="text-sm">Both your resume and handwriting sample are needed for a complete analysis.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-end">
                            <Button
                                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-lg"
                                onClick={onSubmitForAnalysis}
                                disabled={isUploadingResume || isUploadingHandwriting}
                            >
                                Submit for Analysis
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    )
}