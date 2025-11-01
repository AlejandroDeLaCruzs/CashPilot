import { getDb } from "../config/db";
import { ObjectId } from "mongodb";
import { Request, Response } from "express";


const collection = () => getDb().collection("Payments");

export const getAllPayments = async (req: Request, res: Response) => {
  try {
    const data = await collection().find().toArray();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send("Error obteniendo pagos");
  }
};

//Get de un pago o un icome en concreto
export const getPayId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).send("El no es valido");
    const data = await collection().findOne({
      _id: new ObjectId(id),
    })
    !data ? res.status(404).send("No hay ninguna persona con ese id") : res.status(200).send(data);
  } catch (error) {
    console.log("error al buscar un pago con un id");
  }

}


//Balance
/*router.get("/balance", (req, res) => {

})*/


export const insertPayment = async (req: Request, res: Response) => {
  //VAlidaciones
  try {
    const nuevaTransacion = await collection().insertOne(req.body)
    res.status(202).send(nuevaTransacion);
  } catch (error) {
    console.log("no se ha podido crear una transicion");
  }
}


export const deletePayment = async (req: Request, res: Response) => {
  const id = req.params.id;
  const deleteOne = await collection().deleteOne({
    _id: new ObjectId(id),
  })
  !deleteOne ? res.status(404).send("Pago no encontrado") : res.status(200).send(deleteOne);
}
