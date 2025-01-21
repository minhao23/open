import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RestaurantCard = ({ name, rating, address }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.rating}>Rating: {rating || "N/A"}</Text>
      <Text style={styles.address}>{address}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  rating: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  address: {
    fontSize: 14,
    color: "#999",
    marginTop: 4,
  },
});

export default RestaurantCard;
