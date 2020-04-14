import React, { useCallback, useEffect } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Spinner } from "@ui-kitten/components";
import { fetchPosts, Post as PostType } from "../slices/postSlice";
import { Post } from "../components/Post";
import { isCloseToBottom } from "../utils";

export const NewsFeed = () => {
  // @ts-ignore
  const { loading, posts } = useSelector(state => state.post);
  const dispatch = useDispatch()

  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isCloseToBottom(e.nativeEvent, 20) && !loading) {
      dispatch(fetchPosts())
    }
  }, [])

  useEffect(() => { dispatch(fetchPosts()) }, [])

  if (!posts.length && loading) {
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
      <ScrollView onScroll={handleScroll}>
        {posts.map((post: PostType, i) => <Post {...post} key={post.date + i} />)}
        <View style={{ alignSelf: "center", marginVertical: 12 }}>
          <Spinner size="large" />
        </View>
      </ScrollView>
    </Layout>
  )
}
