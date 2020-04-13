import React from 'react';
import * as eva from "@eva-design/eva"
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SignInScreen } from "./src/screens/SignIn";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { Provider, useSelector } from "react-redux";
import { store } from "./src/store";
import { HomeScreen } from "./src/screens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthStack = createStackNavigator();

const AuthStackNavigator = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name={"Sign In"} component={SignInScreen} />
  </AuthStack.Navigator>
)
const HomeTabs = createBottomTabNavigator();

const HomeNavigator = () => (
  <HomeTabs.Navigator>
    <HomeTabs.Screen name={"Home"} component={HomeScreen} />
  </HomeTabs.Navigator>
)

const RootStack = createStackNavigator();

const RootStackNavigator: React.FC = () => {
  // @ts-ignore
  const loggedIn = useSelector(state => state.auth.loggedIn)
  console.log("RootNav: ", loggedIn)
  return (
    <RootStack.Navigator>
      {loggedIn ?
        <RootStack.Screen name="Home" component={HomeNavigator} /> :
        <RootStack.Screen name="Sign In" component={AuthStackNavigator} options={{ headerShown: false }} />
      }
    </RootStack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />

      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <RootStackNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  );
}
