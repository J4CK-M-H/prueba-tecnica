import { Box, Button, TextField, Typography } from "@mui/material";
import { FormFields } from "../RegisterUser";
import { FormEvent } from "react";

interface FormRegisterProps {
  handleFormRegister: (event: FormEvent) => void;
  formFields: FormFields;
  handleChangeRegisterForm: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const FormRegister = ({
  handleFormRegister,
  formFields,
  handleChangeRegisterForm,
}: FormRegisterProps) => {
  return (
    <Box
      component="form"
      onSubmit={handleFormRegister}
      sx={{
        minWidth: 300,
        width: { xs: "90%", lg: 600 },
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 0 8px #ccc",
        p: 3,
        gap: "1rem",
        justifySelf: "start",
      }}
    >
      <Typography component="p">Registrate</Typography>
      <TextField
        name="nombres"
        label="Nombres"
        type="text"
        value={formFields.nombres}
        onChange={handleChangeRegisterForm}
        sx={{
          width: "100%",
        }}
        required
      />
      <TextField
        type="text"
        label="Apellidos"
        name="apellidos"
        value={formFields.apellidos}
        onChange={handleChangeRegisterForm}
        sx={{ width: "100%" }}
        required
      />
      <TextField
        type="text"
        name="nickName"
        label="Nickname"
        value={formFields.nickName}
        onChange={handleChangeRegisterForm}
        sx={{
          width: "100%",
        }}
        required
      />
      <TextField
        type="email"
        name="correo"
        label="Correo"
        value={formFields.correo}
        onChange={handleChangeRegisterForm}
        sx={{
          width: "100%",
        }}
        required
      />
      <TextField
        type="password"
        name="password"
        label="password"
        value={formFields.password}
        onChange={handleChangeRegisterForm}
        sx={{
          width: "100%",
        }}
        required
      />
      <TextField
        type="date"
        name="fechaNacimiento"
        value={formFields.fechaNacimiento}
        onChange={handleChangeRegisterForm}
        sx={{
          width: "100%",
        }}
        required
      />
      <TextField
        type="text"
        name="telefono"
        label="telefono"
        value={formFields.telefono}
        onChange={handleChangeRegisterForm}
        sx={{
          width: "100%",
        }}
        inputProps={{ maxLength: 9 }}
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
        Registrar usuario
      </Button>
    </Box>
  );
};

export default FormRegister;
