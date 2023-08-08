import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import MainRoute from "./Routes/mainroute";
import Navbar from "./Pages/Navbar";
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#007bff", // Replace with your primary color
      },
      secondary: {
        main: "#dc3545", // Replace with your secondary color
      },
    },
    typography: {
      fontFamily: "Roboto, Arial, sans-serif", // Replace with your desired font family
      fontSize: 14, // Replace with your desired default font size
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    // Additional theme configurations...
  });
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <MainRoute />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
