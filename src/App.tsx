import React from "react";
import "typeface-roboto";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Global, css } from "@emotion/react";
import { FavouritesProvider } from "./providers/FavouritesProvider";
import { CarDetailsPage } from "./pages/CarDetailsPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ea7f28",
      contrastText: "#fff",
    },
    secondary: {
      main: "#4a4a4a",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <FavouritesProvider>
        <Router>
          <Global
            styles={css`
              body {
                font-family: "Roboto";
                color: #4a4a4a;
              }
            `}
          />
          <Header />
          <Routes>
            <Route path="/car/:id" element={<CarDetailsPage />} />
            <Route path="/" element={<DashboardPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </Router>
      </FavouritesProvider>
    </ThemeProvider>
  );
}

export default App;
