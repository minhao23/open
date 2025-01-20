import Geolocation from "react-native-geolocation-service";

export const getUserLocation = (onSuccess, onError) => {
  Geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      onSuccess({ latitude, longitude });
    },
    (error) => {
      onError(error);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
};
