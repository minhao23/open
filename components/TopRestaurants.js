import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import RestaurantCard from "./RestaurantCard"; // Import the reusable component

const GOOGLE_PLACES_API_KEY = "YOUR_GOOGLE_API_KEY_HERE"; // Replace with your API key

const TopRestaurants = ({ location }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
          {
            params: {
              location: `${location.latitude},${location.longitude}`,
              radius: 5000,
              type: "restaurant",
              rankby: "prominence",
              key: GOOGLE_PLACES_API_KEY,
            },
          }
        );

        const topRestaurants = response.data.results.slice(0, 5);
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
    <ScrollView style={styles.container}>
      {restaurants.map((restaurant, index) => (
        <RestaurantCard
          key={index}
          name={restaurant.name}
          rating={restaurant.rating}
          address={restaurant.vicinity}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
});

export default TopRestaurants;
