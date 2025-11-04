const API_URL = "http://192.168.1.51:3000/api/payments";
// ⚠️ Sustituye con la IP local de tu PC (no uses localhost)

export interface Payment {
  _id?: string;
  amount: number;
  paymentMethod: "Income" | "Pago";
  paymentDate: string;
  description: string;
}


export const getAllPayments = async (): Promise<Payment[]> => {
  const res = await fetch(API_URL);
  return res.json();
};

export const getPaymentById = async (id: string): Promise<Payment> => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

export const insertPayment = async (payment: Payment): Promise<Payment> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payment),
  });
  return res.json();
};

export const deletePayment = async (id: string): Promise<void> => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
