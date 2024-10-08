import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import styles from "@/styles/authStyles";
import { Icon, Text } from "react-native-elements";
import ProfileForm from "@/components/ProfileForm";
import axios from "@/config/axios";
import { SIGNUP_URL } from "@/config/urls";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Alert from "@/components/Alert";

// import { Dimensions, Platform } from "react-native";
// const { width, height } = Dimensions.get("window");
export default function SignUp() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [alert, setAlert] = useState({
    title: "",
    message: "",
    type: "",
  });
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  const _signUp = async (values) => {
    setLoading(true);
    const body = {
      name: values.name,
      email: values.email,
      password: values.password,
      userType: values.userType,
      specialization: values.specialization,
      address: values.address,
      phone: values.phone,
      workingHours: values.workingHours,
      location: {
        latitude: location ? location.latitude : null,
        longitude: location ? location.longitude : null,
      },
    };
    try {
      const response = await axios.post(SIGNUP_URL, body);
      console.log(response);
      setAlert({
        title: "تسجيل ناجح",
        message:
          "لقد قمت بتسجيل حساب بشكل صحيح ويمكنك االانتقال إلى صفحة تسجيل الدخول، هل تريد الانتقال إلى صفحة تسجيل الدخول",
        type: "question",
      });
      setVisible(true);
      setLoading(false);
    } catch (e) {
      console.log(e.response.data);
      setLoading(false);
      setAlert({
        title: "تنبيه",
        message: e.response.data.errors[0].message,
        type: "alert",
      });
      setVisible(true);
    }
    // console.log(body);
  };
  return (
    <ScrollView>
      <Loader title="جاري انشاء حساب جديد" loading={loading} />
      <Alert
        visible={visible}
        title={alert.title}
        message={alert.message}
        type={alert.type}
        onClose={() => setVisible(false)}
        onClick={() => {
          setVisible(false);
          navigation.navigate("SignIn");
        }}
      />
      <View style={styles.container}>
        <View style={styles.container}>
          <Icon raised name="user" type="font-awesome" color="#f50" size={30} />
          <Text h4>تسجيل دخول جديد</Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          enabled
        >
          <View style={styles.container}>
            <ProfileForm submit={(values) => _signUp(values)} />
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
}
