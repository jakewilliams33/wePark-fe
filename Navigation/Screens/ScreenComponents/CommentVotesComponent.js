import React, { useEffect, useState, useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import uuid from "react-native-uuid";
import { updateVotes } from "../../../api";
import { UserContext } from "../../AppContext";

export default function CommentVotes({ comment }) {

    const [upvotes, setUpvotes] = useState(comment.upvotes);
    const [downvotes, setDownvotes] = useState(comment.downvotes);   
    const { user, setUser } = useContext(UserContext);
    console.log(user);

    const handleUpVote = (comment_id) => {
        setUpvotes((currUpvotes) => currUpvotes + 1)
        const votes = { inc_upvotes: 1, inc_downvotes: 0 };
        updateVotes(comment_id, votes).then(() => {

        })
        .catch((err) => {
            setUpvotes((currUpvotes) => currUpvotes - 1); 
        })
      };
    
      const handleDownVote = (comment_id) => {
        setDownvotes((currDownvotes) => currDownvotes + 1)
        const votes = { inc_upvotes: 0, inc_downvotes: 1 };
        updateVotes(comment_id, votes).then(() => {

        }).catch((err) => {
            setDownvotes((currDownvotes) => currDownvotes - 1); 
        })
      };

    return (
        <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            handleUpVote(comment.comment_id);
          }}
          key={uuid.v4()}
          disabled={user ? false : true}
        >
          <Ionicons
            key={uuid.v4()}
            name="thumbs-up-outline"
            size={15}
            disabled={user ? false : true}
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
            handleDownVote(comment.comment_id);
          }}
          key={uuid.v4()}
          disabled={user ? false : true}
        >
          <Ionicons
            key={uuid.v4()}
            name="thumbs-down-outline"
            size={15}
            disabled={user ? false : true}
            color={"black"}
          />
        </TouchableOpacity>
        <Text style={{ marginLeft: 5, color: "grey" }} key={uuid.v4()}>
          {downvotes}
        </Text>
      </View>
    )
}