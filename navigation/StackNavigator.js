import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // use native stack navigator for better performance
import React from "react";
import HomeScreen from "../screens/HomeScreen"; // Adjust the path if needed
import SignUp from "../screens/SignUp"; // Adjust the path if needed
import Login from "../screens/Login"; // Adjust the path if needed

const Stack = createNativeStackNavigator(); // Use native stack for better performance

const AppNavigator = ({ isAuthenticated }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
