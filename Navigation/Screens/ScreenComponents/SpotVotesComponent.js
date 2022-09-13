import React, { useEffect, useState, useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import uuid from "react-native-uuid";
import { UserContext } from "../../AppContext";
import axios from "axios";
import { getSingleSpot, updateSpotVotes } from "../../../api";

export default function SpotVotesComponent({ selectedSpotID }) {
  const { user, setUser } = useContext(UserContext);
  const [upvotes, setUpvotes] = useState();
  const [downvotes, setDownvotes] = useState();

  useEffect(() => {
    getSingleSpot(selectedSpotID).then(({ spot }) => {
      setUpvotes(spot.upvotes);
      setDownvotes(spot.downvotes);
    });
  }, []);

  const handleUpVote = (spot_id) => {
    setUpvotes((currUpvotes) => currUpvotes + 1);
    const votes = { inc_upvotes: 1, inc_downvotes: 0 };
    updateSpotVotes(spot_id, votes)
      .then(() => {})
      .catch((err) => {
        setUpvotes((currUpvotes) => currUpvotes - 1);
      });
  };

  const handleDownVote = (spot_id) => {
    setDownvotes((currDownvotes) => currDownvotes + 1);
    const votes = { inc_upvotes: 0, inc_downvotes: 1 };
    updateSpotVotes(spot_id, votes)
      .then(() => {})
      .catch((err) => {
        setDownvotes((currDownvotes) => currDownvotes - 1);
      });
  };

  return (
    <View style={{ flexDirection: "row", marginLeft: "70%" }}>
      <TouchableOpacity
        onPress={() => {
          handleUpVote(selectedSpotID);
        }}
        disabled={user ? false : true}
      >
        <Ionicons
          key={uuid.v4()}
          name="thumbs-up-outline"
          size={30}
          color={"black"}
        />
      </TouchableOpacity>
      <Text
        style={{ marginRight: 20, marginLeft: 5, color: "grey" }}
        key={uuid.v4()}
      >
        {upvotes}
      </Text>
      <TouchableOpacity
        onPress={() => {
          handleDownVote(selectedSpotID);
        }}
        disabled={user ? false : true}
      >
        <Ionicons
          key={uuid.v4()}
          name="thumbs-down-outline"
          size={30}
          color={"black"}
        />
      </TouchableOpacity>
      <Text style={{ marginLeft: 5, color: "grey" }} key={uuid.v4()}>
        {downvotes}
      </Text>
    </View>
  );
}
