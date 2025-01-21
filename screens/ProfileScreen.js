import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      {isEditing ? (
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      ) : (
        <Text style={styles.text}>{name}</Text>
      )}

      <Text style={styles.label}>Email:</Text>
      {isEditing ? (
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      ) : (
        <Text style={styles.text}>{email}</Text>
      )}

      <Button
        title={isEditing ? "Save" : "Edit Profile"}
        onPress={isEditing ? handleSave : () => setIsEditing(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    fontSize: 18,
    marginBottom: 20,
  },
});
