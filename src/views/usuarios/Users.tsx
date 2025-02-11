import { useEffect, useState } from "react";
import TableUsers from "./components/TableUsers";
import { useDispatch, useSelector } from "react-redux";
import { setUsersSlice, User } from "../../store/slices/users/userSlice";
import { RootState } from "../../store/store";
import DialogEdit from "./components/DialogEdit";
import DialogDelete from "./components/DialogDelete";

const Users = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.users);
  const [idUser, setIdUser] = useState<number | null>(null);
  const [showNoResults, setShowNoResults] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setDeleteOpenDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [originalUsers, setOriginalUsers] = useState<User[]>([]);
  const [messageSnack, setMessageSnack] = useState("");

  useEffect(() => {
    // Obtener los usuarios almacenados en localStorage
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      dispatch(setUsersSlice(JSON.parse(storedUsers)));
      setOriginalUsers(JSON.parse(storedUsers));
    }
  }, [dispatch]);

  const deleteUser = (): void => {
    const usersStorage = localStorage.getItem("users");
    if (usersStorage) {
      const parseList = JSON.parse(usersStorage);
      const newUserList = parseList.filter((user: User) => user.id != idUser);
      localStorage.setItem("users", JSON.stringify(newUserList));
      dispatch(setUsersSlice(newUserList));
      setDeleteOpenDialog(false);
    }
  };

  const handleSubmitEdit = (userEdit: User): void => {
    if (
      [
        userEdit.nombres.trim(),
        userEdit.apellidos.trim(),
        userEdit.nickName.trim(),
        userEdit.correo.trim(),
        userEdit.fechaNacimiento.trim(),
        userEdit.telefono.trim(),
      ].includes("")
    )
      return alert("Ingrese todos los campos");

    const usersStorage = localStorage.getItem("users");
    if (usersStorage) {
      const parseData = JSON.parse(usersStorage);
      const newUserList = parseData.map((item: User) =>
        item.id == userEdit.id ? { ...userEdit } : item
      );
      localStorage.setItem("users", JSON.stringify(newUserList));
      dispatch(setUsersSlice(newUserList));
      setOpen(false);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubmitSearch = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();

    if (searchInput.trim().length == 0) {
      setMessageSnack("Ingrese un dato");
      setShowNoResults(true);
      return;
    }

    const filter_data = originalUsers.filter(
      (item) => item.nickName === searchInput
    );
    if (filter_data.length > 0) {
      dispatch(setUsersSlice(filter_data));
    } else {
      setMessageSnack("No se encontro un resultado");
      setShowNoResults(true); // Muestra el mensaje
    }
  };

  const handleCloseSnackbar = () => {
    setShowNoResults(false);
  };

  const handleReset = () => {
    dispatch(setUsersSlice(originalUsers));
    setSearchInput(""); // Limpiar el input
  };

  return (
    <div>
      <DialogEdit
        open={open}
        setOpen={setOpen}
        idUser={idUser}
        setIdUser={setIdUser}
        handleSubmitEdit={handleSubmitEdit}
      />
      <DialogDelete
        idUser={idUser}
        setIdUser={setIdUser}
        openDeleteDialog={openDeleteDialog}
        setDeleteOpenDialog={setDeleteOpenDialog}
        deleteUser={deleteUser}
      />

      <TableUsers
        user={user}
        showNoResults={showNoResults}
        messageSnack={messageSnack}
        page={page}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSubmitSearch={handleSubmitSearch}
        handleCloseSnackbar={handleCloseSnackbar}
        handleReset={handleReset}
        setOpen={setOpen}
        setDeleteOpenDialog={setDeleteOpenDialog}
        setIdUser={setIdUser}
      />
    </div>
  );
};

export default Users;
