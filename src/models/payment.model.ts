import { getDb } from "../config/db";
import { ObjectId } from "mongodb";

const collection = () => getDb().collection("Payments");

export const PaymentModel = {
  getAll: async () => await collection().find().toArray(),

  getById: async (id: string) => {
    if (!ObjectId.isValid(id)) return null;
    return await collection().findOne({ _id: new ObjectId(id) });
  },

  insert: async (payment: any) => await collection().insertOne(payment),

  delete: async (id: string) => {
    if (!ObjectId.isValid(id)) return null;
    return await collection().deleteOne({ _id: new ObjectId(id) });
  },
};
