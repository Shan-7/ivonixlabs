import { type NextRequest, NextResponse } from "next/server"
import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

interface Component {
  name: string
  url: string
}

interface AIResponse {
  explanation: string
  components: Component[]
}

// Cache for component data
let componentCache: { name: string }[] | null = null
let cacheTimestamp = 0
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour

async function getComponentData(): Promise<{ name: string }[]> {
  const now = Date.now()

  // Return cached data if still valid
  if (componentCache && now - cacheTimestamp < CACHE_DURATION) {
    return componentCache
  }

  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wc-product-export-6-9-2025-1757148973370-mhROJxsOik2ZmNCDReK9aAtH18Sluz.csv",
    )
    const csvText = await response.text()

    const lines = csvText.split("\n")
    const components: { name: string }[] = []

    // Skip header row and process data
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line) {
        // Simple CSV parsing - assumes name is in first column
        const name = line.split(",")[0]?.replace(/"/g, "").trim()
        if (name) {
          components.push({ name })
        }
      }
    }

    componentCache = components
    cacheTimestamp = now
    return components
  } catch (error) {
    console.error("Error fetching component data:", error)
    return []
  }
}

function createComponentUrl(componentName: string): string {
  const urlFriendlyName = componentName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-|-$/g, "") // Remove leading/trailing hyphens

  return `https://robonixkart.com/product/${urlFriendlyName}/`
}

function findRelevantComponents(query: string, components: { name: string }[]): Component[] {
  const queryLower = query.toLowerCase()
  const keywords = queryLower.split(/\s+/)

  // Score components based on relevance
  const scoredComponents = components.map((component) => {
    const nameLower = component.name.toLowerCase()
    let score = 0

    // Exact phrase match (highest score)
    if (nameLower.includes(queryLower)) {
      score += 100
    }

    // Individual keyword matches
    keywords.forEach((keyword) => {
      if (nameLower.includes(keyword)) {
        score += 10
      }
    })

    // Boost score for electronics-related terms
    const electronicsTerms = [
      "sensor",
      "arduino",
      "raspberry",
      "motor",
      "led",
      "resistor",
      "capacitor",
      "module",
      "board",
      "shield",
      "display",
      "relay",
      "switch",
      "battery",
      "power",
      "voltage",
      "current",
      "wire",
      "cable",
      "connector",
    ]
    electronicsTerms.forEach((term) => {
      if (nameLower.includes(term)) {
        score += 5
      }
    })

    return {
      component,
      score,
    }
  })

  // Sort by score and return top 8 components
  return scoredComponents
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((item) => ({
      name: item.component.name,
      url: createComponentUrl(item.component.name),
    }))
}

export async function POST(request: NextRequest) {
  try {
    // Check if API key exists
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      console.error("GROQ_API_KEY is not set in environment variables")
      return NextResponse.json({ error: "AI service is not configured. Please contact support." }, { status: 500 })
    }

    const { query } = await request.json()

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query is required and must be a string" }, { status: 400 })
    }

    // Get component data
    const components = await getComponentData()

    // Find relevant components
    const relevantComponents = findRelevantComponents(query, components)

    // Create Groq client with API key
    const groqClient = groq({
      apiKey: apiKey,
    })

    // Generate AI response
    const { text } = await generateText({
      model: groqClient("llama-3.3-70b-versatile"),
      prompt: `You are an expert electronics engineer and project advisor. A user wants to build: "${query}"

Please provide:
1. A detailed project overview explaining how to build this project
2. Step-by-step implementation guidance
3. Important considerations, tips, and potential challenges
4. Circuit design suggestions if applicable

Keep your response practical, educational, and focused on helping someone actually build this project. Be specific about connections, programming considerations, and best practices.

Available components that might be relevant: ${relevantComponents.map((c) => c.name).join(", ")}

Provide a comprehensive but concise response (aim for 200-400 words).`,
      temperature: 0.7,
      maxTokens: 500,
    })

    const response: AIResponse = {
      explanation: text,
      components: relevantComponents,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error in AI help API:", error)
    return NextResponse.json({ error: "Failed to process request. Please try again." }, { status: 500 })
  }
}
