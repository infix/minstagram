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
import { AddPost } from "./src/screens/AddPost";

const AuthStack = createStackNavigator();

const AuthStackNavigator = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name={"Sign In"} component={SignInScreen} />
  </AuthStack.Navigator>
)
const ApplicationTabs = createBottomTabNavigator();

const bottomTabList = [
  { title: 'News Feed', icon: 'home-outline' },
  { title: 'Bucket List', icon: 'archive-outline' },
  { title: 'Profile', icon: 'person-outline' },
];

const BottomTabBar = ({ navigation, state }: any) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    {bottomTabList.map(tab => (
      <BottomNavigationTab icon={props => <Icon {...props} name={tab.icon} />}
                           title={tab.title} key={tab.title} />
    ))}
  </BottomNavigation>
);

const ApplicationStack = createStackNavigator()

const AppStack = () => (
  <ApplicationStack.Navigator>
    <ApplicationStack.Screen name="NewsFeed" component={NewsFeed} options={{ title: "News Feed" }} />
    <ApplicationStack.Screen name="AddPost" component={AddPost} options={{ title: "Add a Post" }} />
  </ApplicationStack.Navigator>
)

const AppTabs = () => (
  <ApplicationTabs.Navigator tabBar={props => <BottomTabBar {...props} />}>
    <ApplicationTabs.Screen name="AppStack" component={AppStack} />
    <ApplicationTabs.Screen name="BucketList" component={BucketList} />
    <ApplicationTabs.Screen name="Profile" component={Profile} />
  </ApplicationTabs.Navigator>
)

const RootStack = createStackNavigator();

const RootStackNavigator: React.FC = () => {
  // @ts-ignore
  const loggedIn = useSelector(state => state.auth.loggedIn)

  return (
    <RootStack.Navigator headerMode="none">
      {loggedIn ?
        <RootStack.Screen name="AppTabs" component={AppTabs} /> :
        <RootStack.Screen name="Sign In" component={AuthStackNavigator} />
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
