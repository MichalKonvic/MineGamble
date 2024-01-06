import { z } from "zod"

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string()
  })


export {formSchema}