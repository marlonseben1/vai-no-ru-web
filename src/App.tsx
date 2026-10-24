import { CssBaseline, ThemeProvider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfirmacaoDialog } from 'components/ConfirmacaoDialog/ConfirmacaoDialog';
import { CookieBanner } from 'components/CookieBanner/CookieBanner';
import { DialogGeral } from 'components/DialogGeral/DialogGeral';
import { ScreenLoading } from 'components/ScreenLoading/ScreenLoading';
import { env } from 'config/env';
import { useAuthBootstrap } from 'hooks/useAuthBootstrap';
import { usePageview } from 'hooks/usePageview';
import { usePostHogSync } from 'hooks/usePostHogSync';
import { PostHogAnalytics } from 'lib/posthog';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { queryClient } from 'queries/queryClient';
import { RouterProvider } from 'react-router';
import { router } from 'routes/Router';
import { Toaster } from 'sonner';
import { theme } from 'theme/theme';

PostHogAnalytics.iniciar();

function AppContent() {
  useAuthBootstrap();
  usePostHogSync();
  usePageview();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <RouterProvider router={router} />
      <ScreenLoading />
      <DialogGeral />
      <ConfirmacaoDialog />
      <CookieBanner />
      <Toaster position="bottom-right" richColors />
      {import.meta.env.DEV && <ReactQueryDevtools />}
    </LocalizationProvider>
  );
}

function App() {
  return (
    <PostHogProvider client={posthog}>
      <GoogleOAuthProvider clientId={env.googleClientId}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppContent />
          </ThemeProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </PostHogProvider>
  );
}

export default App;
