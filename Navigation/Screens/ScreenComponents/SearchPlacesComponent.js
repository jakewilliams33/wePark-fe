import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import React from "react";
import { GOOGLE_MAPS_APIKEY } from "@env";

export default function SearchPlacesComponent({
  userLocation,
  setSearchLocation,
  setSearchRegion,
}) {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      fetchDetails={true}
      GooglePlacesSearchQuery={{
        rankby: "distance",
      }}
      onPress={(data, details = null) => {
        setSearchLocation({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
        setSearchRegion({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      }}
      query={{
        key: GOOGLE_MAPS_APIKEY,
        language: "en",
        components: "country:uk",
        location: `${userLocation.coords.latitude}, ${userLocation.coords.longitude}`,
      }}
    />
  );
}
