import React from "react";
import * as Location from "expo-location";

const useLocation = () => {
  const [location, setLocation] =
    React.useState<
      Pick<Location.LocationObjectCoords, "latitude" | "longitude">
    >();

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const result = await Location.getLastKnownPositionAsync();
      if (result) {
        const { latitude, longitude } = result.coords;
        setLocation({ latitude, longitude });
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getLocation();
  }, []);

  return location;
};

export default useLocation;
