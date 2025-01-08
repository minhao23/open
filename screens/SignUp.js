import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const SignUp = () => {
  const [identifier, setIdentifier] = useState(""); // Email or phone number
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (!username.trim()) {
      alert("Username cannot be empty.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    try {
      setLoading(true);

      if (isPhone) {
        // Phone number sign-up
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

        // Prompt the user for the OTP sent to their phone
        const otp = prompt("Enter the OTP sent to your phone");
        const userCredential = await confirmationResult.confirm(otp);

        const user = userCredential.user;

        // Update the user's profile
        await updateProfile(user, { displayName: username });

        // Add user details to Firestore
        await setDoc(doc(db, "users", user.uid), {
          phone: user.phoneNumber,
          username: username,
          createdAt: new Date(),
        });
      } else {
        // Email sign-up
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          identifier,
          password
        );

        const user = userCredential.user;

        // Update the user's profile
        await updateProfile(user, { displayName: username });

        // Add user details to Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          username: username,
          createdAt: new Date(),
        });
      }

      alert("Sign-up successful!");
      navigation.navigate("Login"); // Navigate back to login page after successful sign-up
    } catch (error) {
      console.error("Error signing up: ", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsPhone(!isPhone);
    setIdentifier("");
    setPassword("");
    setConfirmPassword(""); // Reset confirm password when switching modes
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />

        <TextInput
          style={styles.input}
          placeholder={
            isPhone
              ? "Phone Number (e.g., +1234567890), please include country code"
              : "Email"
          }
          value={identifier}
          onChangeText={(text) => setIdentifier(text)}
          keyboardType={isPhone ? "phone-pad" : "email-address"}
          autoCapitalize="none"
        />

        <>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry
          />
        </>

        <View id="recaptcha-container" />
      </KeyboardAvoidingView>

      {loading ? (
        <ActivityIndicator style={styles.loading} size="small" />
      ) : (
        <>
          <Button title="Sign Up" onPress={handleSignUp} />
          <Button
            title={`Switch to ${isPhone ? "Email" : "Phone"} Sign-Up`}
            onPress={toggleAuthMode}
          />
        </>
      )}
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

export default SignUp;
