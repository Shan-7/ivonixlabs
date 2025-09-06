"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calculator, DollarSign, Clock, Layers, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface QuoteCalculatorProps {
  isOpen: boolean
  onClose: () => void
  initialVolume?: number
}

export default function QuoteCalculator({ isOpen, onClose, initialVolume = 0 }: QuoteCalculatorProps) {
  const [formData, setFormData] = useState({
    volume: initialVolume.toString(),
    material: "PLA",
    quantity: "1",
    infill: "20",
    layerHeight: "0.2",
    supportMaterial: false,
    postProcessing: false,
    rushDelivery: false,
  })

  const [quote, setQuote] = useState({
    materialCost: 0,
    laborCost: 0,
    additionalCosts: 0,
    totalCost: 0,
    estimatedTime: "",
    printTime: "",
  })

  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  // Update volume when initialVolume changes
  useEffect(() => {
    if (initialVolume > 0) {
      setFormData((prev) => ({ ...prev, volume: initialVolume.toString() }))
    }
  }, [initialVolume])

  // Pricing configuration
  const materialPrices = {
    PLA: 0.25,
    PETG: 0.35,
    ABS: 0.4,
    TPU: 0.55,
  }

  const calculateQuote = () => {
    const volume = Number.parseFloat(formData.volume) || 0
    const quantity = Number.parseInt(formData.quantity) || 1
    const infillPercent = Number.parseInt(formData.infill) || 20

    // Base material cost calculation
    const materialMultiplier = materialPrices[formData.material as keyof typeof materialPrices] || 0.25
    const infillMultiplier = 0.3 + (infillPercent / 100) * 0.7 // More realistic infill calculation
    const materialCost = volume * materialMultiplier * infillMultiplier * quantity

    // Labor cost calculation (more sophisticated)
    const complexityFactor = formData.layerHeight === "0.1" ? 1.8 : formData.layerHeight === "0.3" ? 0.7 : 1
    const baseTimeHours = Math.max(0.5, (volume * 0.08 + Math.sqrt(volume) * 0.2) * complexityFactor * quantity)
    const laborRate = 12 // $12/hour
    const laborCost = baseTimeHours * laborRate

    // Print time estimation
    const layerHeightMm = Number.parseFloat(formData.layerHeight)
    const estimatedLayers = Math.ceil(50 / layerHeightMm) // Assuming 50mm average height
    const timePerLayer = 2 + volume * 0.01 // Base time + volume factor
    const totalPrintMinutes = estimatedLayers * timePerLayer * quantity
    const printHours = Math.floor(totalPrintMinutes / 60)
    const printMinutes = Math.round(totalPrintMinutes % 60)
    const printTime = `${printHours}h ${printMinutes}m`

    // Additional costs
    let additionalCosts = 0
    if (formData.supportMaterial) additionalCosts += volume * 0.08 * quantity
    if (formData.postProcessing) additionalCosts += Math.max(8, volume * 0.15) * quantity
    if (formData.rushDelivery) additionalCosts += (materialCost + laborCost) * 0.6

    const totalCost = materialCost + laborCost + additionalCosts

    // Estimated delivery time
    const baseDays = Math.ceil(baseTimeHours / 8)
    const deliveryDays = formData.rushDelivery ? Math.max(1, Math.ceil(baseDays / 2)) : baseDays + 1
    const estimatedTime = formData.rushDelivery
      ? `${deliveryDays} day${deliveryDays > 1 ? "s" : ""} (Rush)`
      : `${deliveryDays} day${deliveryDays > 1 ? "s" : ""}`

    setQuote({
      materialCost: Math.round(materialCost * 100) / 100,
      laborCost: Math.round(laborCost * 100) / 100,
      additionalCosts: Math.round(additionalCosts * 100) / 100,
      totalCost: Math.round(totalCost * 100) / 100,
      estimatedTime,
      printTime,
    })
  }

  useEffect(() => {
    calculateQuote()
  }, [formData])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.name.toLowerCase().endsWith(".stl")) {
      setUploadedFile(file)

      // Quick volume estimation from file
      try {
        const arrayBuffer = await file.arrayBuffer()
        const dataView = new DataView(arrayBuffer)

        // Simple volume estimation based on file size and triangle count
        const triangleCount = dataView.getUint32(80, true)
        const estimatedVolume = Math.max(1, triangleCount * 0.001) // Rough estimation

        setFormData((prev) => ({
          ...prev,
          volume: Math.round(estimatedVolume * 100) / 100 + "",
        }))
      } catch (error) {
        console.error("Error processing STL file:", error)
      }
    } else {
      alert("Please upload a valid STL file")
    }
  }

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
            className="bg-black border border-gray-800 rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold flex items-center">
                <Calculator className="w-6 h-6 mr-2 text-yellow-500" />
                3D Printing Quote Calculator
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 p-6">
              {/* Input Form */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-blue-400">Model Specifications</h3>

                  <div className="space-y-4">
                    {/* File Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Upload STL File (Optional)</label>
                      <div className="relative">
                        <input
                          type="file"
                          accept=".stl"
                          onChange={handleFileUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-gray-500 transition-colors">
                          <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm text-gray-400">
                            {uploadedFile ? uploadedFile.name : "Click to upload STL file for auto-calculation"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Volume (cm³)</label>
                      <Input
                        type="number"
                        step="0.1"
                        value={formData.volume}
                        onChange={(e) => handleInputChange("volume", e.target.value)}
                        placeholder="Enter model volume"
                        className="bg-gray-900/50 border-gray-700"
                      />
                      <p className="text-xs text-gray-400 mt-1">Upload an STL file for automatic volume calculation</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Material</label>
                      <select
                        value={formData.material}
                        onChange={(e) => handleInputChange("material", e.target.value)}
                        className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-white"
                      >
                        <option value="PLA">PLA - $0.25/cm³ (Standard, Easy)</option>
                        <option value="PETG">PETG - $0.35/cm³ (Durable, Chemical Resistant)</option>
                        <option value="ABS">ABS - $0.40/cm³ (Strong, Heat Resistant)</option>
                        <option value="TPU">TPU - $0.55/cm³ (Flexible, Rubber-like)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Quantity</label>
                        <Input
                          type="number"
                          min="1"
                          max="100"
                          value={formData.quantity}
                          onChange={(e) => handleInputChange("quantity", e.target.value)}
                          className="bg-gray-900/50 border-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Infill (%)</label>
                        <select
                          value={formData.infill}
                          onChange={(e) => handleInputChange("infill", e.target.value)}
                          className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-white"
                        >
                          <option value="10">10% (Lightweight, Decorative)</option>
                          <option value="20">20% (Standard, Good Strength)</option>
                          <option value="50">50% (Strong, Functional)</option>
                          <option value="100">100% (Maximum Strength)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Layer Height (mm)</label>
                      <select
                        value={formData.layerHeight}
                        onChange={(e) => handleInputChange("layerHeight", e.target.value)}
                        className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-white"
                      >
                        <option value="0.1">0.1mm (Ultra High Detail, Slow)</option>
                        <option value="0.2">0.2mm (High Detail, Standard)</option>
                        <option value="0.3">0.3mm (Good Detail, Fast)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-green-400">Additional Services</h3>

                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.supportMaterial}
                        onChange={(e) => handleInputChange("supportMaterial", e.target.checked)}
                        className="mr-3 rounded border-gray-700 bg-gray-900"
                      />
                      <span>Support Material Removal (+$0.08/cm³)</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.postProcessing}
                        onChange={(e) => handleInputChange("postProcessing", e.target.checked)}
                        className="mr-3 rounded border-gray-700 bg-gray-900"
                      />
                      <span>Post-Processing (Sanding, Finishing) (+$8-15)</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.rushDelivery}
                        onChange={(e) => handleInputChange("rushDelivery", e.target.checked)}
                        className="mr-3 rounded border-gray-700 bg-gray-900"
                      />
                      <span>Rush Delivery (+60% total cost)</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Quote Display */}
              <div className="bg-gray-900/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-yellow-400 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Price Breakdown
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="flex items-center">
                      <Layers className="w-4 h-4 mr-2 text-blue-400" />
                      Material Cost
                    </span>
                    <span className="font-semibold">${quote.materialCost.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-green-400" />
                      Labor Cost
                    </span>
                    <span className="font-semibold">${quote.laborCost.toFixed(2)}</span>
                  </div>

                  {quote.additionalCosts > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                      <span>Additional Services</span>
                      <span className="font-semibold">${quote.additionalCosts.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-3 text-xl font-bold text-yellow-400 border-t-2 border-yellow-400">
                    <span>Total Cost</span>
                    <span>${quote.totalCost.toFixed(2)}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                      <div className="flex items-center mb-1">
                        <Clock className="w-4 h-4 mr-2 text-blue-400" />
                        <span className="font-semibold text-sm">Print Time</span>
                      </div>
                      <span className="text-blue-400">{quote.printTime}</span>
                    </div>

                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                      <div className="flex items-center mb-1">
                        <Clock className="w-4 h-4 mr-2 text-green-400" />
                        <span className="font-semibold text-sm">Delivery</span>
                      </div>
                      <span className="text-green-400">{quote.estimatedTime}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4">
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                      Request This Quote
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      Save Quote
                    </Button>
                  </div>

                  <div className="text-xs text-gray-400 pt-2">
                    * Prices are estimates. Final quote may vary based on model complexity and specific requirements.
                    Upload your STL file for the most accurate pricing.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
