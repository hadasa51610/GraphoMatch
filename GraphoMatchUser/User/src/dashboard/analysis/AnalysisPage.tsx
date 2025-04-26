import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, StoreType } from "@/store/store"
import { GetAnalysis } from "@/store/slices/analysisSlice"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { BrainCircuit, Edit, ArrowRight, Download, Printer } from "lucide-react"
import { HandwritingAnimationLoader } from "@/components/HandwritingAnimationLoader"
import { GetFiles } from "@/store/slices/fileSlice"

interface AnalysisData {
  personalityTraits: { trait: string; matchLevel: string; description: string }[];
  recommendations: { profession: string; matchLevel: string; reason: string }[];
}

export default function AnalysisPage() {
  const dispatch = useDispatch<AppDispatch>();
  const analysisFromStore = useSelector((state: StoreType) => state.analysis.list);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const isFirstVisit = useRef(sessionStorage.getItem('analysisVisited') !== 'true');

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) return;

    if (analysisFromStore.personalityTraits.length > 0) {
      setAnalysis(analysisFromStore);
      setLoading(false);
      return;
    }

    if (isFirstVisit.current) {
      sessionStorage.setItem('analysisVisited', 'true');

      setLoading(true);

      const timeout = setTimeout(() => {
        setLoading(false);
      }, 20000);

      dispatch(GetFiles(Number(userId))).then((result: any) => {
        setImgUrl(result.payload[0].url);
        dispatch(GetAnalysis(Number(userId))).then((result: any) => {
          clearTimeout(timeout);

          if (result.payload) {
            setAnalysis(result.payload);
          } else {
            alert("No analysis data available");
          }
          setLoading(false);
        })
      });
    } else {
      if (!analysisFromStore) {
        dispatch(GetFiles(Number(userId))).then((result: any) => {
          setImgUrl(result.payload[0].url);
          dispatch(GetAnalysis(Number(userId))).then((result: any) => {
            if (result.payload) {
              setAnalysis(result.payload);
            }
          });
        })
      }
    }
  }, [dispatch, analysisFromStore]);


  const getMatchLevelColor = (level: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; gradient: string }> = {
      "Very High": {
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        text: "text-emerald-400",
        gradient: "from-emerald-500 to-green-600",
      },
      High: {
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        text: "text-blue-400",
        gradient: "from-blue-500 to-indigo-600",
      },
      Medium: {
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        text: "text-amber-400",
        gradient: "from-amber-500 to-orange-600",
      },
      Low: {
        bg: "bg-red-500/10",
        border: "border-red-500/20",
        text: "text-red-400",
        gradient: "from-red-500 to-rose-600",
      },
    }
    return colors[level] || colors["Medium"]
  }

  if (loading) {
    return <HandwritingAnimationLoader />
  }

  if (!analysis) {
    return (
      <div className="max-w-5xl mx-auto">
        <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden p-8">
          <div className="text-center">
            <h2 className="text-xl font-medium">No analysis data available</h2>
            <p className="text-gray-400 mt-2">Please upload a handwriting sample to get your analysis</p>
          </div>
        </Card>
      </div>
    )
  }
  console.log("analysis.recommendations", analysis.recommendations);
  console.log("analysis.personalityTraits", analysis.personalityTraits);
  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-6 mb-10"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-70"></div>
          <div className="relative bg-black rounded-full p-3">
            <BrainCircuit className="h-8 w-8 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Handwriting Analysis
          </h1>
          <p className="text-gray-400 mt-1">Results based on your handwriting sample from March 15, 2025</p>
        </div>
      </motion.div>

      <Tabs defaultValue="overview" className="mb-10" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-3 bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl rounded-lg h-auto p-1 mb-2">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:bg-purple-500/20 data-[state=active]:text-white rounded-md py-3 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-purple-500 transition-all duration-200 bg-gradient-to-br from-gray-900 to-black"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="traits"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:bg-purple-500/20 data-[state=active]:text-white rounded-md py-3 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-purple-500 transition-all duration-200 bg-gradient-to-br from-gray-900 to-black"
          >
            Personality Traits
          </TabsTrigger>
          <TabsTrigger
            value="careers"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:bg-purple-500/20 data-[state=active]:text-white rounded-md py-3 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-purple-500 transition-all duration-200 bg-gradient-to-br from-gray-900 to-black"
          >
            Career Matches
          </TabsTrigger>
        </TabsList>


        <TabsContent value="overview" className="mt-6">
          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-md opacity-50"></div>
                      <div className="relative bg-black rounded-lg p-2 border border-white/20">
                        <Edit className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Handwriting Analysis</h3>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/10 bg-white/5 text-black rounded-full"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      <span>Download</span>
                    </Button>
                  </div>
                </div>

                <div className="relative rounded-xl border border-white/10 mb-8 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300"></div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  <div className="relative p-6 flex justify-center">
                    <img
                      src={imgUrl || undefined}
                      alt="Handwriting Sample"
                      className="max-w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button
                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-full group"
                    onClick={() => setActiveTab("traits")}
                  >
                    View Detailed Analysis
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traits" className="mt-6">
          <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <h3 className="text-2xl font-bold text-white">Personality Traits Analysis</h3>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/10 bg-white/5 hover:bg-white/10 text-black rounded-full"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print Report
                </Button>
              </div>

              <div className="space-y-6 mb-8">
                <p className="text-gray-300 leading-relaxed">
                  Your handwriting analysis reveals several key personality traits. Each trait is based on specific
                  characteristics identified in your handwriting.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {analysis.personalityTraits.map((trait, index) => {
                  const colorScheme = getMatchLevelColor(trait.matchLevel)
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group"
                    >
                      <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div
                          className={`relative ${colorScheme.bg} rounded-xl border ${colorScheme.border} overflow-hidden group hover:shadow-lg transition-all duration-300`}
                        >
                          <div className="p-6">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <h4 className="text-lg font-bold text-white">{trait.trait}</h4>
                                <Badge className={`${colorScheme.bg} ${colorScheme.text} border ${colorScheme.border}`}>
                                  {trait.matchLevel}
                                </Badge>
                              </div>
                              <div className="w-full h-1 bg-white/10 rounded-full mb-3">
                                <div
                                  className={`h-full rounded-full bg-gradient-to-r ${colorScheme.gradient}`}
                                  style={{
                                    width:
                                      trait.matchLevel === "Very High"
                                        ? "95%"
                                        : trait.matchLevel === "High"
                                          ? "80%"
                                          : trait.matchLevel === "Medium"
                                            ? "60%"
                                            : "40%",
                                  }}
                                ></div>
                              </div>
                              <p className="text-gray-300">{trait.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="careers" className="mt-6">
          <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  <h3 className="text-2xl font-bold text-white">Recommended Career Fields</h3>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/10 bg-white/5 hover:bg-white/10 text-black rounded-full"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print Report
                </Button>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-gray-300 leading-relaxed">
                  Based on your handwriting analysis and the personality traits identified, these are the career fields
                  that may be particularly well-suited for you.
                </p>
              </div>

              <div className="space-y-6">
                {analysis.recommendations.map((rec, index) => {
                  const colorScheme = getMatchLevelColor(rec.matchLevel)
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group"
                    >
                      <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative rounded-xl bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden group-hover:border-white/20 transition-all">
                          <div className="p-6">
                            <div className="flex-1">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                                <h4 className="text-xl font-bold text-white">{rec.profession}</h4>
                                <Badge
                                  className={`${colorScheme.bg} ${colorScheme.text} border ${colorScheme.border} md:ml-auto w-fit`}
                                >
                                  {rec.matchLevel}
                                </Badge>
                              </div>
                              <div className="w-full h-1 bg-white/10 rounded-full mb-3">
                                <div
                                  className={`h-full rounded-full bg-gradient-to-r ${colorScheme.gradient}`}
                                  style={{
                                    width:
                                      rec.matchLevel === "Very High" ? "95%"
                                        : rec.matchLevel === "High" ? "80%"
                                          : rec.matchLevel === "Medium" ? "60%" : "40%",
                                  }}
                                ></div>
                              </div>
                              <p className="text-gray-300">{rec.reason}</p>
                            </div>
                          </div>
                          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 border-t border-white/10">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-400">Compatibility</span>
                              <Badge className={`${colorScheme.bg} ${colorScheme.text} border ${colorScheme.border}`}>
                                {rec.matchLevel}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <div className="mt-10 flex justify-center">
                <Button
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-full group"
                  onClick={() => (window.location.href = "/dashboard/jobs")}
                >
                  View Job Opportunities
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}