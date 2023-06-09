import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Initial from "./pages/Initial";
import Login from "./pages/Login";
import Register from "./pages/Register";
import * as TaskManager from "expo-task-manager";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Attendance from "./features/Attendance";
import { GeofencingEventType } from "expo-location";
import { markAttendance } from "./features/Attendance";
import { auth, db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const store = configureStore({
  reducer: {
    attendance: Attendance,
  },
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Login"
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Initial" component={Initial} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

TaskManager.defineTask("geofencing_demo", ({ data, error }) => {
  if (error) {
    return;
  }

  if (data.eventType === GeofencingEventType.Enter) {
    console.log("You have entered region!");
    store.dispatch(markAttendance());
    if (auth.currentUser) {
      const date = new Date();
      setDoc(
        doc(db, "users", auth.currentUser.uid),
        {
          attendance: {
            [date.getFullYear()]: {
              [date.toLocaleString("default", { month: "long" })]: {
                [date.getDate()]: {
                  present: true,
                },
              },
            },
          },
        },
        { merge: true }
      ).then((data) => {
        console.log("Attendance Marked");
      });
    }
  }

  if (data.eventType === GeofencingEventType.Exit) {
    console.log("You have exited region!");
  }
});
