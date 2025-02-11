import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Link as LinkMaterial,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { PATHS } from "../routes/paths";
import { Link } from "react-router-dom";

interface DrawerProps {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => void;
}

const DrawerComponent = ({ open, toggleDrawer }: DrawerProps) => {
  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
    >
      <List>
        {PATHS.map((item) => (
          <LinkMaterial
            key={item.path}
            underline="none"
            component={Link}
            to={item.path}
            sx={{ color: "#000" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          </LinkMaterial>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={() => toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default DrawerComponent;
