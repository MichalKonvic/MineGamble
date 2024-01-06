import { z } from "zod"

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(2, { message: "Password must be at least 2 characters long" })
  })


export {formSchema}