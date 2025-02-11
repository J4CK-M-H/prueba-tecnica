import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SnackBarSuccess = ({ open, setOpen }: Props) => {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ width: "100%" }}
      >
        Usuario registrado
      </Alert>
    </Snackbar>
  );
};

export default SnackBarSuccess;
