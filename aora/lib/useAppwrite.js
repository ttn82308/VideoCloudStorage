import { Alert } from "react-native";
import { useEffect, useState } from "react";

// Custom hook to handle data fetching with Appwrite
const useAppwrite = (fn) => {
  // State to store fetched data
  const [data, setData] = useState([]);
  // State to handle loading status
  const [loading, setLoading] = useState(true);

  // Function to fetch data
  const fetchData = async () => {
    setLoading(true); // Set loading state to true before fetching data
    try {
      const res = await fn(); // Call the passed function to fetch data
      setData(res); // Store the fetched data in state
    } catch (error) {
      Alert.alert("Error", error.message); // Show an alert if an error occurs
    } finally {
      setLoading(false); // Set loading state to false after data fetching
    }
  };

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once

  // Function to manually refetch data
  const refetch = () => fetchData();

  // Return the data, loading state, and refetch function
  return { data, loading, refetch };
};

export default useAppwrite;
