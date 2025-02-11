import { Alert, Stack } from "@mui/material";

const AlertMessage = () => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error">Credenciales Incorrectos</Alert>
    </Stack>
  );
};

export default AlertMessage;
