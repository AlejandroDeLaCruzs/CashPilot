import PaymentSchema from "../schemas/user"
import express, {
    type NextFunction,
    type Request,
    type Response,
} from "express";

export const validatePayment = (body: any) => {
    return PaymentSchema.safeParse(body)
}

export const paymentMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const result = validatePayment(req.body);
    if (!result.success) {
        return res.status(400).json({
            message: "Error en el body", 
        });
    }
    req.body = result.data; // opcional: body ya validado y transformado
    next();
};