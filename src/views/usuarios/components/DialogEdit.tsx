import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { User } from "../../../store/slices/users/userSlice";

interface DialogEditProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  idUser: number | null;
  setIdUser: React.Dispatch<React.SetStateAction<number | null>>;
  handleSubmitEdit: (userEdit: User) => void;
}

const initialUserState: User = {
  id: 0,
  nombres: "",
  apellidos: "",
  nickName: "",
  correo: "",
  password: "",
  fechaNacimiento: "",
  telefono: "",
  selectedPokemon: null,
};

const DialogEdit = ({
  open,
  setOpen,
  idUser,
  setIdUser,
  handleSubmitEdit,
}: DialogEditProps) => {
  const [userEdit, setUserEdit] = useState<User>(initialUserState);

  const handleClose = (): void => {
    setOpen(false);
    setIdUser(null);
  };

  useEffect(() => {
    if (idUser !== null) {
      const usersStorage = localStorage.getItem("users");
      if (usersStorage) {
        const parseData: User[] = JSON.parse(usersStorage);
        const findUser = parseData.find((item) => item.id === idUser);
        if (findUser) {
          setUserEdit(findUser);
        } else {
          setUserEdit(initialUserState); // Si no encontramos el usuario, restablecemos el estado
        }
      }
    }
  }, [idUser]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUserEdit((lastValues) => ({
      ...lastValues,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title"></DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            minWidth: 300,
            width: { xs: "auto", sm: 400 },
            py: 4,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <TextField
            type="text"
            name="nombres"
            label="Nombres"
            variant="outlined"
            value={userEdit?.nombres}
            onChange={handleChange}
            sx={{ width: "100%" }}
          />
          <TextField
            type="text"
            name="apellidos"
            label="Apellidos"
            variant="outlined"
            value={userEdit?.apellidos}
            onChange={handleChange}
            sx={{ width: "100%" }}
          />
          <TextField
            type="text"
            name="nickName"
            label="Nickname"
            variant="outlined"
            value={userEdit?.nickName}
            onChange={handleChange}
            sx={{ width: "100%" }}
          />
          <TextField
            type="email"
            name="correo"
            label="Correo"
            variant="outlined"
            value={userEdit?.correo}
            onChange={handleChange}
            sx={{ width: "100%" }}
          />
          <TextField
            type="date"
            name="FechaNacimiento"
            label="Fecha de Nacimiento"
            variant="outlined"
            value={userEdit?.fechaNacimiento}
            onChange={handleChange}
            sx={{ width: "100%" }}
            required
          />
          <TextField
            type="number"
            name="telefono"
            label="N° de Telefono"
            variant="outlined"
            value={userEdit?.telefono}
            onChange={handleChange}
            sx={{ width: "100%" }}
            required
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" onClick={() => handleSubmitEdit(userEdit)}>
          Guardar Cambios
        </Button>
        <Button variant="contained" onClick={handleClose}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogEdit;
