'use client'
import React, { useRef } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'


export default function CheckOut({cartId}:{cartId: string}) {
    const detailsInput = useRef<HTMLInputElement | null>(null)
    const cityInput = useRef<HTMLInputElement | null>(null)
    const phoneInput = useRef<HTMLInputElement | null>(null)


async function checkOutSession() {
    const shippingAddress = {
        details:detailsInput.current?.value,
        city:cityInput.current?.value,
        phone:phoneInput.current?.value
    }

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000/allorders`, {
        method: "POST",
        body: JSON.stringify({ shippingAddress }),
        headers: {
            token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODJhMmFhYmFiODkzZmViMzY1NDQ2MiIsIm5hbWUiOiJBYmRlbHJhaG1hbiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzcwODQwNTE4LCJleHAiOjE3Nzg2MTY1MTh9.Xu8R40q2c-HUONB7mPf2P3re53NDQbBFusBZMfedeTk",
            'content-type': 'application/json'
        }
    })

    const data = await response.json();
    console.log(data);
    if(data.status== 'success'){
        window.location.href=data.session.url
    }
}
  return <>

<Dialog>
      <DialogTrigger asChild>
        <Button className="w-full h-11 text-base" variant="outline">Proceed to Checkout</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add shipping address</DialogTitle>
          <DialogDescription>
            Make sure that you entered correct address
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              city
            </Label>
            <Input
            ref={cityInput}
              id="city"
             className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              details
            </Label>
            <Input
            ref={detailsInput}
              id="details"
             className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              phone
            </Label>
            <Input
            ref={phoneInput}
              id="phone"
             className="col-span-3"
            />
          </div>
          
        </div>
        <DialogFooter>
          <Button type="submit" onClick={()=>checkOutSession()}>Visa</Button>
          <Button type="submit">Cash</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>


</>
}
