'use client'

import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'
import { useEffect } from 'react'

interface Props {
  children: React.ReactNode
}

export default function SubmitButton({ children }: Props) {
  const { pending, data, method, action } = useFormStatus() as any
  useEffect(() => {
    if (!pending && data && typeof data.get === 'function') {
      const destination = data.get('destination')
      if (destination) {
        window.location.href = destination as string
      }
    }
  }, [pending, data])
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Submitting…' : children}
    </Button>
  )
}

