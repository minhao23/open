import { View, Text, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { TextInput } from "react-native-gesture-handler";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <View style={styles.button}>
        <Button
          title="Login"
          color="#fff"
          onPress={() => {
            setLoading(true);
            // Add your login logic here
          }}
        />
      </View>
      {loading && <ActivityIndicator style={styles.loading} size="small" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  input: {
    width: "100%",
    height: 50,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 10,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#116466",
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  loading: {
    marginTop: 10,
    color: "#888",
  },
});

export default Login;
