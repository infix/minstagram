import React from 'react';
import * as eva from "@eva-design/eva"
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SignInScreen } from "./src/screens/SignIn";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { Provider } from "react-redux";
import { store } from "./src/store";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />

      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name={"Sign In"} component={SignInScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  );
}
