import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { auth, db } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/core";
import { doc, setDoc } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password).then((user) => {});
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Initial");
      }
    });

    return unsubscribe;
  }, []);

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
          value={email}
          onChangeText={(text) => setEmail(text)}
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
          value={password}
          onChangeText={(text) => setPassword(text)}
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
          onPress={signIn}
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
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={{ textAlign: "center" }}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
