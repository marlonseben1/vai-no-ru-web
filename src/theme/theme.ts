import { createTheme } from '@mui/material/styles';
import { colorPalette } from './colorPalette';

export const theme = createTheme({
  palette: {
    primary: {
      light: colorPalette.primary[400],
      main: colorPalette.primary[500],
      dark: colorPalette.primary[700],
      contrastText: colorPalette.neutral[0],
    },
    background: {
      default: colorPalette.neutral[50],
      paper: colorPalette.neutral[0],
    },
    text: {
      primary: colorPalette.neutral[800],
      secondary: colorPalette.neutral[600],
    },
    divider: colorPalette.neutral[200],
    success: colorPalette.success,
    warning: colorPalette.warning,
    error: colorPalette.error,
  },
});
