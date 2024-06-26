import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./views/home/Home";
import NoMatch from "./views/NoMatch";
import ReadMe from "./views/ReadMe";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["Dosis"].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="readMe" element={<ReadMe />} />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
