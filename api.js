import axios from "axios";

export const postSpot = (coordinate, values) => {
  const parkingSpot = {
    name: values.name,
    description: values.description,
    longitude: coordinate.longitude,
    latitude: coordinate.latitude,
    opening_time: values.opening_time,
    closing_time: values.closing_time,
    time_limit: values.time_limit,
    parking_type: values.parking_type,
    creator: "testUser",
  };
  console.log(parkingSpot);
  //axios.post("https://wepark-be.herokuapp.com/api/spots", parkingSpot);
};

export const getSpots = () => {
  return axios
    .get("https://wepark-be.herokuapp.com/api/spots")
    .then(({ data }) => {
      return data;
    });
};
