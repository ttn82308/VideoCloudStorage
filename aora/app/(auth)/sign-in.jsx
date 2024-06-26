import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

// SignIn component for user authentication
const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext(); // Access global context to set user and login status
  const [isSubmitting, setSubmitting] = useState(false); // State to manage form submission status
  const [form, setForm] = useState({
    email: "",
    password: "",
  }); // State to manage form inputs

  // Function to handle form submission
  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Lỗi", "Hãy nhập thông tin"); // Alert if any form field is empty
      return; // Return early to prevent further execution
    }

    setSubmitting(true); // Set submitting state to true

    try {
      await signIn(form.email, form.password); // Sign in the user
      const result = await getCurrentUser(); // Fetch current user data
      setUser(result); // Set user data in global context
      setIsLogged(true); // Update login status in global context

      Alert.alert("Thông báo", "Đã đăng nhập thành công"); // Show success alert
      router.replace("/home"); // Navigate to home page
    } catch (error) {
      Alert.alert("Thông báo", "Sai tài khoản hoặc mật khẩu"); // Show error alert
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

          {/* Sign In Title */}
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Đăng nhập
          </Text>

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

          {/* Sign In Button */}
          <CustomButton
            title="Đăng nhập"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          {/* Navigation to Sign Up */}
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Chưa có tài khoản?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Đăng ký
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
