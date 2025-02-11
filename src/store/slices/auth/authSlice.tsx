import { createSlice } from "@reduxjs/toolkit";

export interface IAuth {
  nickname: string;
  password: string;
}

interface AuthState {
  auth: IAuth;
}

const storedAuth = localStorage.getItem("auth");

const initialState: AuthState = {
  auth: storedAuth ? JSON.parse(storedAuth) : { nickname: "", password: "" },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.auth = action.payload;
      localStorage.setItem("auth", JSON.stringify(action.payload)); // Guardar en localStorage
    },
    logout: (state) => {
      state.auth = { nickname: "", password: "" };
      localStorage.removeItem("auth"); // Eliminar de localStorage al cerrar sesión
    },
  },
});

// Exportar acciones
export const { setCredentials, logout } = authSlice.actions;

// Exportar reducer
export default authSlice.reducer;
