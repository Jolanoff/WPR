import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import api from "../api";

//store die overal gebruikt kan worden
export const useAuthStore = create(
  persist(
    (set) => ({
      userInfo: null,
      userRoles: null,
      loading: false,
      error: null,
      isLoggedIn: false,
    
      fetchUserInfo: async () => {
        set({ loading: true, error: null });
        try {
          const response = await api.get("/account/Account");
          const rolesResponse = await api.get("/account/role");
          set({
            userInfo: response.data,
            userRoles: rolesResponse.data.roles,
            isLoggedIn: true,
            loading: false,
          });
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to fetch user info",
            loading: false,
            isLoggedIn: false,
          });
        }
      },

      // Logout user
      logout: async () => {
        set({ loading: true, error: null });
        try {
          await api.post("/auth/logout");
          set({
            userInfo: null,
            userRoles: [],
            isLoggedIn: false,
            loading: false,
          });
        } catch (err) {
          set({
            error: err.response?.data?.message || "Logout failed",
            loading: false,
          });
          console.error("Logout failed:", err.response?.data?.message);
        }
      },
    }),
    {
      name: "auth-cookie",
      storage: {
        getItem: (name) => {
          const value = Cookies.get(name);
          return value ? JSON.parse(value) : null; 
        },
        setItem: (name, value) => {
          Cookies.set(name, JSON.stringify(value), { expires: 2 }); 
        },
        removeItem: (name) => {
          Cookies.remove(name); 
        },
      },
    },
  )
);
