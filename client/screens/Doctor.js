import { View } from "react-native";
import styles from "@/styles/authStyles";
// import { Icon } from "react-native-vector-icons/FontAwesome";
import { Icon, Text } from "react-native-elements";

// import { Dimensions, Platform } from "react-native";
// const { width, height } = Dimensions.get("window");
export default function DoctorScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text> الاطباء </Text>
      </View>
    </View>
  );
}
