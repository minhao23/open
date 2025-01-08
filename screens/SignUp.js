import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";

const SignUp = () => {
  const [identifier, setIdentifier] = useState(""); // Email or phone number
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    "Rubik-Regular": require("../assets/fonts/Rubik/static/Rubik-Regular.ttf"),
    "Rubik-Bold": require("../assets/fonts/Rubik/static/Rubik-Bold.ttf"),
  });

  const handleSignUp = async () => {
    if (!username.trim()) {
      Alert.alert("Validation Error", "Username cannot be empty.");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Validation Error", "Email cannot be empty.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Validation Error",
        "Passwords do not match. Please try again."
      );
      return;
    }

    try {
      setLoading(true);

      // Firebase email sign-up
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Update Firebase profile with username
      await updateProfile(user, { displayName: username });

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        username: username,
        createdAt: new Date(),
      });

      Alert.alert("Success", "Sign-up successful!");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error signing up: ", error);

      // Enhanced error handling
      let errorMessage =
        "An unexpected error occurred. Please try again later.";
      if (error.code) {
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage =
              "This email is already in use. Please use a different email or sign in.";
            break;
          case "auth/invalid-email":
            errorMessage =
              "The email address is invalid. Please enter a valid email.";
            break;
          case "auth/weak-password":
            errorMessage =
              "The password is too weak. Please use a stronger password (at least 6 characters).";
            break;
          case "auth/operation-not-allowed":
            errorMessage =
              "Email/password accounts are not enabled. Please contact support.";
            break;
          case "auth/network-request-failed":
            errorMessage =
              "A network error occurred. Please check your internet connection.";
            break;
          case "firestore/permission-denied":
            errorMessage =
              "Permission denied. Please ensure proper Firestore rules are set.";
            break;
          default:
            errorMessage = error.message || errorMessage;
            break;
        }
      }

      Alert.alert("Sign-Up Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <Text style={styles.title}>Sign Up</Text>

        {/* Input fields */}
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
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
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
        />

        {/* Sign-up Button or Loading Indicator */}
        {loading ? (
          <ActivityIndicator
            style={styles.loading}
            size="large"
            color="#116466"
          />
        ) : (
          <Button title="Sign Up" onPress={handleSignUp} />
        )}
      </KeyboardAvoidingView>
    </ScrollView>
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
    fontFamily: "Rubik-Bold",
    color: "#333",
  },
  loading: {
    marginTop: 20,
  },
});

export default SignUp;
