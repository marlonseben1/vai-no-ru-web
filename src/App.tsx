import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from 'queries/queryClient';
import { RouterProvider } from 'react-router';
import { router } from 'routes/Router';
import { theme } from 'theme/theme';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
        {import.meta.env.DEV && <ReactQueryDevtools />}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
