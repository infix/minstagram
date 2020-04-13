import React from "react";
import { Post as PostType } from "../slices/postSlice";
import { Image, View } from "react-native";

import { PostHeader } from "./PostHeader";
import { Text } from "@ui-kitten/components";

export const Post: React.FC<PostType> = ({ image, author, date, likes }) => {
  return (
    <View style={{ marginHorizontal: 8, backgroundColor: "white" }}>
      <PostHeader author={author} date={date} />
      <Image resizeMode="cover" style={{ height: 240 }} source={{ uri: image }} />
      <Text style={{ color: "#888", marginLeft: 16, paddingVertical: 4 }}>{likes} likes</Text>
    </View>
  )
}
