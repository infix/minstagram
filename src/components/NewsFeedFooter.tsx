import { Text, View } from "react-native";
import { Button, Spinner } from "@ui-kitten/components";
import React from "react";

type Props = { reachedTheEnd: boolean, error: boolean, loading: boolean, onRetry: () => void };
export const NewsFeedFooter: React.FC<Props> = ({ reachedTheEnd, error, loading, onRetry }) => {
  if (reachedTheEnd) {
    return (
      <View style={{ alignSelf: "center", marginVertical: 12 }}>
        <Text>You've reached the end. there is nothing more to see</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={{ alignSelf: "center", marginVertical: 12 }}>
        <Text>Something went wrong :(</Text>
        <Button style={{ marginVertical: 12 }} onPress={onRetry}>retry</Button>
      </View>
    )
  }

  return (
    <View style={{ alignSelf: "center", marginVertical: 12 }}>
      <Spinner size="large" />
    </View>
  );

}
