import {
  View,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../FirebaseConfig";
import { TextInput } from "react-native-gesture-handler";
import {
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // Email, phone, or username
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  const navigation = useNavigation();

  const isEmail = (input) => /\S+@\S+\.\S+/.test(input);
  const isPhone = (input) => /^\+\d{10,15}$/.test(input); // E.g., +1234567890

  const signIn = async () => {
    try {
      setLoading(true);

      if (isEmail(identifier)) {
        // Login with email
        await signInWithEmailAndPassword(auth, identifier, password);
      } else if (isPhone(identifier)) {
        // Login with phone number
        const appVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {},
          auth
        );
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          identifier,
          appVerifier
        );
        const otp = prompt("Enter the OTP sent to your phone");
        await confirmationResult.confirm(otp);
      } else {
        // Login with username
        const userDoc = await getDoc(doc(db, "users", identifier));
        if (userDoc.exists()) {
          const userEmail = userDoc.data().email;
          await signInWithEmailAndPassword(auth, userEmail, password);
        } else {
          throw new Error("Invalid username.");
        }
      }

      alert("Login successful!");
      // Add navigation to the next screen
    } catch (error) {
      console.error("Error during login:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email, Phone, or Username"
          value={identifier}
          onChangeText={(text) => setIdentifier(text)}
          autoCapitalize="none"
        />
      </KeyboardAvoidingView>

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator style={styles.loading} size="small" />
      ) : (
        <>
          <Button title="Login" onPress={signIn} />
          <Button title="Sign Up" onPress={navigateToSignUp} />
        </>
      )}
      <View id="recaptcha-container" />
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
