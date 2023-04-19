import React from "react";
import { SafeAreaView, Text, StyleSheet, View, Image } from "react-native";
import Placeholder from "../assets/Jensen_Ackles_as_Dean_Winchester.png";

const Initial = () => {
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
          <Text style={{ fontSize: 40, fontWeight: "bold" }}>Hi, Ashhar</Text>
          <Text style={{ color: "grey" }}>ashharsiddiqui2002@gmail.com</Text>
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
