import { redirect } from 'next/navigation'

export default function AdminPage() {
  // Redirect to dashboard - the layout will handle authentication
  redirect('/admin/dashboard')
}
