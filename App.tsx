import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as eva from "@eva-design/eva"
import { ApplicationProvider, Button } from "@ui-kitten/components";

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <Button onPress={() => {}}>
          BUTTON
        </Button>
      </View>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
