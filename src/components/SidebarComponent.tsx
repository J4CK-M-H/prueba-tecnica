import {
  Box,
  Link as LinkMaterial,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Link } from "react-router-dom";
import { PATHS } from "../routes/paths";

const SidebarComponent = () => {
  return (
    <Box
      component={"div"}
      sx={{
        width: 250,
        bgcolor: "white",
        display: { xs: "none", lg: "block" },
      }}
    >
      <List>
        {PATHS.map((path) => (
          <LinkMaterial
            component={Link}
            to={path.path}
            key={path.path}
            underline="none"
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={path.title} sx={{ color: "#000" }} />
              </ListItemButton>
            </ListItem>
          </LinkMaterial>
        ))}
      </List>
      {/* <Box component="ul">
        {PATHS.map((path) => (
          <Box key={path.title} component="li" sx={{ listStyle: "none" }}>
            <LinkMaterial component={Link} to={path.path} underline="none">
              <Typography variant="body1" color="initial">
                {path.title}
              </Typography>
            </LinkMaterial>
          </Box>
        ))}
      </Box> */}
    </Box>
  );
};

export default SidebarComponent;
