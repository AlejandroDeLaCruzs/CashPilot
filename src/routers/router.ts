import { Router } from "express";
import { getAllPayments, getPayId, insertPayment, deletePayment } from "../controllers/payments";
import { paymentMiddleware } from "../middlewares/validateBody";


const router = Router();

router.get("/", getAllPayments)     //Todos los pagos o income del usario
router.get("/:id", getPayId)        //Get de un pago o un icome en concreto
router.post("/", paymentMiddleware, insertPayment);
router.delete("/:id", deletePayment)

export default router;