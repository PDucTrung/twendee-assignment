import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Image from "next/image";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

const Header = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={darkTheme}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              ></IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                User management app
              </Typography>
              <Image
                src="/avatar.jpg"
                alt="avatar"
                width={50}
                height={50}
                style={{
                  borderRadius: "50%",
                }}
              />
              <Button color="inherit">P.D.Trung</Button>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </Box>
    </>
  );
};

export default Header;
