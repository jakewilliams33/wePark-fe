import React, { useEffect, useState, useContext } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { getComments, postComment, updateVotes } from "../../../api";
import { UserContext } from "../../AppContext";
import uuid from "react-native-uuid";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import CommentVotes from "./CommentVotesComponent";

export default function CommentsComponent(selectedSpotID) {
  const [commentsList, setComments] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [text, setText] = useState("");

  useEffect(() => {
    getComments(selectedSpotID.selectedSpotID).then(({ comments }) => {
      comments.sort((b, a) => {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      });
      setComments(comments);
    });
  }, []);

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const postComment = (spot_id, posting) => {
    return axios
      .post(
        `https://wepark-be.herokuapp.com/api/spots/${spot_id}/comments`,
        posting
      )
      .then(({ data }) => {
        getComments(selectedSpotID.selectedSpotID).then(({ comments }) => {
          comments.sort((b, a) => {
            return (
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
            );
          });
          setComments(comments);
        });
        return data;
      });
  };

  const handleCommentPost = () => {
    const posting = {
      author: user.username,
      body: text,
      spot_id: selectedSpotID.selectedSpotID,
    };

    const commentsCopy = [...commentsList];
    setComments(commentsCopy, {
      ...posting,
      created_at: "now",
      upvotes: "0",
      downvotes: "0",
    });
    postComment(selectedSpotID.selectedSpotID, posting);
    setText("");
  };

  return (
    <View
      style={{ marginHorizontal: 40, paddingTop: 20 }}
      keyboardShouldPersistTaps={"handled"}
    >
      {user ? (
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
            onChangeText={setText}
            value={text}
          ></TextInput>
          <TouchableOpacity
            onPress={() => {
              handleCommentPost();
            }}
          >
            <Ionicons
              name="arrow-forward-circle-outline"
              size={34}
              color={"lightblue"}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={{ paddingBottom: 20 }}>
          Please log in to post a comment or vote
        </Text>
      )}
      {commentsList.map((comment) => {
        let date = comment.created_at;
        return (
          <View key={uuid.v4()} style={{ paddingBottom: 25 }}>
            <View key={uuid.v4()} style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }} key={uuid.v4()}>
                {comment.author}
              </Text>
              <Text
                style={{ paddingLeft: 30, fontSize: 12, color: "grey" }}
                key={uuid.v4()}
              >
                {timeAgo.format(new Date(date))}
              </Text>
            </View>
            <Text key={uuid.v4()} style={{ paddingBottom: 5, paddingTop: 5 }}>
              {comment.body}
            </Text>
            <CommentVotes comment={comment} />
          </View>
        );
      })}
    </View>
  );
}
