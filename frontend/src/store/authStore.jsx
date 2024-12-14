import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api";

export const useAuthStore = create(
    persist(
        (set) => ({
            userInfo: null,
            userRoles: null,
            loading: false,
            error: null,
            isLoggedIn: false,

            // Fetch user info from API
            fetchUserInfo: async () => {
                set({ loading: true, error: null });
                try {
                    const response = await api.get("/account/Account");
                    const rolesResponse = await api.get("/account/role");
                    set({ userInfo: response.data, userRoles: rolesResponse.data.roles, isLoggedIn: true, loading: false });
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
                  set({ userInfo: null, userRoles: [], isLoggedIn: false, loading: false });
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
            name: "auth-storage", // Persist state to localStorage
            getStorage: () => localStorage,
        }
    )
);
