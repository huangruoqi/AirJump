import * as React from "react";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import RigidBodies from './rigid-bodies'

export default function App() {
	return (
		<RigidBodies />
	)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
