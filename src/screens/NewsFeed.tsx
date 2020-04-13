import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Spinner } from "@ui-kitten/components";
import { fetchPosts, Post as PostType } from "../slices/postSlice";
import { Post } from "../components/Post";

export const NewsFeed = () => {
  // @ts-ignore
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

  return (
    <Layout level={"2"}>
      {posts.map((post: PostType) => <Post {...post} key={post.date} />)}
    </Layout>
  )
}
