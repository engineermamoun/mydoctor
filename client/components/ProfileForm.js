import { Formik } from "formik";
import * as yup from "yup";
import styles from "../styles/authStyles";
import { Button, CheckBox, Input, Text } from "react-native-elements";

export default function profileForm(props) {
  const validationSchema = yup.object().shape({
    name: yup.string().required("اسم المستخدم مطلوب"),
    email: yup
      .string()
      .email("يجب ادخال بريد الكتروني صحيح")
      .required("اسم بريد الكتروني مطلوب"),
    password: yup
      .string()
      .required("كلمة المرور غير صحيحة")
      .min(5, "كلمة المرور يجب ان تكون اكثر من 5 احرف"),
    userType: yup.boolean(),
    specialization: yup.string().when("userType", {
      is: true,
      then: (schema) => schema.required("يجب عليك ادخال التخصص"),
    }),
    adress: yup.string().when("userType", {
      is: true,
      then: (schema) => schema.required("يجب عليك ادخال العنوان"),
    }),
    phone: yup.string().when("userType", {
      is: true,
      then: (schema) => schema.required("يجب عليك ادخال رقم الهاتف"),
    }),
    workingHours: yup.string().when("userType", {
      is: true,
      then: (schema) => schema.required("يجب عليك ادخال ساعات العمل"),
    }),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        userType: false,
        specialization: "",
        workingHours: "",
        adress: "",
        phone: "",
        latitude: null,
        longitude: null,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const formData = {
          ...values,
          userType: values.userType ? "doctor" : "normal",
        };

        // console.log(formData);
        props.submit(formData)
      }}
    >
      {({
        handleChange,
        handleBlur,  
        handleSubmit,
        errors,
        values,
        setFieldValue,
        isValid,
      }) => (
        <>
          <Input
            name="name"
            placeholder="اسم المستخدم"
            value={values.name}
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            style={[styles.textInput, errors.name && styles.errorInput]}
          />
          {errors.name && (
            <Text p style={styles.textError}>
              {errors.name}
            </Text>
          )}
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
            style={[styles.textInput, errors.password && styles.errorInput]}
          />
          {errors.password && (
            <Text p style={styles.textError}>
              {errors.password}
            </Text>
          )}
          <CheckBox
            name="userType"
            title="انا طبيب"
            checked={values.userType}
            onPress={() => setFieldValue("userType", !values.userType)}
          />
          {values.userType && (
            <>
              <Input
                name="specialization"
                placeholder="التخصص"
                value={values.specialization}
                onChangeText={handleChange("specialization")}
                onBlur={handleBlur("specialization")}
                style={[
                  styles.textInput,
                  errors.specialization && styles.errorInput,
                ]}
              />
              {errors.specialization && (
                <Text p style={styles.textError}>
                  {errors.specialization}
                </Text>
              )}
              <Input
                name="adress"
                placeholder="العنوان"
                value={values.adress}
                onChangeText={handleChange("adress")}
                onBlur={handleBlur("adress")}
                style={[styles.textInput, errors.adress && styles.errorInput]}
              />
              {errors.adress && (
                <Text p style={styles.textError}>
                  {errors.adress}
                </Text>
              )}
              <Input
                name="phone"
                placeholder="رقم الهاتف"
                value={values.phone}
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                style={[styles.textInput, errors.phone && styles.errorInput]}
              />
              {errors.phone && (
                <Text p style={styles.textError}>
                  {errors.phone}
                </Text>
              )}
              <Input
                name="workingHours"
                placeholder="ساعات العمل"
                value={values.workingHours}
                onChangeText={handleChange("workingHours")}
                onBlur={handleBlur("workingHours")}
                style={[
                  styles.textInput,
                  errors.workingHours && styles.errorInput,
                ]}
              />
              {errors.workingHours && (
                <Text p style={styles.textError}>
                  {errors.workingHours}
                </Text>
              )}
            </>
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
  );
}
