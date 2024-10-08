import { ScrollView, View, KeyboardAvoidingView, Platform } from "react-native";
import { Button, Icon, Input, Text } from "react-native-elements";
import styles from "../styles/authStyles";
import * as yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import Loader from "@/components/Loader";
import Alert from "@/components/Alert";
import { SIGNIN_URL } from "@/config/urls";
import axios from "@/config/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function SignIn() {
  const signInvalidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("يجب ادخال بريد الكتروني صحيح")
      .required("البريد الالكتروني مطلوب"),
    password: yup.string("").required("يجب عليك ادخال كلمة مرور صالحة"),
  });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [alert, setAlert] = useState({
    title: "",
    message: "",
    type: "",
  });

  const _signIn = async (values) => {
    setLoading(true);
    const body = {
      email: values.email,
      password: values.password,
    };
    try {
      const response = await axios.post(SIGNIN_URL, body);
      console.log(response);
      await AsyncStorage.setItem("accessToken", response.data.accessToken);
      setAlert({
        title: "تسجيل ناجح",
        message:
          "لقد قمت بتسجيل حساب بشكل صحيح ويمكنك االانتقال إلى صفحة تسجيل الدخول، هل تريد الانتقال إلى صفحة تسجيل الدخول",
        type: "question",
      });
      setVisible(true);
      setLoading(false);
    } catch (e) {
      console.log(e.response.data.message);
      console.log("Got here");
      setLoading(false);
      setAlert({
        title: "تنبيه",
        message: e.response.data.message,
        type: "alert",
      });
      setVisible(true);
    }
    // console.log(body);
  };
  return (
    <ScrollView>
      <Loader title="جاري تسجيل الدخول" loading={loading} />
      <Alert
        visible={visible}
        title={alert.title}
        message={alert.message}
        type={alert.type}
        onClose={() => setVisible(false)}
        onClick={() => {
          setVisible(false);
          //   navigation.navigate("SignIn");
        }}
      />
      <View style={styles.container}>
        <Icon raised name="user" type="font-awesome" color="#f50" size={30} />
        <Text h4>تسجيل دخول جديد</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled
      >
        <View style={styles.container}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={signInvalidationSchema}
            onSubmit={(values) => _signIn(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              values,
              isValid,
            }) => (
              <>
                <Input
                  name="email"
                  placeholder="البريد الاكتروني "
                  keyboardType="email-address"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  style={[styles.textInput, errors.email && styles.errorInput]}
                />
                {errors.email && (
                  <Text p style={styles.textError}>
                    {errors.email}
                  </Text>
                )}
                <Input
                  name="password"
                  placeholder="كلم المرور"
                  secureTextEntry
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  style={[
                    styles.textInput,
                    errors.password && styles.errorInput,
                  ]}
                />
                {errors.password && (
                  <Text p style={styles.textError}>
                    {errors.password}
                  </Text>
                )}
                <Button
                  title="تسجيل"
                  buttonStyle={{ marginTop: 20 }}
                  onPress={handleSubmit}
                  disabled={!isValid}
                />
              </>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
