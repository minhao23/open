import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RestaurantCard = ({ name, rating, address }) => (
  <View style={styles.card}>
    <Text style={styles.name}>{name}</Text>
    <Text>Rating: {rating || "N/A"}</Text>
    <Text>Address: {address}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RestaurantCard;
