import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isAuthenticated: localStorage.getItem("token") ? true : false,
   token: localStorage.getItem("token") || null,
   user: JSON.parse(localStorage.getItem("user")) || null,
};

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      loginSuccess: (state, action) => {
         state.isAuthenticated = true;
         state.token = action.payload.token;
         state.user = action.payload.user;

         // Stocker les infos dans le localStorage
         localStorage.setItem("token", action.payload.token);
         localStorage.setItem("user", JSON.stringify(action.payload.user));
      },
      logout: (state) => {
         state.isAuthenticated = false;
         state.token = null;
         state.user = null;

         // Supprimer les infos du localStorage
         localStorage.removeItem("token");
         localStorage.removeItem("user");
      },
      updateUsername: (state, action) => {
         if (state.user) {
            state.user.userName = action.payload.userName;
            localStorage.setItem("user", JSON.stringify(state.user)); // Mettre à jour dans le localStorage
         }
      },
   },
});

export const { loginSuccess, logout, updateUsername } = authSlice.actions;
export default authSlice.reducer;
