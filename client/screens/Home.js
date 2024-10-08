import { StyleSheet, View } from "react-native";

import { Button, ButtonGroup, Text } from "react-native-elements";
// import { Dimensions, Platform } from "react-native";
// const { width, height } = Dimensions.get("window");
export default function Home(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Text>Welcom at Home</Text>
      <Button
        title="صفحة الاطباء"
        onPress={() => navigation.navigate("Doctor")}
      ></Button>
      <Button
        title="تسجيل مستخدم جديد"
        onPress={() => navigation.navigate("SignUp")}
      ></Button>
         <Button
        title="تسجيل دخول "
        onPress={() => navigation.navigate("SignIn")}
      ></Button>
          <Button
        title="صفحة المستخدم"
        onPress={() => navigation.navigate("Profile")}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
