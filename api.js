import axios from "axios";

export const postSpot = (coordinate, values, user, uri) => {
  const parkingSpot = new FormData();
  parkingSpot.append("name", values.name);
  parkingSpot.append("description", values.description);
  parkingSpot.append("longitude", coordinate.longitude);
  parkingSpot.append("latitude", coordinate.latitude);
  parkingSpot.append("opening_time", values.opening_time);
  parkingSpot.append("closing_time", values.closing_time);
  parkingSpot.append("time_limit", values.time_limit);
  parkingSpot.append("parking_type", values.parking_type);
  parkingSpot.append("creator", user.username);

  if (uri) {
    let uriParts = uri.split(".");
    let fileType = uriParts[uriParts.length - 1];
    parkingSpot.append("images", {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
  }

  axios
    .post("https://wepark-be.herokuapp.com/api/spots", parkingSpot, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("the post request was a success");
      return JSON.stringify(response.data);
    })
    .then((spots) => {
      console.log("spots post request in api.js", spots);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getSpots = () => {
  return axios
    .get(
      "https://wepark-be.herokuapp.com/api/spots?radius=10000000000000000000000000"
    )
    .then(({ data }) => {
      return data;
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

export const getSingleSpot = (spot_id) => {
  return axios
    .get(`https://wepark-be.herokuapp.com/api/spots/${spot_id}`)
    .then(({ data }) => {
      return data;
    });
};

export const deleteSpot = (spot_id) => {
  console.log("delete being executed");
  axios
    .delete(`https://wepark-be.herokuapp.com/api/spots/${spot_id}`)
    .then(({ data }) => {
      return data;
    });
};

const a = {
  spot_id: 68,
  name: "HHhshsggegegd",
  latitude: -1.5760861337184906,
  longitude: -1.5760861337184906,
  opening_time: null,
  closing_time: null,
  time_limit: null,
  parking_type: "street",
  vote_count: 0,
};
const b = {
  spot_id: 62,
  name: "Gshahahaha",
  latitude: -1.5784082561731339,
  longitude: -1.5784082561731339,
  opening_time: null,
  closing_time: null,
  time_limit: null,
  parking_type: "street",
  vote_count: 0,
};
