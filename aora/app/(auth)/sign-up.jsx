import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import { createUser } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

// SignUp component for user registration
const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext(); // Access global context to set user and login status

  const [isSubmitting, setSubmitting] = useState(false); // State to manage form submission status
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  }); // State to manage form inputs

  // Function to handle form submission
  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Lỗi", "Không được để trống thông tin!"); // Alert if any form field is empty
      return; // Return early to prevent further execution
    }

    setSubmitting(true); // Set submitting state to true
    try {
      const result = await createUser(form.email, form.password, form.username); // Create new user
      setUser(result); // Set user data in global context
      setIsLogged(true); // Update login status in global context

      Alert.alert("Thông báo", "Đã đăng Ký thành công"); // Show success alert
      router.replace("/home"); // Navigate to home page
    } catch (error) {
      Alert.alert("Thông báo", "Vui lòng kiểm tra lại thông tin"); // Show error alert
      // Uncomment the following line to show detailed error messages
      // Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false); // Set submitting state to false
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          {/* Logo */}
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />

          {/* Sign Up Title */}
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Đăng ký
          </Text>

          {/* Username Form Field */}
          <FormField
            title="Tên người dùng"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

          {/* Email Form Field */}
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          {/* Password Form Field */}
          <FormField
            title="Mật khẩu"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          {/* Sign Up Button */}
          <CustomButton
            title="Đăng ký"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          {/* Navigation to Sign In */}
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Đã có tài khoản?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Đăng nhập
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
