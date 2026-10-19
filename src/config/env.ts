export const env = {
  apiUrl: import.meta.env.DEV ? '' : import.meta.env.VITE_API_URL,
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  posthogKey: import.meta.env.VITE_POSTHOG_KEY,
  posthogHost: import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',
};
