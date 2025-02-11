import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IAuth, setCredentials } from "../../store/slices/auth/authSlice";
import AlertMessage from "./AlertMessage";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorCrendetials, setErrorCredentials] = useState(false);
  const [formLoginState, setFormLoginState] = useState<IAuth>({
    nickname: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormLoginState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    if (
      [formLoginState.nickname.trim(), formLoginState.password.trim()].includes(
        ""
      )
    )
      return alert("Ingrese todos los campos");

    if (
      formLoginState.nickname !== "admin" &&
      formLoginState.password !== "123"
    ) {
      setErrorCredentials(true);
      setTimeout(() => {
        setErrorCredentials(false);
      }, 2500);
      return;
    }

    const credentials = {
      nickname: "admin",
      password: "123",
    };
    localStorage.setItem("auth", JSON.stringify(credentials));
    dispatch(setCredentials(credentials));
    navigate("/");
  };

  return (
    <Box
      sx={{
        bgcolor: "#F3F3F7",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          bgcolor: "white",
          width: "500px",
          px: 2,
          py: 4,
          boxShadow: "0 0 8px #ccc",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Typography
          component="p"
          sx={{ fontSize: "60px", fontWeight: 700, textAlign: "center" }}
        >
          Login
        </Typography>

        {errorCrendetials && <AlertMessage />}
        <TextField
          name="nickname"
          label="nickname"
          value={formLoginState.nickname}
          onChange={handleChange}
          maxRows={4}
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#024CAA",
              },
              "&:hover fieldset": {
                borderColor: "#024CAA",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#024CAA",
              },
            },
          }}
          required
        />

        <TextField
          name="password"
          label="Password"
          type="password"
          value={formLoginState.password}
          onChange={handleChange}
          autoComplete="current-password"
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#024CAA", // Color del borde inicial
              },
              "&:hover fieldset": {
                borderColor: "#024CAA", // Color del borde al pasar el mouse
              },
              "&.Mui-focused fieldset": {
                borderColor: "#024CAA", // Color del borde al enfocar
              },
            },
          }}
          required
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            color: "white",
            display: "block",
            width: "100%",
            py: 1.5,
            fontWeight: 600,
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
