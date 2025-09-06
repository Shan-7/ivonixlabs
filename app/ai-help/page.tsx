"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, Send, ExternalLink, Lightbulb, Zap, Shield } from "lucide-react"
import { toast } from "sonner"

interface Component {
  name: string
  url: string
}

interface AIResponse {
  explanation: string
  components: Component[]
}

export default function AIHelpPage() {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState<AIResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    try {
      const res = await fetch("/api/ai-help", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      })

      if (!res.ok) {
        throw new Error("Failed to get AI response")
      }

      const data = await res.json()
      setResponse(data)
    } catch (error) {
      console.error("Error:", error)
      toast.error("Failed to get AI response. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const exampleQueries = [
    "Fire detection system components",
    "Home automation with Arduino",
    "Temperature monitoring project",
    "Motor control circuit",
    "IoT weather station",
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            AI Project Helper
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get instant component recommendations for your electronics projects. Powered by AI to help you find the
            right parts from RobonixKart.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <Lightbulb className="h-8 w-8 text-yellow-500 mb-2" />
              <CardTitle className="text-white">Smart Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Get intelligent component recommendations based on your project description
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <Zap className="h-8 w-8 text-blue-500 mb-2" />
              <CardTitle className="text-white">Instant Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">Powered by Groq AI for lightning-fast responses and component matching</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <Shield className="h-8 w-8 text-green-500 mb-2" />
              <CardTitle className="text-white">Verified Components</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">All recommendations link directly to verified components on RobonixKart</p>
            </CardContent>
          </Card>
        </div>

        {/* Query Form */}
        <Card className="bg-gray-900 border-gray-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Describe Your Project</CardTitle>
            <CardDescription>
              Tell us about your electronics project and we'll recommend the components you need
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="e.g., I want to build a fire detection system that can send alerts to my phone..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-h-[120px] bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting Recommendations...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Get Component Recommendations
                  </>
                )}
              </Button>
            </form>

            {/* Example Queries */}
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-3">Try these example queries:</p>
              <div className="flex flex-wrap gap-2">
                {exampleQueries.map((example, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-gray-700 bg-gray-800 text-gray-300"
                    onClick={() => setQuery(example)}
                  >
                    {example}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Response */}
        {response && (
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Explanation */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Project Overview</h3>
                <p className="text-gray-300 leading-relaxed">{response.explanation}</p>
              </div>

              {/* Components */}
              {response.components.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Recommended Components</h3>
                  <div className="grid gap-4">
                    {response.components.map((component, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700"
                      >
                        <div>
                          <h4 className="font-medium text-white">{component.name}</h4>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                          onClick={() => window.open(component.url, "_blank")}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View on RobonixKart
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
