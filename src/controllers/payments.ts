import { Request, Response } from "express";
import { PaymentModel } from "../models/payment.model";

export const getAllPayments = async (req: Request, res: Response) => {
  try {
    const data = await PaymentModel.getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo pagos" });
  }
};

export const getPayId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await PaymentModel.getById(id);
    if (!data) return res.status(404).send("No se encontró el pago");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send("Error buscando el pago");
  }
};

export const insertPayment = async (req: Request, res: Response) => {
  try {
    const nuevaTransaccion = await PaymentModel.insert(req.body);
    res.status(201).json(nuevaTransaccion);
  } catch (error) {
    res.status(500).send("No se pudo crear la transacción");
  }
};

export const deletePayment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await PaymentModel.delete(id);
    if (!result?.deletedCount) return res.status(404).send("Pago no encontrado");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send("Error eliminando el pago");
  }
};
