import { ActivityIndicator, Alert, Image, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Layout, Select, SelectItem, Text } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { loadPlacesAction } from "../slices/bucketListSlice";
import { getProfileAction } from "../slices/userSlice";
import { addNewPostAction } from "../slices/postSlice";
import { useNavigation } from "@react-navigation/native";

const images: string[] = [
  "https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528_960_720.jpg",
  "https://cdn.pixabay.com/photo/2017/01/18/21/34/cyprus-1990939_960_720.jpg",
  "https://images.pexels.com/photos/37646/new-york-skyline-new-york-city-city-37646.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
]

export const AddPost: React.FC = () => {
  // @ts-ignore
  const places = useSelector(state => state.bucketList.places)
  // @ts-ignore
  const profile = useSelector(state => state.user.profile)
  // @ts-ignore
  const { loading, error } = useSelector(state => state.post)

  // Honestly this is the ugliest piece of code in this entire project
  const [posting, setPosting] = useState(false);

  const navigation = useNavigation()
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = React.useState();
  const [selectedImage, setSelectedImage] = React.useState('');

  useEffect(() => {
    // profile needed to create a post
    // usually this would be handle the by backend
    // but as i'm using json server, I'm just gonna fetch profile
    if (!profile) dispatch(getProfileAction())
    if (!places.length) dispatch(loadPlacesAction())
  }, [])

  const handleSubmit = () => {
    if (!selectedImage) {
      Alert.alert("Invalid", "You must select an image to post")
      return;
    }

    // @ts-ignore
    const place = selectedIndex !== undefined ? places[selectedIndex - 1] : undefined;
    dispatch(addNewPostAction({ image: selectedImage, place: place }))
    setPosting(true)
  };

  // no error has occurred and we're loading the
  if (!error && posting) {
    navigation.navigate("NewsFeed")
  }

  return (
    <Layout style={{ height: "100%", paddingHorizontal: 12 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 20 }}>
        {images.map(image =>
          <TouchableOpacity onPress={() => setSelectedImage(image)} key={image}>
            <Image source={{ uri: image }} resizeMode="cover"
                   style={{
                     height: 110,
                     width: 110,
                     borderColor: "blue",
                     borderWidth: image == selectedImage ? 3 : 0,
                   }}
            />
          </TouchableOpacity>
        )}
      </View>

      <Select value={places[selectedIndex - 1]} onSelect={index => setSelectedIndex(index)}
              placeholder="Choose a place" selectedIndex={selectedIndex}
              style={{ marginBottom: 20 }}>
        {places.map((place: string) => <SelectItem key={place} title={place} />)}
      </Select>

      {error && <Text> Something went wrong :( </Text>}
      <Button
        accessoryRight={() => loading && <ActivityIndicator color="white" />}
        onPress={handleSubmit} disabled={loading}> {error ? "retry" : "Add"} </Button>
    </Layout>
  )
}
