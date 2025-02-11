import { Box, SelectChangeEvent } from "@mui/material";
import FormRegister from "./components/FormRegister";
import SelectPokemon from "./components/SelectPokemon";
import { useState } from "react";
import { Pokemon } from "../../store/slices/pokemons/pokemonSlice";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import SnackBarSuccess from "./components/SnackBarSuccess";

export interface FormFields {
  id: number;
  nombres: string;
  apellidos: string;
  nickName: string;
  correo: string;
  password: string;
  fechaNacimiento: string;
  telefono: string;
  selectedPokemon: Pokemon | null;
}

const RegisterUser = () => {
  const pokemon = useSelector((state: RootState) => state.pokemon.pokemons);
  const [open, setOpen] = useState(false);

  const [formFields, setFormFields] = useState<FormFields>({
    id: Date.now(),
    nombres: "",
    apellidos: "",
    nickName: "",
    correo: "",
    password: "",
    fechaNacimiento: "",
    telefono: "",
    selectedPokemon: null,
  });

  const handleFormRegister = (event: React.FormEvent): void => {
    event.preventDefault();

    if (formFields.selectedPokemon == null) return alert("Escoge un pokemon");

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const emailExists = users.some(
      (user: FormFields) => user.correo === formFields.correo
    );

    const nickNameExists = users.some(
      (user: FormFields) => user.nickName === formFields.nickName
    );

    if (emailExists) {
      alert("El correo ya está registrado");
      return;
    }

    if (nickNameExists) {
      alert("Ese nickname ya está registrado");
      return;
    }

    users.push(formFields);
    localStorage.setItem("users", JSON.stringify(users));
    setOpen(true);
    setFormFields({
      id: Date.now(),
      nombres: "",
      apellidos: "",
      nickName: "",
      correo: "",
      password: "",
      fechaNacimiento: "",
      telefono: "",
      selectedPokemon: null,
    });
  };

  const handleChangeRegisterForm = (
    event:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;
    setFormFields((prevState) => ({
      ...prevState,
      [name]:
        event.target.name == "selectedPokemon"
          ? pokemon.find((poke) => poke.name == value) || {
              id: null,
              name: "",
              image: "",
            }
          : value,
    }));
  };
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: { xs: "center", xl: "start" },
        flexDirection: { xs: "column", xl: "row" },
        gap: "3rem",
      }}
    >
      <SnackBarSuccess open={open} setOpen={setOpen} />
      <FormRegister
        handleFormRegister={handleFormRegister}
        formFields={formFields}
        handleChangeRegisterForm={handleChangeRegisterForm}
      />
      <SelectPokemon
        formFields={formFields}
        handleChangeRegisterForm={handleChangeRegisterForm}
      />
    </Box>
  );
};

export default RegisterUser;
