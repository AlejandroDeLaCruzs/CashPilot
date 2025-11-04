import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { Payment, getAllPayments, deletePayment } from "../api/payments";
import PaymentItem from "../components/PaymentItem";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props) {
  const [payments, setPayments] = useState<Payment[]>([]);

  const loadPayments = async () => {
    try {
      const data = await getAllPayments();
      setPayments(data);
    } catch (error) {
      console.error("Error cargando pagos:", error);
    }
  };

  const handleDelete = async (id: string) => {
    await deletePayment(id);
    loadPayments();
  };

  useEffect(() => {
    loadPayments(); // carga inicial
    const unsubscribe = navigation.addListener("focus", loadPayments);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💰 Mis Pagos</Text>

      <FlatList
        data={payments}
        keyExtractor={(item) => item._id!}
        renderItem={({ item }) => (
          <PaymentItem item={item} onDelete={handleDelete} />
        )}
      />

      <Button
        title="Añadir pago"
        onPress={() => navigation.navigate("AddPayment")}
        color="#2ecc71"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});
