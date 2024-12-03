import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Brightness4, Brightness7 } from "@mui/icons-material";

import Link from "next/link";
import { Cookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "@/Toolkit/authSlice";
import { profile_pic } from "@/Api/Axios/Axios";
import { useThemeContext } from "@/ThemeContext/ThemeContext";

const pages = ["list", "Create", "aboutus"];
const settings = ["profile", "login", "Registration"];

export default function Header() {
  const [token, setToken] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cookie = new Cookies();
  const { mode, toggleColorMode } = useThemeContext();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setToken(cookie.get("token"));
    setImage(cookie.get("profile_pic"));
    setFirstName(cookie.get("first_name"));
  }, [cookie]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: mode === "dark" ? "#333" : "#3E2F5B",
        marginBottom: "0px",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar>
          {/* Logo */}
          <Typography
            variant="h4"
            noWrap
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 300,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Foodiz
          </Typography>

          {/* Hamburger Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              color="inherit"
              onClick={toggleMobileMenu}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Drawer for Mobile Menu */}
          <Drawer
            anchor="left"
            open={mobileMenuOpen}
            onClose={toggleMobileMenu}
          >
            <List>
              <ListItem button key="Home" onClick={toggleMobileMenu}>
                <Link href="/" style={{ textDecoration: "none", color: "black" }}>
                  <ListItemText primary="Home" />
                </Link>
              </ListItem>
              {pages.map((page) => (
                <ListItem button key={page} onClick={toggleMobileMenu}>
                  <Link
                    href={`/cms/${page.toLowerCase()}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <ListItemText primary={page} />
                  </Link>
                </ListItem>
              ))}
            </List>
          </Drawer>

         
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button sx={{ my: 2, color: "white", display: "block",fontSize:"20px" }}>
              <Link href="/" style={{ textDecoration: "none", color: "white" }}>
                Home
              </Link>
            </Button>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: "white", display: "block",fontSize:"20px" }}
              >
                <Link
                  href={`/cms/${page.toLowerCase()}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {page}
                </Link>
              </Button>
            ))}
          </Box>

          {/* Theme Toggle */}
          <IconButton
            onClick={toggleColorMode}
            color="inherit"
            sx={{ marginRight: 2 }}
          >
            {mode === "light" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>

        
          {firstName && (
            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: "'Roboto Slab', serif",
                fontWeight: 500,
                marginRight: 2,
                fontSize:"22px",
                color: "skyblue",
                animation: "fadeIn 1s ease-in-out",
              }}
            >
              {`Hello, ${firstName}`}
            </Typography>
          )}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }} onClick={handleMenuClick}>
                {token ? (
                  <img
                    src={image ? profile_pic(image) : ""}
                    alt="Profile"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
                    alt="Default Profile"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                  />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleMenuClose}>
                  <Link href={`/auth/${setting.toLowerCase()}`}>
                    {setting === "login" ? (
                      token ? (
                        <button onClick={handleLogout}>Logout</button>
                      ) : (
                        <button>Login</button>
                      )
                    ) : (
                      <button>{setting}</button>
                    )}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
