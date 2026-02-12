"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import React, { useState } from 'react'
import { formSchema } from "@/schema/loginValidation"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import Loading from "../loading"
import Link from "next/link"




  


export default function Login() {
  const [isloading, setIsLoading] = useState(false)

 let searchParams= useSearchParams();
 console.log(searchParams.get('error'));
 



  // 1. Define your form.
type FormFields = z.infer<typeof formSchema>;

const form = useForm<FormFields>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    email: "",
    password: ""
  },
});

// 2. Define a submit handler.
async function onSubmit(values: FormFields) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  setIsLoading(true)

  const response = await signIn('credentials', {
    email: values.email,
    password: values.password,
    callbackUrl: '/product',
    redirect:true
  });
  setIsLoading(false)
  console.log(response);
}
  return <>
   <div className="min-h-[75vh] flex items-center justify-center bg-muted/40 px-4">
    <div className="w-full max-w-md bg-background p-8 rounded-2xl shadow-lg border">
      <h2 className="text-2xl font-bold text-center mb-6">
        Login 
      </h2>

      <Form {...form}>
        {searchParams.get('error') && <h2 className="text-red-500 text-center">{searchParams.get('error')}</h2>}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@email.com"
                    {...field}
                  />
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
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit">
            {isloading && <span className='animate-spin'><Loading /></span>}Login
          </Button >
         <Link href='/forgot-password'>
         <Button className="w-full" type="submit"> forgot password</Button>
         </Link>
        </form>
      </Form>

     
    </div>
  </div>
</>
}
