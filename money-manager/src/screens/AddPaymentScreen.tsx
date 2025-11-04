import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { insertPayment } from "../api/payments";

export default function AddPaymentScreen({ navigation }: any) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"Income" | "Pago">("Pago");
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleSubmit = async () => {
    if (!amount || !description) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    try {
      const newPayment = {
        amount: parseFloat(amount),
        description,
        paymentMethod,
        paymentDate,
      };

      await insertPayment(newPayment);
      Alert.alert("✅ Éxito", "Pago añadido correctamente");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo añadir el pago");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>➕ Añadir Pago</Text>

      <TextInput
        style={styles.input}
        placeholder="Cantidad (€)"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />

      <View style={styles.switchContainer}>
        <Button
          title={paymentMethod === "Pago" ? "💸 Gasto" : "💰 Ingreso"}
          color={paymentMethod === "Pago" ? "#e74c3c" : "#2ecc71"}
          onPress={() =>
            setPaymentMethod(paymentMethod === "Pago" ? "Income" : "Pago")
          }
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        value={paymentDate}
        onChangeText={setPaymentDate}
      />

      <Button title="Guardar Pago" onPress={handleSubmit} color="#2ecc71" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  switchContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
});
