import React, { useEffect, useState, useContext } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { getComments } from "../../../api";
import { UserContext } from "../../AppContext";
import uuid from "react-native-uuid";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";

export default function CommentsComponent(selectedSpotID) {
  const [commentsList, setComments] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [comment, setComment] = useState("");

  useEffect(() => {
    getComments(selectedSpotID.selectedSpotID).then((comments) => {
      setComments(comments.comments);
    });
  }, []);

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  // const postComment = (spot_id) => {
  //   return axios
  //     .post(`https://wepark-be.herokuapp.com/api/spots/${spot_id}/comments`)
  //     .then(({ data }) => {
  //       getComments(selectedSpotID.selectedSpotID).then((comments) => {
  //         setComments(comments.comments);
  //       });
  //       return data;
  //     });
  // };

  // const handleCommentPost = () => {
  //   postComment(selectedSpotID.selectedSpotID);
  //   const commentsCopy = [...commentsList, comment];
  //   setComments(commentsCopy);
  // };

  return (
    <View style={{ marginHorizontal: 40, paddingTop: 20 }}>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder="Add a comment..."
          style={{
            marginRight: 10,
            borderBottomColor: "grey",
            borderBottomWidth: 1,
            borderRadius: 4,
            flex: 1,
            marginBottom: 20,
          }}
          onChangeText={setComment}
          value={comment}
        ></TextInput>
        <TouchableOpacity>
          <Ionicons
            name="arrow-forward-circle-outline"
            size={34}
            color={"lightblue"}
          />
        </TouchableOpacity>
      </View>
      {commentsList.map((comment) => {
        let date = comment.created_at;
        return (
          <View key={uuid.v4()} style={{ paddingBottom: 25 }}>
            <View key={uuid.v4()} style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }} key={uuid.v4()}>
                {comment.author}
              </Text>
              <Text style={{ paddingLeft: 30 }} key={uuid.v4()}>
                {timeAgo.format(new Date(date))}
              </Text>
            </View>
            <Text key={uuid.v4()} style={{ paddingBottom: 5, paddingTop: 5 }}>
              {comment.body}
            </Text>
            <Text key={uuid.v4()}>down: {comment.downvotes}</Text>
            <Text key={uuid.v4()}>up: {comment.downvotes}</Text>
          </View>
        );
      })}
    </View>
  );
}
