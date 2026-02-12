'use client'
import React, { useState } from "react"
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

import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  newPassword: z.string().min(6, "Password too short"),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function ResetPassword() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function resetPassword(values: z.infer<typeof formSchema>) {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          newPassword: values.newPassword,
        }),
      }
    );

    return res.json();
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      const data = await resetPassword(values);

      if (data.token) {
        toast.success("Password reset successfully");
        router.push("/login");
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Reset Password
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Updating..." : "Reset Password"}
            </Button>

          </form>
        </Form>

      </div>
    </div>
  );
}
