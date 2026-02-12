'use client'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    email: z.string().min(1, "required").email("Invalid email"),
  });

export default function ForgotPassword() {

    const [loading, setLoading] = useState(false)
  const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
        },
      });


      async function forgotPassword(email: string) {
        
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          }
        );
    
        return res.json();
      }
      async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
          const data = await forgotPassword(values.email);
    
          if (data.statusMsg === "success") {
            toast.success("Code sent to your email");
            router.push("/verify-code"); // redirect to verify page
          } else {
            toast.error(data.message || "Something went wrong");
          }
        } catch (error) {
          toast.error("Network error, try again");
          console.error(error);
        } finally {
          setLoading(false);
        }
      }




    
      

  return <>
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-2 text-center">
          Forgot Password
        </h1>

        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your email 
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Code"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
</>
  
}
