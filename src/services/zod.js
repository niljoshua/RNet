
import validator from "validator";
import { z } from "zod";

export const formSchema = z.object({
   name: z.string().min(3,"Nome deve conter no minimo 3 letras"),
   phone: z.string().refine(validator.isMobilePhone, "Telefone invalido")
})