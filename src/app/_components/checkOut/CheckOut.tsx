'use client'
import React, { useRef } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { checkoutSessionAction } from "@/app/_components/checkOut/_action/checkoutSession.action"

export default function CheckOut({cartId}:{cartId: string}) {
    const detailsInput = useRef<HTMLInputElement | null>(null)
    const cityInput = useRef<HTMLInputElement | null>(null)
    const phoneInput = useRef<HTMLInputElement | null>(null)

    async function checkOutSession() {
        const shippingAddress = {
            details: detailsInput.current?.value,
            city: cityInput.current?.value,
            phone: phoneInput.current?.value
        }

        try {
            const data = await checkoutSessionAction(cartId, shippingAddress);
            console.log(data);

            if (data.status == 'success') {
                window.location.href = data.session.url
            } else {
                alert("Failed to create checkout session");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    }

    return (
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
              <Label htmlFor="city" className="text-right">city</Label>
              <Input ref={cityInput} id="city" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="details" className="text-right">details</Label>
              <Input ref={detailsInput} id="details" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">phone</Label>
              <Input ref={phoneInput} id="phone" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={checkOutSession}>Visa</Button>
            <Button type="button">Cash</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}
