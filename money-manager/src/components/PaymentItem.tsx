import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Payment } from "../api/payments";

interface Props {
  item: Payment;
  onDelete: (id: string) => void;
}

export default function PaymentItem({ item, onDelete }: Props) {
  const isIncome = item.paymentMethod === "Income";
  const dateFormatted = item.paymentDate
    ? new Date(item.paymentDate).toLocaleDateString()
    : "—";

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={[styles.amount, isIncome ? styles.income : styles.expense]}>
          {isIncome ? "+" : "-"}
          {item.amount.toFixed(2)} €
        </Text>
        <Text style={styles.date}>{dateFormatted}</Text>
      </View>

      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.method}>
        {isIncome ? "💰 Ingreso" : "💸 Gasto"}
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="Eliminar" color="#e74c3c" onPress={() => onDelete(item._id!)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  income: {
    color: "#2ecc71",
  },
  expense: {
    color: "#e74c3c",
  },
  date: {
    color: "#888",
    fontSize: 14,
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 6,
  },
  method: {
    color: "#555",
    fontStyle: "italic",
    marginBottom: 8,
  },
  buttonContainer: {
    alignItems: "flex-end",
  },
});
