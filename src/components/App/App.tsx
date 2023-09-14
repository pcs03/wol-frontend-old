import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Home from './../Home/Home';
import Login from './../Login/Login';
import { RequireAuth } from 'react-auth-kit';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth loginPath="/login">
              <Home />
            </RequireAuth>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
