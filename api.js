import axios from "axios";

export const getSpots = () => {
  console.log("getting spots");

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
  console.log("getting single spot");
  return axios
    .get(`https://wepark-be.herokuapp.com/api/spots/${spot_id}`)
    .then(({ data }) => {
      return data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const deleteSpot = (spot_id) => {
  console.log("delete being executed");
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
  console.log("getting comments");

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
