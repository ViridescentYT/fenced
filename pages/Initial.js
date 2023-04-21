import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import Placeholder from "../assets/Jensen_Ackles_as_Dean_Winchester.png";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/core";
import { signOut } from "firebase/auth";

const Initial = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    getDoc(docRef).then((docSnap) => {
      const data = docSnap.data();
      setName(data.name);
      setEmail(auth.currentUser.email);
    });
  }, []);

  return (
    <SafeAreaView style={{ padding: 10, flex: 1 }}>
      <View style={{ marginTop: 100, flexDirection: "row", gap: 10 }}>
        <View
          style={{
            width: 80,
            height: 80,
            overflow: "hidden",
            borderRadius: 50,
          }}
        >
          <Image
            source={Placeholder}
            style={{
              alignSelf: "center",
              flex: 1,
              aspectRatio: 1,
            }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 40, fontWeight: "bold" }}>Hi, {name}</Text>
          <Text style={{ color: "grey" }}>{email}</Text>
        </View>
      </View>
      <View style={{ width: "60%" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#202020",
            padding: 10,
            marginTop: 10,
            borderRadius: 2,
          }}
          onPress={() => {
            signOut(auth).then((data) => {
              console.log("Logged out");
              navigation.navigate("Login");
            });
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Initial;
