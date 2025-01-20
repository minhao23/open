const fetchRestaurants = async (latitude, longitude) => {
  const API_KEY = AIzaSyDq - Z83_RWNLM1ByxoyNxw - pW34rq5cM2A;
  const radius = 5000; // Search within 5km
  const type = "restaurant";
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results.slice(0, 5); // Return top 5 restaurants
  } catch (error) {
    console.error("Error fetching restaurants: ", error);
    return [];
  }
};
