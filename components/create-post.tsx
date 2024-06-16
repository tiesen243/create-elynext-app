'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'

import { FormField } from '@/components/form-field'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/api'

export const CreatePost: React.FC = () => {
  const ref = useRef<HTMLFormElement>(null)
  const queryClient = useQueryClient()

  const { mutate, error, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { error } = await api.post.create.post({
        title: String(formData.get('title')),
        content: String(formData.get('content')),
      })

      if (error) throw error.value
      await queryClient.invalidateQueries({ queryKey: ['posts'] })
      ref.current?.reset()
    },
  })

  return (
    <form ref={ref} action={mutate} className="mb-4 space-y-4">
      <FormField label="Title" name="title" error={error?.fieldErrors?.title} />
      <FormField label="Content" name="content" error={error?.fieldErrors?.content} asChild>
        <Textarea />
      </FormField>

      <Button className="w-full" isLoading={isPending}>
        Create Post
      </Button>
    </form>
  )
}
