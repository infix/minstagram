import React, { useMemo } from "react";
import { Image, View } from "react-native";
import { Text } from "@ui-kitten/components";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime)

interface Props {
  author: {
    name: string;
    avatar: string;
  },
  date: string;
}

export const PostHeader: React.FC<Props> = ({ author, date }) => {
  const dateStr = useMemo(() => dayjs(date).fromNow(), [date])

  return (
    <View style={{ flexDirection: "row", height: 48, justifyContent: "space-between" }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ alignSelf: "center" }}>
          <Image source={{ uri: author.avatar }} style={{ width: 36, height: 36, borderRadius: 36 }} />
        </View>
        <Text style={{ marginLeft: 10, alignSelf: "center", fontSize: 18 }}>{author.name}</Text>
      </View>
      <Text style={{ alignSelf: "center" }}>{dateStr}</Text>
    </View>
  );
};
