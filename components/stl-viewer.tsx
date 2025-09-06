"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, RotateCcw, ZoomIn, ZoomOut, Download, Info, Upload, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"

interface STLViewerProps {
  isOpen: boolean
  onClose: () => void
  file?: File | null
}

interface ModelInfo {
  vertices: number
  faces: number
  volume: number
  boundingBox: { x: number; y: number; z: number }
  surfaceArea: number
  fileName: string
  fileSize: number
}

export default function STLViewer({ isOpen, onClose, file }: STLViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [modelInfo, setModelInfo] = useState<ModelInfo>({
    vertices: 0,
    faces: 0,
    volume: 0,
    boundingBox: { x: 0, y: 0, z: 0 },
    surfaceArea: 0,
    fileName: "",
    fileSize: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [vertices, setVertices] = useState<number[]>([])
  const [faces, setFaces] = useState<number[]>([])

  useEffect(() => {
    if (isOpen && file) {
      loadSTLFile(file)
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isOpen, file])

  useEffect(() => {
    if (vertices.length > 0 && faces.length > 0) {
      renderModel()
    }
  }, [vertices, faces, rotation, zoom])

  const loadSTLFile = async (file: File) => {
    setIsLoading(true)
    setError(null)

    try {
      const arrayBuffer = await file.arrayBuffer()

      // Check if binary STL
      const dataView = new DataView(arrayBuffer)
      const triangleCount = dataView.getUint32(80, true)
      const expectedSize = 80 + 4 + triangleCount * 50

      let parsedData
      if (arrayBuffer.byteLength === expectedSize) {
        parsedData = parseSTLBinary(dataView, triangleCount)
      } else {
        const text = new TextDecoder().decode(arrayBuffer)
        parsedData = parseSTLAscii(text)
      }

      if (parsedData) {
        setVertices(parsedData.vertices)
        setFaces(parsedData.faces)

        const info = calculateModelInfo(parsedData.vertices, parsedData.faces, file)
        setModelInfo(info)
      }
    } catch (err) {
      setError("Failed to load STL file. Please check the file format.")
      console.error("STL loading error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const parseSTLBinary = (dataView: DataView, triangleCount: number) => {
    const vertices: number[] = []
    const faces: number[] = []
    let vertexIndex = 0

    let offset = 84 // Skip header and triangle count

    for (let i = 0; i < triangleCount; i++) {
      offset += 12 // Skip normal vector

      // Read 3 vertices
      for (let j = 0; j < 3; j++) {
        const x = dataView.getFloat32(offset, true)
        const y = dataView.getFloat32(offset + 4, true)
        const z = dataView.getFloat32(offset + 8, true)

        vertices.push(x, y, z)
        faces.push(vertexIndex++)
        offset += 12
      }

      offset += 2 // Skip attribute byte count
    }

    return { vertices, faces }
  }

  const parseSTLAscii = (text: string) => {
    const vertices: number[] = []
    const faces: number[] = []
    let vertexIndex = 0

    const lines = text.split("\n")

    for (const line of lines) {
      const trimmed = line.trim()
      if (trimmed.startsWith("vertex")) {
        const coords = trimmed.split(/\s+/).slice(1).map(Number)
        if (coords.length === 3 && coords.every((n) => !isNaN(n))) {
          vertices.push(...coords)
          faces.push(vertexIndex++)
        }
      }
    }

    return { vertices, faces }
  }

  const calculateModelInfo = (vertices: number[], faces: number[], file: File): ModelInfo => {
    const vertexCount = vertices.length / 3
    const faceCount = faces.length / 3

    // Calculate bounding box
    let minX = Number.POSITIVE_INFINITY,
      maxX = Number.NEGATIVE_INFINITY
    let minY = Number.POSITIVE_INFINITY,
      maxY = Number.NEGATIVE_INFINITY
    let minZ = Number.POSITIVE_INFINITY,
      maxZ = Number.NEGATIVE_INFINITY

    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i]
      const y = vertices[i + 1]
      const z = vertices[i + 2]

      minX = Math.min(minX, x)
      maxX = Math.max(maxX, x)
      minY = Math.min(minY, y)
      maxY = Math.max(maxY, y)
      minZ = Math.min(minZ, z)
      maxZ = Math.max(maxZ, z)
    }

    const boundingBox = {
      x: Math.round((maxX - minX) * 100) / 100,
      y: Math.round((maxY - minY) * 100) / 100,
      z: Math.round((maxZ - minZ) * 100) / 100,
    }

    // Calculate volume using mesh analysis
    let volume = 0
    for (let i = 0; i < faces.length; i += 3) {
      const v1 = faces[i] * 3
      const v2 = faces[i + 1] * 3
      const v3 = faces[i + 2] * 3

      const x1 = vertices[v1],
        y1 = vertices[v1 + 1],
        z1 = vertices[v1 + 2]
      const x2 = vertices[v2],
        y2 = vertices[v2 + 1],
        z2 = vertices[v2 + 2]
      const x3 = vertices[v3],
        y3 = vertices[v3 + 1],
        z3 = vertices[v3 + 2]

      // Calculate signed volume of tetrahedron
      volume += (x1 * (y2 * z3 - y3 * z2) + x2 * (y3 * z1 - y1 * z3) + x3 * (y1 * z2 - y2 * z1)) / 6
    }

    volume = Math.abs(volume) / 1000 // Convert to cm³

    // Calculate surface area
    let surfaceArea = 0
    for (let i = 0; i < faces.length; i += 3) {
      const v1 = faces[i] * 3
      const v2 = faces[i + 1] * 3
      const v3 = faces[i + 2] * 3

      const x1 = vertices[v1],
        y1 = vertices[v1 + 1],
        z1 = vertices[v1 + 2]
      const x2 = vertices[v2],
        y2 = vertices[v2 + 1],
        z2 = vertices[v2 + 2]
      const x3 = vertices[v3],
        y3 = vertices[v3 + 1],
        z3 = vertices[v3 + 2]

      // Calculate triangle area using cross product
      const ax = x2 - x1,
        ay = y2 - y1,
        az = z2 - z1
      const bx = x3 - x1,
        by = y3 - y1,
        bz = z3 - z1

      const cx = ay * bz - az * by
      const cy = az * bx - ax * bz
      const cz = ax * by - ay * bx

      surfaceArea += Math.sqrt(cx * cx + cy * cy + cz * cz) / 2
    }

    return {
      vertices: vertexCount,
      faces: faceCount,
      volume: Math.round(volume * 100) / 100,
      boundingBox,
      surfaceArea: Math.round(surfaceArea / 100) / 100, // Convert to cm²
      fileName: file.name,
      fileSize: file.size,
    }
  }

  const renderModel = () => {
    const canvas = canvasRef.current
    if (!canvas || vertices.length === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas with dark background
    ctx.fillStyle = "#1f2937"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Calculate model bounds for auto-scaling
    let minX = Number.POSITIVE_INFINITY,
      maxX = Number.NEGATIVE_INFINITY
    let minY = Number.POSITIVE_INFINITY,
      maxY = Number.NEGATIVE_INFINITY
    let minZ = Number.POSITIVE_INFINITY,
      maxZ = Number.NEGATIVE_INFINITY

    for (let i = 0; i < vertices.length; i += 3) {
      minX = Math.min(minX, vertices[i])
      maxX = Math.max(maxX, vertices[i])
      minY = Math.min(minY, vertices[i + 1])
      maxY = Math.max(maxY, vertices[i + 1])
      minZ = Math.min(minZ, vertices[i + 2])
      maxZ = Math.max(maxZ, vertices[i + 2])
    }

    // Center the model
    const centerX = (minX + maxX) / 2
    const centerY = (minY + maxY) / 2
    const centerZ = (minZ + maxZ) / 2

    // Auto-scale to fit canvas
    const modelSize = Math.max(maxX - minX, maxY - minY, maxZ - minZ)
    const scale = (Math.min(canvas.width, canvas.height) * 0.4 * zoom) / modelSize

    const canvasCenterX = canvas.width / 2
    const canvasCenterY = canvas.height / 2

    // Project and render vertices
    const projectedVertices: Array<{ x: number; y: number; z: number }> = []

    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i] - centerX
      const y = vertices[i + 1] - centerY
      const z = vertices[i + 2] - centerZ

      // Apply rotation
      const cosX = Math.cos(rotation.x)
      const sinX = Math.sin(rotation.x)
      const cosY = Math.cos(rotation.y)
      const sinY = Math.sin(rotation.y)

      // Rotate around X axis
      const y1 = y * cosX - z * sinX
      const z1 = y * sinX + z * cosX

      // Rotate around Y axis
      const x2 = x * cosY + z1 * sinY
      const z2 = -x * sinY + z1 * cosY

      projectedVertices.push({
        x: canvasCenterX + x2 * scale,
        y: canvasCenterY - y1 * scale,
        z: z2,
      })
    }

    // Sort faces by depth for proper rendering
    const faceDepths: Array<{ index: number; depth: number }> = []
    for (let i = 0; i < faces.length; i += 3) {
      const v1 = projectedVertices[faces[i]]
      const v2 = projectedVertices[faces[i + 1]]
      const v3 = projectedVertices[faces[i + 2]]

      if (v1 && v2 && v3) {
        const avgDepth = (v1.z + v2.z + v3.z) / 3
        faceDepths.push({ index: i, depth: avgDepth })
      }
    }

    faceDepths.sort((a, b) => b.depth - a.depth)

    // Render faces
    for (const { index } of faceDepths) {
      const v1 = projectedVertices[faces[index]]
      const v2 = projectedVertices[faces[index + 1]]
      const v3 = projectedVertices[faces[index + 2]]

      if (v1 && v2 && v3) {
        // Fill face
        ctx.fillStyle = "rgba(96, 165, 250, 0.3)"
        ctx.beginPath()
        ctx.moveTo(v1.x, v1.y)
        ctx.lineTo(v2.x, v2.y)
        ctx.lineTo(v3.x, v3.y)
        ctx.closePath()
        ctx.fill()

        // Draw wireframe
        ctx.strokeStyle = "#60a5fa"
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }

    // Add grid lines for reference
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
    ctx.lineWidth = 1
    const gridSize = 50

    // Vertical lines
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    // Horizontal lines
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }
  }

  const handleRotate = () => {
    setRotation((prev) => ({ x: 0, y: 0 }))
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.2, 5))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.2, 0.2))
  }

  const exportReport = () => {
    const report = `3D Model Analysis Report
========================

File Information:
- Name: ${modelInfo.fileName}
- Size: ${(modelInfo.fileSize / 1024 / 1024).toFixed(2)} MB

Geometry:
- Vertices: ${modelInfo.vertices.toLocaleString()}
- Faces: ${modelInfo.faces.toLocaleString()}

Dimensions (mm):
- Width (X): ${modelInfo.boundingBox.x}
- Depth (Y): ${modelInfo.boundingBox.y}  
- Height (Z): ${modelInfo.boundingBox.z}

Calculations:
- Volume: ${modelInfo.volume} cm³
- Surface Area: ${modelInfo.surfaceArea} cm²

Generated on: ${new Date().toLocaleString()}
`

    const blob = new Blob([report], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${modelInfo.fileName.replace(".stl", "")}_report.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Auto-rotation animation
  useEffect(() => {
    if (vertices.length > 0) {
      const animate = () => {
        setRotation((prev) => ({
          x: prev.x + 0.002,
          y: prev.y + 0.005,
        }))
        animationRef.current = requestAnimationFrame(animate)
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [vertices.length])

  // Add mouse interaction
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let isDragging = false
    let lastMouseX = 0
    let lastMouseY = 0

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true
      lastMouseX = e.clientX
      lastMouseY = e.clientY
      // Stop auto-rotation when user interacts
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const deltaX = e.clientX - lastMouseX
      const deltaY = e.clientY - lastMouseY

      setRotation((prev) => ({
        x: prev.x + deltaY * 0.01,
        y: prev.y + deltaX * 0.01,
      }))

      lastMouseX = e.clientX
      lastMouseY = e.clientY
    }

    const handleMouseUp = () => {
      isDragging = false
      // Resume auto-rotation
      const animate = () => {
        setRotation((prev) => ({
          x: prev.x + 0.002,
          y: prev.y + 0.005,
        }))
        animationRef.current = requestAnimationFrame(animate)
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    canvas.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [vertices.length])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-black border border-gray-800 rounded-lg w-full max-w-6xl h-[85vh] relative overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h2 className="text-2xl font-bold">3D Model Viewer</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="flex h-full">
              {/* 3D Viewer */}
              <div className="flex-1 p-4">
                <div className="bg-gray-900/50 rounded-lg h-full flex items-center justify-center relative">
                  {isLoading ? (
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                      <p>Loading and analyzing 3D model...</p>
                    </div>
                  ) : error ? (
                    <div className="text-center text-red-400">
                      <p>{error}</p>
                    </div>
                  ) : file && vertices.length > 0 ? (
                    <canvas
                      ref={canvasRef}
                      width={700}
                      height={500}
                      className="border border-gray-700 rounded bg-gray-800"
                    />
                  ) : (
                    <div className="text-center text-gray-400">
                      <Upload className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Upload an STL file to view it here</p>
                    </div>
                  )}

                  {/* Controls */}
                  {file && !isLoading && !error && vertices.length > 0 && (
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <Button size="sm" variant="outline" onClick={handleRotate}>
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleZoomIn}>
                        <ZoomIn className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleZoomOut}>
                        <ZoomOut className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Info Panel */}
              <div className="w-80 p-4 border-l border-gray-800 bg-gray-900/30 overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Model Information
                </h3>

                {file && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-yellow-500 mb-2">File Details</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Name:</span>
                          <span className="text-gray-300 truncate ml-2">{modelInfo.fileName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Size:</span>
                          <span className="text-gray-300">{(modelInfo.fileSize / 1024 / 1024).toFixed(2)} MB</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-blue-500 mb-2">Geometry</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Vertices:</span>
                          <span className="text-gray-300">{modelInfo.vertices.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Faces:</span>
                          <span className="text-gray-300">{modelInfo.faces.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-green-500 mb-2">Dimensions (mm)</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Width (X):</span>
                          <span className="text-gray-300">{modelInfo.boundingBox.x}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Depth (Y):</span>
                          <span className="text-gray-300">{modelInfo.boundingBox.y}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Height (Z):</span>
                          <span className="text-gray-300">{modelInfo.boundingBox.z}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-purple-500 mb-2">Calculations</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Volume:</span>
                          <span className="text-gray-300 font-semibold">{modelInfo.volume} cm³</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Surface Area:</span>
                          <span className="text-gray-300">{modelInfo.surfaceArea} cm²</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-700 space-y-2">
                      <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                        <Calculator className="w-4 h-4 mr-2" />
                        Get Quote (${(modelInfo.volume * 0.25).toFixed(2)})
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent" onClick={exportReport}>
                        <Download className="w-4 h-4 mr-2" />
                        Export Report
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
