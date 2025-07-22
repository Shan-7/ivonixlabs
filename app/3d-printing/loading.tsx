import { Loader2 } from "lucide-react"

export default function ThreeDPrintingLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <Loader2 className="h-10 w-10 animate-spin text-yellow-500" />
      <p className="mt-4 text-sm text-gray-400">Loading 3D Printing&nbsp;page…</p>
    </div>
  )
}
