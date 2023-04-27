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
import {
  requestForegroundPermissionsAsync,
  requestBackgroundPermissionsAsync,
  startGeofencingAsync,
  stopGeofencingAsync,
  hasStartedGeofencingAsync,
} from "expo-location";
import { useSelector } from "react-redux";

const Initial = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigation = useNavigation();
  const { isMarked } = useSelector((state) => state.attendance.value);

  useEffect(() => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    getDoc(docRef).then((docSnap) => {
      const data = docSnap.data();
      setName(data.name);
      setEmail(auth.currentUser.email);
    });

    const requestPermissions = async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status === "granted") {
        const { status } = await requestBackgroundPermissionsAsync();
        if (status === "granted") {
          startGeofencing();
        }
      }
    };

    requestPermissions();
  }, []);

  const startGeofencing = () => {
    startGeofencingAsync("geofencing_demo", [
      {
        latitude: 23.282134,
        longitude: 77.456236,
        radius: 40,
      },
    ]).then((data) => {
      console.log("Geofencing Started!");
    });
  };

  const stopGeofencing = () => {
    stopGeofencingAsync("geofencing_demo").then((data) => {
      console.log("Geofencing Stopped!");
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
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
              hasStartedGeofencingAsync("geofencing_demo").then(
                (geofencingStatus) => {
                  if (geofencingStatus) {
                    stopGeofencing();
                    navigation.navigate("Login");
                  }
                }
              );
            });
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: "60%", alignItems: "center", marginTop: 40 }}>
        <Text
          style={{
            color: "#202020",
            fontWeight: "bold",
            fontSize: 24,
            textAlign: "center",
          }}
        >
          Your attendance is being tracked.
        </Text>
        <View
          style={{
            width: "100%",
            paddingVertical: 10,
            backgroundColor: isMarked ? "lightgreen" : "#FF6D60",
            alignItems: "center",
            borderRadius: 4,
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#202020", fontSize: 20, fontWeight: "600" }}>
            {isMarked ? "Marked" : "Not Marked"}
          </Text>
        </View>
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
