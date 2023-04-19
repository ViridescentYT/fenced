import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Initial from "./pages/Initial";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Initial"
      >
        <Stack.Screen name="Initial" component={Initial} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
