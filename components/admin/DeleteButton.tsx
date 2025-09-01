'use client'

import { deleteTool } from '@/app/admin/actions'

interface DeleteButtonProps {
  id: number
  name: string
}

export default function DeleteButton({ id, name }: DeleteButtonProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    const confirmDelete = window.confirm(`Are you sure you want to delete "${name}"?`)
    
    if (confirmDelete) {
      const form = event.currentTarget
      form.submit()
    }
  }
  
  return (
    <form action={deleteTool} onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <button 
        type="submit"
        className="text-destructive hover:underline font-medium"
      >
        Delete
      </button>
    </form>
  )
}
