import { useState } from "react"
import { motion } from "framer-motion"
import {
  BrainCircuit,
  FileText,
  Lightbulb,
  Edit,
  Info,
  CheckCircle,
  Star,
  Briefcase,
  ArrowRight,
  Download,
  Share2,
  Printer,
  Zap,
  Target,
  MessageSquare,
  PuzzleIcon,
} from "lucide-react"

import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs"

export default function AnalysisPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Example data - this would come from your API/backend
  const personalityTraits = [
    {
      name: "Analytical Thinking",
      description: "Logical reasoning and systematic approach to problems",
      handwritingEvidence:
        "Consistent spacing between words and precise letter formation indicate methodical thinking patterns",
      icon: <Info className="h-5 w-5" />,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      textColor: "text-blue-400",
    },
    {
      name: "Creativity",
      description: "Ability to think outside conventional patterns and generate innovative ideas",
      handwritingEvidence: "Unique letter formations and occasional flourishes suggest creative tendencies",
      icon: <Lightbulb className="h-5 w-5" />,
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
      textColor: "text-amber-400",
    },
    {
      name: "Attention to Detail",
      description: "Precision and thoroughness in work and observation",
      handwritingEvidence: "Careful dotting of i's and crossing of t's, consistent letter size throughout the text",
      icon: <Target className="h-5 w-5" />,
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      textColor: "text-emerald-400",
    },
    {
      name: "Leadership",
      description: "Capacity to guide and influence others toward achieving goals",
      handwritingEvidence: "Strong pressure applied to upstrokes and confident t-bars indicate leadership qualities",
      icon: <Star className="h-5 w-5" />,
      color: "from-red-500 to-rose-600",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
      textColor: "text-red-400",
    },
    {
      name: "Communication",
      description: "Clear and effective expression of ideas and information",
      handwritingEvidence: "Well-connected letters and words with appropriate spacing show strong communication skills",
      icon: <MessageSquare className="h-5 w-5" />,
      color: "from-violet-500 to-purple-600",
      bgColor: "bg-violet-500/10",
      borderColor: "border-violet-500/20",
      textColor: "text-violet-400",
    },
    {
      name: "Problem Solving",
      description: "Finding effective solutions to challenges and obstacles",
      handwritingEvidence:
        "Balanced slant and structured paragraph formation indicate methodical problem-solving approach",
      icon: <PuzzleIcon className="h-5 w-5" />,
      color: "from-cyan-500 to-sky-600",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
      textColor: "text-cyan-400",
    },
  ]

  const careerStrengths = [
    {
      name: "Technical Problem Solving",
      evidence:
        "Your precise letter formation and consistent spacing demonstrate a methodical approach to complex problems",
      icon: <BrainCircuit className="h-5 w-5" />,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-500/10",
    },
    {
      name: "Logical Reasoning",
      evidence:
        "The structured organization of your writing and consistent baseline show strong logical thinking patterns",
      icon: <Info className="h-5 w-5" />,
      color: "from-violet-500 to-purple-600",
      bgColor: "bg-violet-500/10",
    },
    {
      name: "Systematic Approach",
      evidence: "Uniform margins and paragraph structure indicate your ability to organize and systematize information",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-emerald-500/10",
    },
    {
      name: "Creative Solutions",
      evidence: "Occasional unique letter formations suggest you can approach problems from unconventional angles",
      icon: <Lightbulb className="h-5 w-5" />,
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-500/10",
    },
    {
      name: "Detailed Documentation",
      evidence: "Careful attention to punctuation and consistent letter size show aptitude for detailed documentation",
      icon: <FileText className="h-5 w-5" />,
      color: "from-red-500 to-rose-600",
      bgColor: "bg-red-500/10",
    },
    {
      name: "Clear Communication",
      evidence: "Well-connected letters and words with appropriate spacing indicate strong communication abilities",
      icon: <MessageSquare className="h-5 w-5" />,
      color: "from-cyan-500 to-sky-600",
      bgColor: "bg-cyan-500/10",
    },
  ]

  const recommendedFields = [
    {
      name: "Software Development",
      reason: "Your analytical thinking and attention to detail are essential for writing clean, efficient code",
      icon: <BrainCircuit className="h-5 w-5" />,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      name: "Data Analysis",
      reason: "Your methodical approach and logical reasoning are valuable for interpreting complex datasets",
      icon: <Info className="h-5 w-5" />,
      color: "from-violet-500 to-purple-600",
      bgColor: "bg-violet-500/10",
      borderColor: "border-violet-500/20",
    },
    {
      name: "UX/UI Design",
      reason: "Your creativity combined with attention to detail would help create intuitive user experiences",
      icon: <Lightbulb className="h-5 w-5" />,
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
    },
    {
      name: "Project Management",
      reason: "Your leadership qualities and systematic approach are well-suited for coordinating projects",
      icon: <Star className="h-5 w-5" />,
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      name: "Technical Writing",
      reason: "Your clear communication skills and attention to detail are perfect for documenting complex information",
      icon: <FileText className="h-5 w-5" />,
      color: "from-red-500 to-rose-600",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
    },
  ]

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
        <TabsList className="grid grid-cols-4 bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl rounded-lg h-auto p-1">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md py-3 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-purple-500"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="traits"
            className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md py-3 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-purple-500"
          >
            Personality Traits
          </TabsTrigger>
          <TabsTrigger
            value="strengths"
            className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md py-3 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-purple-500"
          >
            Career Strengths
          </TabsTrigger>
          <TabsTrigger
            value="careers"
            className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md py-3 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-purple-500"
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
                    <h3 className="text-2xl font-bold">Handwriting Analysis</h3>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-full"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      <span>Download</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-full"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      <span>Share</span>
                    </Button>
                  </div>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-white/10 mb-8 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300"></div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  <div className="relative p-6 flex justify-center">
                    <img
                      src="/placeholder.svg?height=200&width=500&text=Handwriting+Sample"
                      alt="Handwriting Sample"
                      className="max-w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    Your handwriting analysis reveals a highly analytical individual with strong problem-solving
                    abilities. The consistent spacing and precise letter formation indicate attention to detail, while
                    the moderate slant suggests a balanced approach between logical thinking and emotional awareness.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    The pressure applied in your writing demonstrates confidence and determination, particularly in
                    professional contexts. Your handwriting exhibits traits commonly found in individuals who excel in
                    technical fields requiring both analytical thinking and creative problem-solving.
                  </p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden h-full">
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-md opacity-50"></div>
                        <div className="relative bg-black rounded-lg p-2 border border-white/20">
                          <BrainCircuit className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold">Key Personality Traits</h3>
                    </div>

                    <div className="space-y-5">
                      {personalityTraits.slice(0, 4).map((trait, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                          className={`${trait.bgColor} rounded-xl p-4 border ${trait.borderColor} hover:bg-opacity-20 transition-all duration-300 transform hover:scale-[1.02]`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`bg-gradient-to-br ${trait.color} p-3 rounded-lg text-white`}>
                              {trait.icon}
                            </div>
                            <div>
                              <h4 className="font-medium text-white">{trait.name}</h4>
                              <p className="text-sm text-gray-300 mt-1">{trait.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-6 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/10 group"
                        onClick={() => setActiveTab("traits")}
                      >
                        View All Traits
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden h-full">
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-md opacity-50"></div>
                        <div className="relative bg-black rounded-lg p-2 border border-white/20">
                          <Briefcase className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold">Top Career Matches</h3>
                    </div>

                    <div className="space-y-4">
                      {recommendedFields.slice(0, 3).map((field, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                          className="flex items-center justify-between p-4 bg-gradient-to-r from-black to-gray-900 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-[1.02]"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`bg-gradient-to-br ${field.color} p-3 rounded-lg text-white`}>
                              {field.icon}
                            </div>
                            <span className="font-medium">{field.name}</span>
                          </div>
                          <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
                            High Match
                          </Badge>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-6 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/10 group"
                        onClick={() => setActiveTab("careers")}
                      >
                        View All Careers
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="traits" className="mt-6">
          <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-md opacity-50"></div>
                    <div className="relative bg-black rounded-lg p-2 border border-white/20">
                      <BrainCircuit className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold">Personality Traits Analysis</h3>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-full"
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
                {personalityTraits.map((trait, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`${trait.bgColor} rounded-xl border ${trait.borderColor} overflow-hidden group hover:shadow-lg hover:shadow-${trait.color.split(" ")[0]}/10 transition-all duration-300`}
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`bg-gradient-to-br ${trait.color} p-3 rounded-lg text-white transform group-hover:scale-110 transition-transform duration-300`}
                        >
                          {trait.icon}
                        </div>
                        <div className="space-y-3 flex-1">
                          <h4 className="text-lg font-bold">{trait.name}</h4>
                          <p className="text-gray-300">{trait.description}</p>

                          <div className={`${trait.bgColor} p-4 rounded-lg border ${trait.borderColor} mt-4`}>
                            <div className="flex items-start gap-3">
                              <Edit className={`h-4 w-4 ${trait.textColor} mt-0.5 flex-shrink-0`} />
                              <p className={`text-sm ${trait.textColor}`}>{trait.handwritingEvidence}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="strengths" className="mt-6">
          <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-md opacity-50"></div>
                    <div className="relative bg-black rounded-lg p-2 border border-white/20">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold">Career Strengths Analysis</h3>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-full"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print Report
                </Button>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-gray-300 leading-relaxed">
                  Based on your handwriting analysis, we've identified several career strengths that can help you
                  succeed in various professional environments.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {careerStrengths.map((strength, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="relative h-full">
                      <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative h-full rounded-xl p-6 bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden group-hover:border-white/20 transition-all">
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-xl"></div>
                        <div className="flex items-start gap-5">
                          <div
                            className={`bg-gradient-to-br ${strength.color} p-3 rounded-lg text-white transform group-hover:scale-110 transition-transform duration-300`}
                          >
                            {strength.icon}
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-bold text-lg">{strength.name}</h4>
                            <p className="text-sm text-gray-300">{strength.evidence}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="careers" className="mt-6">
          <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-md opacity-50"></div>
                    <div className="relative bg-black rounded-lg p-2 border border-white/20">
                      <Briefcase className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold">Recommended Career Fields</h3>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-full"
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
                {recommendedFields.map((field, index) => (
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
                          <div className="flex items-start gap-6">
                            <div
                              className={`bg-gradient-to-br ${field.color} p-4 rounded-lg text-white transform group-hover:scale-110 transition-transform duration-300`}
                            >
                              {field.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                                <h4 className="text-xl font-bold">{field.name}</h4>
                                <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30 md:ml-auto w-fit">
                                  High Match
                                </Badge>
                              </div>
                              <p className="text-gray-300">{field.reason}</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 border-t border-white/10">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">Compatibility</span>
                            <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
                              Excellent
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 flex justify-center">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white border-0 rounded-full group">
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
