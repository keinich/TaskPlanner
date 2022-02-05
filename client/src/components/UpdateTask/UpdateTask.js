import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Input from "@mui/material/Input";

const ariaLabel = { "aria-label": "description" };

export default function UpdateTask({ openDrawerCaller }) {
  React.useEffect(() => {
    openDrawerCaller.current = openDrawer;
  }, []);
  
  const openDrawer = () => {
    setState(true);
  };

  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    console.log("toggling drawer", open);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(true)}
      onKeyDown={toggleDrawer(true)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            {/* <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon> */}
            {/* <ListItemText primary={text} /> */}
            <Input defaultValue="Hello world" inputProps={ariaLabel} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Input defaultValue="Hello world" inputProps={ariaLabel} />
    </Box>
  );

  return (
    <div>
      <React.Fragment key="right">
        <Button onClick={toggleDrawer(true)}>right</Button>
        <Drawer
          anchor="right"
          open={state}
          // open={anc}
          onClose={toggleDrawer(false)}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
