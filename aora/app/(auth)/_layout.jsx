import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Loader } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

// AuthLayout component to manage authentication-related routing
const AuthLayout = () => {
  const { loading, isLogged } = useGlobalContext(); // Extract loading and isLogged state from global context

  // If loading is false and user is logged in, redirect to home page
  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <>
      {/* Stack Navigator to manage sign-in and sign-up screens */}
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false, // Hide header for sign-in screen
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false, // Hide header for sign-up screen
          }}
        />
      </Stack>

      {/* Display loader while authentication status is being checked */}
      <Loader isLoading={loading} />
      {/* Status bar customization */}
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;
