import { ProtectedRoute } from "@/components/protected-route"

export default function ProtectedPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-6">Protected Page</h1>
        <p className="text-gray-400">This content is only visible to authenticated users.</p>
      </div>
    </ProtectedRoute>
  )
}
