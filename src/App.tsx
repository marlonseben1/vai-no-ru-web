import { CssBaseline, ThemeProvider } from '@mui/material';
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
    <ConfirmacaoProvider>
      <RouterProvider router={router} />
      <ScreenLoading />
      {import.meta.env.DEV && <ReactQueryDevtools />}
    </ConfirmacaoProvider>
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
