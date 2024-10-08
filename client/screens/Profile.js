import { ScrollView, View } from "react-native";
import styles from "../styles/profileStyles";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import Alert from "../components/Alert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "@/config/axios";
import { PROFILE_URL } from "@/config/urls";
const Profile = (props) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
  _getProfile()
  }, [])
  
  const _getProfile = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("accessToken");
      axios.defaults.headers.common.authorization = `JWT ${token}`;
      console.log(axios.defaults.headers)
      const response = await axios.get(PROFILE_URL);
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Loader loading={loading} />
        <Alert visible={visible} />
      </View>
    </ScrollView>
  );
};

export default Profile;
