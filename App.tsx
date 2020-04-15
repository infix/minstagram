import React from 'react';
import * as eva from "@eva-design/eva"
import { ApplicationProvider, BottomNavigation, BottomNavigationTab, Icon, IconRegistry } from "@ui-kitten/components";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SignInScreen } from "./src/screens/SignIn";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { Provider, useSelector } from "react-redux";
import { store } from "./src/store";
import { NewsFeed } from "./src/screens/NewsFeed";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Profile } from "./src/screens/Profile";
import { BucketList } from "./src/screens/BucketList";

const AuthStack = createStackNavigator();

const AuthStackNavigator = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name={"Sign In"} component={SignInScreen} />
  </AuthStack.Navigator>
)
const HomeTabs = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='News Feed' icon={props => <Icon {...props} name='home-outline' />} />
    <BottomNavigationTab title='Bucket List' icon={props => <Icon {...props} name='archive-outline' />} />
    <BottomNavigationTab title='Profile' icon={props => <Icon {...props} name='person-outline' />} />
  </BottomNavigation>
);

const HomeNavigator = () => (
  <HomeTabs.Navigator tabBar={props => <BottomTabBar {...props} />}>
    <HomeTabs.Screen name={"NewsFeed"} component={NewsFeed} />
    <HomeTabs.Screen name={"BucketList"} component={BucketList} />
    <HomeTabs.Screen name={"Profile"} component={Profile} />
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
        <RootStack.Screen name="NewsFeed" component={HomeNavigator} /> :
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
