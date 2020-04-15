import { ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Divider, Icon, Input, Layout, Text } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { addPlace, loadPlaces } from "../slices/bucketListSlice";

const IconPlus = (props: any) =>
  <Icon name={"plus-outline"} {...props} />

export const BucketList: React.FC = () => {
  const dispatch = useDispatch()
  const [place, setPlace] = useState<string>('')
  // @ts-ignore
  const { places, errorMessage } = useSelector(state => state.bucketList)

  useEffect(() => { dispatch(loadPlaces()) }, [])

  const handleAdd = async () => {
    console.log("Handle add ", place)
    // prevent user from adding empty spaces
    const trimmedPlace = place.trim();
    if (trimmedPlace) {
      console.log("Dispatching: ", trimmedPlace)
      dispatch(addPlace({ name: trimmedPlace }))
    }
    setPlace('')
  }

  return (
    <Layout style={{ height: "100%" }}>
      <View style={{
        marginHorizontal: 8,
        marginTop: 8,
        alignSelf: "center",
        justifyContent: "center",
      }}>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <Input placeholder="Place" style={{ flex: 1, paddingVertical: 4, justifyContent: "center" }}
                 value={place} onChangeText={setPlace} />
          <Button appearance="ghost" accessoryLeft={IconPlus} onPress={handleAdd} />
        </View>
        {!!errorMessage && <Text appearance="default" style={{ color: "red" }}>{errorMessage}</Text>}
      </View>

      <ScrollView style={{ marginHorizontal: 8, marginTop: 16 }}>
        {places.map((p: string) => (
          <View key={p}>
            <Text style={{ marginVertical: 12, fontSize: 18 }}>{p}</Text>
            <Divider />
          </View>
        ))}
      </ScrollView>
    </Layout>
  )
}
