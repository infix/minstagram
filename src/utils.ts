import { NativeScrollEvent } from "react-native";

export const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent, paddingToBottom: number) => {
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};
