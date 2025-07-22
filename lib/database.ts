import { supabase } from "./supabase"

export interface FormSubmission {
  id?: string
  created_at?: string
  user_id?: string
  form_type: "project" | "3d_print" | "drone" | "consultation"
  name: string
  email: string
  phone?: string
  project_description: string
  details: Record<string, any>
}

export async function submitForm(data: FormSubmission) {
  const { data: submission, error } = await supabase
    .from("form_submissions")
    .insert([
      {
        user_id: data.user_id,
        form_type: data.form_type,
        name: data.name,
        email: data.email,
        phone: data.phone,
        project_description: data.project_description,
        details: data.details,
      },
    ])
    .select()
    .single()

  if (error) {
    console.error("Form submission error:", error)
    throw error
  }
  return submission
}

export async function getUserSubmissions(userId: string) {
  const { data, error } = await supabase
    .from("form_submissions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}
