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

export const getSingleSpot = (spot_id) => {
  console.log("spot id =", spot_id, "in the api");
  return axios
    .get(`https://wepark-be.herokuapp.com/api/spots/${spot_id}`)
    .then(({ data }) => {
      return data;
    });
};

const g = {
  closing_time: null,
  created_at: "2022-09-09T12:46:55.089Z",
  creator: "Jake",
  description: "Leeeeeeeeds",
  downvotes: 0,
  image_count: 0,
  images: null,
  isbusy: false,
  lastchanged: "2022-09-09T12:46:55.089Z",
  latitude: 53.80564976020919,
  longitude: -1.582925096154213,
  name: "Leeds",
  opening_time: null,
  parking_type: "street",
  spot_id: 35,
  time_limit: null,
  upvotes: 0,
};
