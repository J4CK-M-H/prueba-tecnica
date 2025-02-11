import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { FormFields } from "../RegisterUser";

interface SelectPokemonProps {
  formFields: FormFields;
  handleChangeRegisterForm: (event: SelectChangeEvent<string>) => void;
}

const SelectPokemon = ({
  formFields,
  handleChangeRegisterForm,
}: SelectPokemonProps) => {
  const pokemon = useSelector((state: RootState) => state.pokemon.pokemons);

  return (
    <Box
      component={"form"}
      sx={{
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 0 8px #ccc",
        p: 3,
        height: 500,
        width: { width: "90%", sm: "auto" },
      }}
    >
      <Typography component="p" sx={{ fontSize: "2rem", fontWeight: 600 }}>
        Selecciona tu pokemon favorito
      </Typography>
      <Select
        labelId="demo-simple-select-label"
        name="selectedPokemon"
        sx={{ width: "100%" }}
        value={formFields.selectedPokemon?.name || ""}
        onChange={handleChangeRegisterForm}
        required
      >
        {/* CARGAR PROKEMONES AQUI */}
        {pokemon.map((poke) => (
          <MenuItem
            key={poke.name}
            value={poke.name}
            sx={{ display: "flex", alignItems: "center", gap: 4 }}
          >
            {/* <Box
              component="img"
              src={poke.image}
              alt={poke.name}
              width={30}
              height={30}
            /> */}
            <Typography
              component="span"
              sx={{
                justifySelf: "center",
                fontSize: "1.2rem",
                textTransform: "capitalize",
              }}
            >
              {poke.name}
            </Typography>
          </MenuItem>
        ))}
      </Select>

      <Box
        sx={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {formFields.selectedPokemon?.image == null ? (
          <Box
            component="img"
            sx={{ width: 200, height: 200 }}
            src="/pokeball.png"
          />
        ) : (
          <Box
            component="img"
            sx={{ width: 200, height: 200 }}
            src={formFields.selectedPokemon?.image}
          />
        )}
      </Box>
    </Box>
  );
};

export default SelectPokemon;
