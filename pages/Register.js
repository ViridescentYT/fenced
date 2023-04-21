import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [name, setName] = useState("");
  const [enrollment, setEnrollment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("btech");
  const [selectedBranch, setSelectedBranch] = useState("cse");

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password).then((user) => {
      setDoc(doc(db, "users", user.user.uid), {
        name: name,
        enrollment: enrollment,
        course: selectedCourse,
        branch: selectedBranch,
      }).then((data) => {
        console.log("User Created");
      });
    });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View style={{ width: "80%" }}>
        <TextInput
          placeholder="Name"
          style={{
            backgroundColor: "white",
            padding: 10,
            marginTop: 10,
            borderRadius: 2,
          }}
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
        />
        <TextInput
          placeholder="Enrollment Number"
          style={{
            backgroundColor: "white",
            padding: 10,
            marginTop: 10,
            borderRadius: 2,
          }}
          value={enrollment}
          onChangeText={(text) => {
            setEnrollment(text);
          }}
        />
        <TextInput
          placeholder="Email"
          style={{
            backgroundColor: "white",
            padding: 10,
            marginTop: 10,
            borderRadius: 2,
          }}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
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
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          secureTextEntry
        />
        <Picker
          selectedValue={selectedCourse}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedCourse(itemValue);
            console.log(itemValue);
          }}
          placeholder="Select Course"
          style={{
            backgroundColor: "white",
            padding: 10,
            marginTop: 10,
            borderRadius: 2,
          }}
        >
          <Picker.Item label="BTech" value="btech" />
          <Picker.Item label="MTech" value="mtech" />
        </Picker>
        <Picker
          selectedValue={selectedBranch}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedBranch(itemValue);
            console.log(itemValue);
          }}
          placeholder="Select Branch"
          style={{
            backgroundColor: "white",
            padding: 10,
            marginTop: 10,
            borderRadius: 2,
          }}
        >
          <Picker.Item label="CSE" value="cse" />
          <Picker.Item label="IT" value="it" />
        </Picker>
      </View>
      <View style={{ width: "60%" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#202020",
            padding: 10,
            marginTop: 20,
            borderRadius: 2,
          }}
          onPress={register}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Register;
