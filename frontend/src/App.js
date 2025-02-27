import React from 'react';
import './App.css';
import AllPosts from './components/AllPosts';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from './components/Create';
import Navbar from './components/Navbar';
import Edit from './components/Edit';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

// Create a custom theme
const theme = createTheme({
  // ... (theme configuration as provided earlier)
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<AllPosts />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;