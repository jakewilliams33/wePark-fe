import axios from "axios";

export const getSpots = (searchRegion) => {
  console.log("in API.js, getting spots");

  const coords = searchRegion
    ? `?coords=${searchRegion.latitude},${searchRegion.longitude}`
    : "";

  let radius = "10";

  const andOr = searchRegion ? "&" : "?";

  if (searchRegion && searchRegion.latitudeDelta) {
    let miles = searchRegion.latitudeDelta * 69;
    radius = miles.toString();
  }

  console.log(coords, "coords in api");

  return axios
    .get(
      `https://wepark-be.herokuapp.com/api/spots${coords}${andOr}radius=${radius}`
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
  console.log("in API.js, getting single spot, spot_id: ", spot_id);
  return axios
    .get(`https://wepark-be.herokuapp.com/api/spots/${spot_id}`)
    .then(({ data }) => {
      return data;
    })
    .catch(function (error) {
      console.log("ERROR IN getSingleSpot", error);
    });
};

export const deleteSpot = (spot_id) => {
  console.log("In Api.js, delete being executed");
  axios
    .delete(`https://wepark-be.herokuapp.com/api/spots/${spot_id}`)
    .then(({ data }) => {
      return data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getComments = (spot_id) => {
  console.log("In Api.js, getting comments");

  return axios
    .get(`https://wepark-be.herokuapp.com/api/spots/${spot_id}/comments`)
    .then(({ data }) => {
      return data;
    });
};

export const updateVotes = (comment_id, votes) => {
  console.log(comment_id, votes);
  return axios
    .patch(`https://wepark-be.herokuapp.com/api/comments/${comment_id}`, votes)
    .then(({ data }) => {
      console.log(data);
      return data;
    });
};

export const updateSpotVotes = (spot_id, votes) => {
  return axios
    .patch(`https://wepark-be.herokuapp.com/api/spots/${spot_id}`, votes)
    .then(({ data }) => {
      return data;
    });
};

export const updateSpotBusy = (spot_id, status) => {
  return axios
    .patch(`https://wepark-be.herokuapp.com/api/spots/${spot_id}`, status)
    .then(({ data }) => {
      console.log(data);
      return data; 
    })
}