import React from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { User } from "../../../store/slices/users/userSlice";

interface TableUsersProps {
  user: User[];
  showNoResults: boolean;
  messageSnack: string;
  page: number;
  searchInput: string;
  setSearchInput: (value: string) => void;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitSearch: (event: React.FormEvent<HTMLFormElement>) => void;
  handleCloseSnackbar: (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => void;
  handleReset: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setIdUser: React.Dispatch<React.SetStateAction<number | null>>;
}

const TableUsers = ({
  user,
  showNoResults,
  messageSnack,
  page,
  searchInput,
  setSearchInput,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleSubmitSearch,
  handleCloseSnackbar,
  handleReset,
  setOpen,
  setDeleteOpenDialog,
  setIdUser,
}: TableUsersProps) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: 500, fontSize: "28px" }}
        >
          Usuarios
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmitSearch}
          sx={{ display: "flex", gap: 1 }}
        >
          <TextField
            id="serachInput"
            variant="outlined"
            sx={{ "& .MuiInputBase-root": { height: 50 } }}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Escibre el nickname..."
            value={searchInput}
          />
          <Button type="submit" variant="contained" sx={{}}>
            Buscar
          </Button>
          {searchInput && (
            <IconButton onClick={handleReset} color="primary">
              <RestartAltIcon />
            </IconButton>
          )}
        </Box>
      </Box>
      <Divider />
      <Table
        sx={{
          minWidth: 400,
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Nombres</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Apellidos</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Nickname</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Correo</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Fecha Nacimiento</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Teléfono</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Pokemon</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow key={row.nickName}>
                <TableCell>{row.nombres}</TableCell>
                <TableCell>{row.apellidos}</TableCell>
                <TableCell>{row.nickName}</TableCell>
                <TableCell>{row.correo}</TableCell>
                <TableCell>{row.fechaNacimiento}</TableCell>
                <TableCell>{row.telefono}</TableCell>
                <TableCell>{row.selectedPokemon?.name}</TableCell>
                <TableCell></TableCell>
                {/* <TableCell></TableCell> */}
                <TableCell sx={{ display: "flex", gap: "1rem" }}>
                  <Button
                    onClick={() => {
                      setIdUser(row.id);
                      setOpen(true);
                    }}
                    color="success"
                    size="small"
                    variant="contained"
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    onClick={() => {
                      setIdUser(row.id);
                      setDeleteOpenDialog(true);
                    }}
                    color="error"
                    size="small"
                    variant="contained"
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              count={user.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
      <Snackbar
        open={showNoResults}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="warning" onClose={handleCloseSnackbar}>
          {messageSnack}
        </Alert>
      </Snackbar>
    </TableContainer>
  );
};

export default TableUsers;
