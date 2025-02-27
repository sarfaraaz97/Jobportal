"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import WorkIcon from "@mui/icons-material/Work"

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
        <WorkIcon sx={{ color: "primary.main" }} />
        Job Portal
      </Typography>
      <List>
        <ListItem component={Link} to="/" sx={{ textAlign: "center", color: "inherit", textDecoration: "none" }}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem component={Link} to="/create" sx={{ textAlign: "center", color: "inherit", textDecoration: "none" }}>
          <ListItemText primary="Add Job" />
        </ListItem>
        <ListItem component={Link} to="#" sx={{ textAlign: "center", color: "inherit", textDecoration: "none" }}>
          <ListItemText primary="Contact Us" />
        </ListItem>
      </List>
    </Box>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          color: "text.primary",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <WorkIcon sx={{ color: "primary.main" }} />
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  fontWeight: 700,
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                Job Portal
              </Typography>
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" }, ml: 4, gap: 2 }}>
              <Button
                component={Link}
                to="/"
                sx={{ color: "text.primary", "&:hover": { backgroundColor: "rgba(25, 118, 210, 0.08)" } }}
              >
                Home
              </Button>
              <Button
                component={Link}
                to="/create"
                sx={{ color: "text.primary", "&:hover": { backgroundColor: "rgba(25, 118, 210, 0.08)" } }}
              >
                Add Job
              </Button>
              <Button
                component={Link}
                to="#"
                sx={{ color: "text.primary", "&:hover": { backgroundColor: "rgba(25, 118, 210, 0.08)" } }}
              >
                Contact Us
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  )
}

export default Navbar

