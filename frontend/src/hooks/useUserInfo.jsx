import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

const useUserInfo = () => {
  const { userInfo, loading, error, fetchUserInfo } = useAuthStore();

  useEffect(() => {
    if (!userInfo) {
      fetchUserInfo(); 
    }
  }, [userInfo, fetchUserInfo]);

  return { userInfo, loading, error };
};

export default useUserInfo;
