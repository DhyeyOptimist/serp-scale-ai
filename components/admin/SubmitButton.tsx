'use client'

import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'

interface Props {
  children: React.ReactNode
}

export default function SubmitButton({ children }: Props) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Submitting…' : children}
    </Button>
  )
}

