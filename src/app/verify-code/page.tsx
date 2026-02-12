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
  resetCode: z.string().min(4, "Invalid code"),
});

export default function VerifyCode() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resetCode: "",
    },
  });

  async function verifyCode(resetCode: string) {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetCode }),
      }
    );

    return res.json();
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      const data = await verifyCode(values.resetCode);

      if (data.status === "Success") {
        toast.success("Code verified");
        router.push("/reset-password");
      } else {
        toast.error(data.message || "Invalid code");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md">

        <h1 className="text-2xl font-bold mb-2 text-center">
          Verify Code
        </h1>

        <p className="text-sm text-gray-500 text-center mb-6">
          Enter the code sent to your email
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            <FormField
              control={form.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter code"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify Code"}
            </Button>

          </form>
        </Form>

      </div>
    </div>
  );
}
