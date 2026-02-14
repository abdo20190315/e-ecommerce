'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Schema } from '@/schema/registerValidation'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from "sonner"
import { z } from "zod"

type RegisterFormData = z.infer<typeof Schema>

export default function Register() {
  const router = useRouter()

  const form = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    resolver: zodResolver(Schema)
  })

  async function handelRegister(values: RegisterFormData) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      )

      if (data.message === 'success') {
        toast.success("Register Successfully")
        router.push('/login')
      }

    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong")
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg px-5 min-h-[75%]">
        <h1 className='text-2xl font-bold text-green-700 text-center mb-5 tracking-tight'>
          Register
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handelRegister)}>
            <div className="flex flex-col gap-6">

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder="Enter your name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type='email' placeholder="Enter your email..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder="Enter your password..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder="Re-enter your password..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input type='tel' placeholder="Enter your phone..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>

            <Button className="w-full mt-8 bg-green-600">
              Register
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
