import { ActivityIndicator, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../slices/userSlice";
import { Avatar, Button, Divider, Layout, Spinner, Text } from "@ui-kitten/components";

export const Profile: React.FC = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { loading, profile, error } = useSelector(state => state.user)

  useEffect(() => { dispatch(getProfile()) }, []);

  if (loading && !error) {
    return (
      <View style={{ alignSelf: "center", justifyContent: "center", height: "100%" }}>
        <Spinner size="large" />
      </View>
    )
  }

  if (error) {
    const loadingIcon = (props: any) => !loading ? <ActivityIndicator color={"white"} {...props} /> : <></>;
    return (
      <View style={{ alignSelf: "center", justifyContent: "center", height: "100%", marginVertical: 12 }}>
        <Text>Something went wrong :(</Text>
        <Button style={{ marginVertical: 12 }} onPress={() => dispatch(getProfile())}
                accessoryRight={loadingIcon}>retry</Button>
      </View>
    )
  }

  const { age, avatar, email, name } = profile
  return (
    <Layout style={{ height: '100%', paddingHorizontal: 8 }}>
      <View style={{ marginTop: 16, marginLeft: 8 }}>
        <Avatar shape="square" source={{ uri: avatar }} style={{ height: 160, width: 160, borderRadius: 4 }} />
        <Text category="h5" style={{ marginTop: 4 }}>{name}</Text>
        <Text appearance="hint">{email}</Text>
        <Text appearance="hint" style={{ marginBottom: 16, marginTop: 4 }}>{age} Years Old</Text>
      </View>
      <Divider />
    </Layout>
  )
}
