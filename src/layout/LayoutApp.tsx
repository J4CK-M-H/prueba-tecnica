import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import SidebarComponent from "../components/SidebarComponent";
import { Box } from "@mui/material";
import DrawerComponent from "../components/DrawerComponent";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPokemons } from "../api/pokemon/pokemonApi";
import { useDispatch } from "react-redux";
import { setPokemons } from "../store/slices/pokemons/pokemonSlice";

const LayoutApp = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { data } = useQuery({
    queryKey: ["pokemonsData"],
    queryFn: getPokemons,
  });

  useEffect(() => {
    const pokemons = localStorage.getItem("pokemons");
    const users = localStorage.getItem("users");
    if (!pokemons) {
      localStorage.setItem("pokemons", JSON.stringify([]));
    }
    if (!users) {
      localStorage.setItem("users", JSON.stringify([]));
    }
    if (data) {
      dispatch(setPokemons(data));
      localStorage.setItem("pokemons", JSON.stringify(data));
    }
  }, [data, dispatch]);

  const toggleDrawer = (newOpen: boolean): void => {
    setOpen(newOpen);
  };

  return (
    <div>
      <NavbarComponent toggleDrawer={toggleDrawer} />
      <Box component="main" sx={{ display: "flex" }}>
        <SidebarComponent />
        <DrawerComponent open={open} toggleDrawer={toggleDrawer} />
        <Box
          sx={{
            flex: 1,
            p: 4,
            bgcolor: "#F7F7F7",
            height: "calc(100vh - 80px)",
            overflow: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};

export default LayoutApp;
