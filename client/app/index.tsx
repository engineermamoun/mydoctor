import * as React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@/screens/Home";
import Doctor from "@/screens/Doctor";
import SignUp from "@/screens/SignUp";
import SignIn from "@/screens/SignIn";
import Profile from "@/screens/Profile";

// import { Dimensions, Platform } from "react-native";
// const { width, height } = Dimensions.get("window");

const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#007bff",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "NotoFont",
          // textAlign: "right"
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
      
        options={{ title: " تسجيل دخول جديد " }}
      />
       <Stack.Screen
        name="SignIn"
        component={SignIn}
      
        options={{ title: " تسجيل دخول  " }}
      />
      <Stack.Screen
        name="Doctor"
        component={Doctor}
        options={{ title: "صفحة الاطباء" }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: "صفحة المستخدم" }}
      />
       
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
