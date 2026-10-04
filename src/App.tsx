import { CssBaseline, ThemeProvider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ScreenLoading } from 'components/ScreenLoading/ScreenLoading';
import { env } from 'config/env';
import { ConfirmacaoProvider } from 'contexts/ConfirmacaoContext';
import { useAuthBootstrap } from 'hooks/useAuthBootstrap';
import { queryClient } from 'queries/queryClient';
import { RouterProvider } from 'react-router';
import { router } from 'routes/Router';
import { theme } from 'theme/theme';

function AppContent() {
  useAuthBootstrap();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <ConfirmacaoProvider>
        <RouterProvider router={router} />
        <ScreenLoading />
        {import.meta.env.DEV && <ReactQueryDevtools />}
      </ConfirmacaoProvider>
    </LocalizationProvider>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId={env.googleClientId}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppContent />
        </ThemeProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
