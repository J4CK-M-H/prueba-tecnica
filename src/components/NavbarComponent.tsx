import { Box, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/auth/authSlice";

interface NavbarProps {
  toggleDrawer: (newOpen: boolean) => void;
}

const NavbarComponent = ({ toggleDrawer }: NavbarProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (): void => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 80,
        px: "4rem",
        bgcolor: "#3E5879",
      }}
    >
      <Button
        sx={{ display: { xs: "block", lg: "none" } }}
        onClick={() => toggleDrawer(true)}
      >
        <MenuIcon sx={{ color: "white" }} />
      </Button>
      <Button
        onClick={handleLogout}
        sx={{
          display: "flex",
          ml: "auto",
        }}
      >
        <LogoutIcon sx={{ color: "white" }} />
      </Button>
    </Box>
  );
};

export default NavbarComponent;
