import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./src/screens/HomeScreen";
import SearchPaymentScreen from "./src/screens/SearchPaymentScreen";
import AddPaymentScreen from "./src/screens/AddPaymentScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Inicio" component={HomeScreen} />
        <Tab.Screen name="Buscar" component={SearchPaymentScreen} />
        <Tab.Screen name="Pagos" component={AddPaymentScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
