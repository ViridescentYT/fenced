import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { auth } from "../firebaseConfig";

const Login = () => {
  console.log(auth);

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View style={{ width: "80%" }}>
        <TextInput
          placeholder="Email"
          style={{
            backgroundColor: "white",
            padding: 10,
            marginTop: 10,
            borderRadius: 2,
          }}
        />
        <TextInput
          placeholder="Password"
          style={{
            backgroundColor: "white",
            padding: 10,
            marginTop: 10,
            borderRadius: 2,
          }}
          secureTextEntry
        />
      </View>
      <View style={{ width: "60%", marginTop: 20 }}>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "#202020",
            borderRadius: 2,
            marginTop: 10,
          }}
        >
          <Text style={{ textAlign: "center", color: "white" }}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            borderColor: "#202020",
            borderWidth: 2,
            marginTop: 10,
          }}
        >
          <Text style={{ textAlign: "center" }}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
