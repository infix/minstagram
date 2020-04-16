import React, { useCallback, useEffect } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, Layout, Spinner } from "@ui-kitten/components";
import { fetchPostsAction, PostType } from "../slices/postSlice";
import { Post } from "../components/Post";
import { isCloseToBottom } from "../utils";
import { FAB } from "../components/FAB";
import { useNavigation } from "@react-navigation/native";
import { NewsFeedFooter } from "../components/NewsFeedFooter";

export const NewsFeed = () => {
  // @ts-ignore
  const { loading, posts, error, reachedTheEnd } = useSelector(state => state.post);
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isCloseToBottom(e.nativeEvent, 20) && !loading && !error) {
      dispatch(fetchPostsAction())
    }
  }, [])

  useEffect(() => { dispatch(fetchPostsAction()) }, [])
  const handleNavigate = useCallback(() => navigation.navigate("AddPost"), [navigation]);

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
        <Button style={{ marginVertical: 12 }} onPress={handleNavigate}>Create a new Post</Button>
      </View>
    )
  }

  return (
    <Layout level={"2"}>
      <ScrollView onScroll={handleScroll}>
        {posts.map((post: PostType) => <Post {...post} key={post.id} />)}
        <NewsFeedFooter
          loading={loading} error={error} reachedTheEnd={reachedTheEnd}
          onRetry={() => dispatch(fetchPostsAction())}
        />
      </ScrollView>

      <FAB onPress={handleNavigate} />
    </Layout>
  )
}
