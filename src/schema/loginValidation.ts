import  * as z  from "zod"


export const formSchema = z.object({
    email: z.string().email('invalid email').min(1, 'required'),
    password: z.string().min(1, 'required').min(6, "password must be at least 6 characters")
})