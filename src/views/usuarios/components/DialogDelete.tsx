import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

interface DialogDeleteProps {
  idUser: number | null;
  setIdUser: React.Dispatch<React.SetStateAction<number | null>>;
  openDeleteDialog: boolean;
  setDeleteOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  deleteUser: () => void;
}

const DialogDelete = ({
  setIdUser,
  openDeleteDialog,
  setDeleteOpenDialog,
  deleteUser,
}: DialogDeleteProps) => {
  const handleClose = (): void => {
    setDeleteOpenDialog(false);
    setIdUser(null);
  };

  return (
    <Dialog
      open={openDeleteDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"¿Estas seguro que quieres eliminar el usuario?"}
      </DialogTitle>

      <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={deleteUser}>Eliminar</Button>
        <Button onClick={handleClose} autoFocus>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogDelete;
