import  * as z  from "zod"


export const Schema = z.object({
    name: z.string().nonempty('required').min(3,'min must be over 3 char').max(15,'must be less than 15 char'),
    email:z.email('invalid email').nonempty('required'),
    password:z.string().nonempty('required').min(6,"password required"),
    rePassword:z.string(),
    phone: z.string().regex(/^01[0125][0-9]{8}$/,'Invalid Egyptian phone number')

  }).refine((object)=>object.password==object.rePassword,{
    path:['rePassword'],
    error:'password & rePassword must be same'
  } )