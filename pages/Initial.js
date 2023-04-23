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
  }, []);

  useEffect(() => {
    const requestPermissions = async () => {
      await requestForegroundPermissionsAsync();
      await requestBackgroundPermissionsAsync();
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
    stopGeofencingAsync("GEOFENCING_DEMO").then((data) => {
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
              navigation.navigate("Login");
            });
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>You attendance has been</Text>
        <Text>{isMarked ? "Marked" : "Not Marked"}</Text>
      </View>

      <View>
        <TouchableOpacity
          style={{ backgroundColor: "#202020", padding: 10, marginTop: 10 }}
          onPress={startGeofencing}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Start Geofencing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "#202020", padding: 10, marginTop: 10 }}
          onPress={stopGeofencing}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Stop Geofencing
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{ backgroundColor: "#202020", padding: 10, marginTop: 10 }}
        onPress={() => {}}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Invert Attendance
        </Text>
      </TouchableOpacity>
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
