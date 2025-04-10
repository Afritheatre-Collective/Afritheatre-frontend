import { z } from "zod";

const formSchema = z.object({
  firstname: z.string().min(1, {
    message: "Please enter your First name",
  }),
  lastname: z.string().min(1, {
    message: "Please enter your Last name",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  subject: z.string().min(1, {
    message: "Please enter a subject",
  }),
  message: z.string().min(3, {
    message: "Message must be at least 3 characters long",
  }),
});

export default formSchema;
