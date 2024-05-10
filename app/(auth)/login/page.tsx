'use client'

import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'
import { api } from '@/lib/api'

const Page: NextPage = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const action = (fd: FormData) =>
    startTransition(async () => {
      const inp = Object.fromEntries(fd)
      const { error, data } = await api.user['sign-in'].post({
        email: String(inp.email),
        password: String(inp.password),
      })
      if (error) toast.error(error.value.message)
      else {
        toast.success(data.message)
        router.push('/')
        router.refresh()
      }
    })

  return (
    <form action={action}>
      {fields.map((field) => (
        <FormField key={field.name} {...field} disabled={isPending} />
      ))}
      <Button className="w-full" isLoading={isPending}>
        Login
      </Button>
    </form>
  )
}

const fields = [
  { name: 'email', label: 'Email', placeholder: 'Enter your email', type: 'email' },
  { name: 'password', label: 'Password', placeholder: 'Enter your password', type: 'password' },
]

export default Page
