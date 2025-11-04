import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { getPaymentById, Payment } from "../api/payments";

export default function SearchPaymentScreen() {
  const [id, setId] = useState("");
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!id.trim()) {
      alert("Introduce un ID válido");
      return;
    }

    setLoading(true);
    try {
      const data = await getPaymentById(id.trim());
      if (!data || !data._id) {
        alert("❌ No se encontró ningún pago con ese ID");
        setPayment(null);
      } else {
        setPayment(data);
      }
    } catch (error) {
      console.error(error);
      alert("Error buscando el pago");
      setPayment(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Buscar Pago por ID</Text>

      <TextInput
        style={styles.input}
        placeholder="Introduce el ID del pago"
        value={id}
        onChangeText={setId}
      />

      <Button title={loading ? "Buscando..." : "Buscar"} onPress={handleSearch} disabled={loading} />

      {payment && (
        <View style={styles.card}>
          <Text style={styles.label}>💬 Descripción:</Text>
          <Text style={styles.value}>{payment.description}</Text>

          <Text style={styles.label}>💰 Cantidad:</Text>
          <Text
            style={[
              styles.value,
              payment.paymentMethod === "Income" ? styles.income : styles.expense,
            ]}
          >
            {payment.paymentMethod === "Income" ? "+" : "-"}
            {payment.amount.toFixed(2)} €
          </Text>

          <Text style={styles.label}>📅 Fecha:</Text>
          <Text style={styles.value}>
            {new Date(payment.paymentDate).toLocaleDateString()}
          </Text>

          <Text style={styles.label}>📈 Tipo:</Text>
          <Text style={styles.value}>
            {payment.paymentMethod === "Income" ? "Ingreso" : "Gasto"}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontWeight: "bold",
    color: "#555",
    marginTop: 8,
  },
  value: {
    color: "#333",
    fontSize: 16,
  },
  income: { color: "#2ecc71", fontWeight: "bold" },
  expense: { color: "#e74c3c", fontWeight: "bold" },
});
