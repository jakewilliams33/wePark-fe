import React, { useEffect, useState, useContext } from "react";
import { Text, View } from "react-native";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { getComments } from "../../../api";
import { UserContext } from "../../AppContext";

export default function CommentsComponent(selectedSpotID) {
  const [commentsList, setComments] = useState([]);
  const { user, setUser } = useContext(UserContext);
  console.log(selectedSpotID.selectedSpotID);

  useEffect(() => {
    getComments(selectedSpotID.selectedSpotID).then((comments) => {
      setComments(comments.comments);
    });
  }, []);

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  return (
    <View style={{ paddingRight: 40, paddingLeft: 40, paddingTop: 20 }}>
      {commentsList.map((comment) => {
        let date = comment.created_at;
        return (
          <View style={{ paddingBottom: 25 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }} key={Math.random()}>
                {comment.author}
              </Text>
              <Text style={{ paddingLeft: 30 }} key={comment.created_at}>
                {timeAgo.format(new Date(date))}
              </Text>
            </View>
            <Text
              key={comment.body}
              style={{ paddingBottom: 5, paddingTop: 5 }}
            >
              {comment.body}
            </Text>
            <Text key={Date.now()}>down: {comment.downvotes}</Text>
            <Text key={Math.random()}>up: {comment.downvotes}</Text>
          </View>
        );
      })}
    </View>
  );
}
