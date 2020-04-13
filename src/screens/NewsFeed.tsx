import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@ui-kitten/components";
import { fetchPosts } from "../slices/postSlice";

export const NewsFeed = () => {
  const data = useSelector(state => state.post);
  const { loading, posts } = data;
  const dispatch = useDispatch()

  // fetch initial posts
  useEffect(() => {
    dispatch(fetchPosts({}))
  }, [])

  if (loading) {
    return (
      <View style={{ alignSelf: "center", justifyContent: "center", height: "100%" }}>
        <Spinner size="large" />
      </View>
    )
  }

  if (!posts.length) {
    return (
      <View style={{ alignSelf: "center", justifyContent: "center", height: "100%" }}>
        <Text>Nothing here, why not start by creating a new post!</Text>
      </View>
    )
  }

  return (<Text>News Feed</Text>)
}
