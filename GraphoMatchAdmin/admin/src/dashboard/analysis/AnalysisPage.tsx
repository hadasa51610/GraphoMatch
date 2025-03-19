import { motion } from "framer-motion"
import { BrainCircuit, FileText, Lightbulb, Award } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { Progress } from "@/components/ui/progress"
// import { Progress } from "@/components/ui/Progress"

export default function AnalysisPage() {
  const personalityTraits = [
    { name: "Analytical Thinking", value: 92 },
    { name: "Creativity", value: 78 },
    { name: "Attention to Detail", value: 85 },
    { name: "Leadership", value: 70 },
    { name: "Communication", value: 88 },
    { name: "Problem Solving", value: 90 },
    { name: "Adaptability", value: 75 },
    { name: "Teamwork", value: 82 },
  ]

  const careerStrengths = [
    "Technical problem solving",
    "Logical reasoning",
    "Systematic approach to challenges",
    "Creative solution finding",
    "Detailed documentation",
    "Clear communication of complex ideas",
  ]

  const recommendedFields = [
    "Software Development",
    "Data Analysis",
    "UX/UI Design",
    "Project Management",
    "Technical Writing",
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-70"></div>
          <div className="relative bg-black rounded-full p-2">
            <BrainCircuit className="h-7 w-7 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold">Handwriting Analysis</h1>
          <p className="text-gray-400">Results based on your handwriting sample from March 15, 2025</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden h-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <FileText className="h-5 w-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold">Personality Traits</h3>
              </div>

              <div className="space-y-4">
                {personalityTraits.map((trait, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">{trait.name}</span>
                      <span className="text-sm font-medium">{trait.value}%</span>
                    </div>
                    <Progress
                      value={trait.value}
                      className="h-2 bg-white/10"
                      indicatorClassName={`bg-gradient-to-r ${
                        trait.value > 85
                          ? "from-green-500 to-emerald-500"
                          : trait.value > 75
                            ? "from-blue-500 to-indigo-500"
                            : "from-purple-500 to-pink-500"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-500/20 p-2 rounded-lg">
                    <Lightbulb className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold">Career Strengths</h3>
                </div>

                <ul className="space-y-2">
                  {careerStrengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 rounded-full bg-blue-500"></div>
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-pink-500/20 p-2 rounded-lg">
                    <Award className="h-5 w-5 text-pink-400" />
                  </div>
                  <h3 className="text-lg font-bold">Recommended Fields</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {recommendedFields.map((field, index) => (
                    <div key={index} className="bg-white/5 border border-white/10 rounded-full px-3 py-1">
                      <span className="text-sm">{field}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-gradient-to-br from-gray-900 to-black border border-white/10 backdrop-blur-xl overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">Analysis Summary</h3>
            <p className="text-gray-300 mb-4">
              Your handwriting analysis reveals a highly analytical individual with strong problem-solving abilities.
              The consistent spacing and precise letter formation indicate attention to detail, while the moderate slant
              suggests a balanced approach between logical thinking and emotional awareness.
            </p>
            <p className="text-gray-300 mb-4">
              The pressure applied in your writing demonstrates confidence and determination, particularly in
              professional contexts. Your handwriting exhibits traits commonly found in individuals who excel in
              technical fields requiring both analytical thinking and creative problem-solving.
            </p>
            <p className="text-gray-300">
              Based on these characteristics, you would likely thrive in environments that challenge your intellectual
              capabilities while allowing you to apply creative solutions to complex problems. The recommended job
              matches align with these strengths, particularly in the technology and design sectors.
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}