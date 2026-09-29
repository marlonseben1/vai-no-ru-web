import { CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router';
import { router } from 'routes/Router';
import { theme } from 'theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
