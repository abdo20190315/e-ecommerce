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



export default function Register() {
  let router = useRouter()

  const form = useForm({
    defaultValues:{
      
        "name": "",
        "email":"",
        "password":"",
        "rePassword":"",
        "phone":""
    
    },
    resolver:zodResolver(Schema)
  })
 async function handelRegister(values){
    //call api
    try {
      const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
      console.log(data);
      if(data.message=='success'){
        toast.success("Register Successfully")
        router.push('/login')


      }
      
    } catch (error) {
      console.log(data.massege);
      

      
    }
   

console.log(values);

  }
 


  return <>

  <div className="flex justify-center items-center ">
    <div className="w-full max-w-lg bg-white rounded-xl shadow-lg px-5">
      <h1 className='text-2xl font-bold text-green-700 text-center mb-5 tracking-tight'>Register</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handelRegister)}>
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Name</FormLabel>
                <FormControl>
                  <Input type='text' placeholder="Enter your name..." className="mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" {...field} />
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
                <FormLabel className="text-base font-medium">Email</FormLabel>
                <FormControl>
                  <Input type='email' placeholder="Enter your email..." className="mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" {...field} />
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
                <FormLabel className="text-base font-medium">Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder="Enter your password..." className="mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" {...field} />
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
                <FormLabel className="text-base font-medium">Confirm Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder="Re-enter your password..." className="mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" {...field} />
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
                <FormLabel className="text-base font-medium">Phone</FormLabel>
                <FormControl>
                  <Input type='tel' placeholder="Enter your phone..." className="mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-8 bg-green-600">Register</Button>
        </form>
      </Form>
    </div>
  </div>

  
  </>
}
