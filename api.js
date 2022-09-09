import axios from "axios";

export const postSpot = (coordinate, values, user) => {
  const parkingSpot = {
    name: values.name,
    description: values.description,
    longitude: coordinate.longitude,
    latitude: coordinate.latitude,
    opening_time: values.opening_time,
    closing_time: values.closing_time,
    time_limit: values.time_limit,
    parking_type: values.parking_type,
    creator: user.username,
  };
  axios
    .post("https://wepark-be.herokuapp.com/api/spots", parkingSpot)
    .then((response) => {
      console.log("the post request was a success");
      return response.data;
    })
    .then((spots) => {
      console.log("spots post request in api.js", spots);
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
};

export const getSpots = () => {
  return axios
    .get(
      "https://wepark-be.herokuapp.com/api/spots?radius=10000000000000000000000000"
    )
    .then(({ data }) => {
      return data;
    });
};
