import z from "zod";

const PaymentSchema = z.object({
  amount: z.number().min(1, "El monto del pago debe ser al menos 1"),

  paymentMethod: z.enum(["Income", "Pago"]),
  
  paymentDate: z.string().refine(
    (date) => !isNaN(Date.parse(date)),
    { message: "La fecha debe ser válida (formato ISO)" }
  ),

  description: z.string().min(3, "La descripción debe tener al menos 3 caracteres"),
});


export default PaymentSchema;
