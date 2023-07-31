import "./App.css";
import BasicCard from "./components/card";
// Materail UI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Stack from "@mui/material/Stack";

const theme = createTheme({
  typography: {
    fontFamily: ["Alex"],
  },
});

function App() {
  const Grey = grey[900];
  return (
    <ThemeProvider theme={theme}>
      <Stack
        style={{ direction: "rtl" }}
        justifyContent="center"
        alignItems="center"
        height="100vh"
        backgroundColor={Grey}
      >
        <BasicCard />
      </Stack>
    </ThemeProvider>
  );
}

export default App;
