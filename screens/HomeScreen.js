import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";

// Replace this with your actual Google API key
const GOOGLE_PLACES_API_KEY = "AIzaSyDq-Z83_RWNLM1ByxoyNxw-pW34rq5cM2A";

const TopRestaurants = ({ location }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      console.log(location);
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=5000&type=restaurant&rankby=prominence&key=${GOOGLE_PLACES_API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const topRestaurants = data.results.slice(0, 5);
        setRestaurants(topRestaurants);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [location]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.restaurantList}>
      {restaurants.map((restaurant, index) => (
        <View key={index} style={styles.restaurantCard}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantRating}>
            Rating: {restaurant.rating || "N/A"}
          </Text>
          <Text style={styles.restaurantAddress}>{restaurant.vicinity}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const HomeScreen = () => {
  // Replace this with your location data (latitude & longitude)
  const location = { latitude: 37.7749, longitude: -122.4194 };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.icon}>⚙️</Text>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.icon}>👤</Text>
      </View>

      {/* Top Restaurants Section */}
      <View style={styles.scrollContainer}>
        <TopRestaurants location={location} />
      </View>

      {/* Enlarged Button Row */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.largeButton}>
          <Text style={styles.buttonText}>Button</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.largeButton}>
          <Text style={styles.buttonText}>Button</Text>
        </TouchableOpacity>
      </View>

      {/* Enlarged Full-Width Button */}
      <TouchableOpacity style={styles.fullWidthButton}>
        <Text style={styles.buttonText}>Button</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  icon: {
    fontSize: 24,
    color: "#800000",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#800000",
  },
  scrollContainer: {
    flex: 0.95,
    marginVertical: 10,
  },
  restaurantList: {
    flexGrow: 1,
    backgroundColor: "#aaa",
    borderRadius: 10,
    padding: 20,
  },
  restaurantCard: {
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
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  restaurantRating: {
    fontSize: 16,
    color: "#666",
  },
  restaurantAddress: {
    fontSize: 14,
    color: "#999",
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  largeButton: {
    flex: 1,
    marginHorizontal: 5,
    height: 80, // Increased height for larger buttons
    backgroundColor: "#008CBA",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  fullWidthButton: {
    marginTop: 10,
    height: 80, // Increased height for the full-width button
    backgroundColor: "#008CBA",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default HomeScreen;
