import { createTheme } from '@mui/material/styles';
import { paletaDeCores } from './paletaDeCores';

export const theme = createTheme({
  palette: {
    primary: {
      light: paletaDeCores.primaria[400],
      main: paletaDeCores.primaria[500],
      dark: paletaDeCores.primaria[700],
      contrastText: paletaDeCores.neutra[0],
    },
    background: {
      default: paletaDeCores.neutra[50],
      paper: paletaDeCores.neutra[0],
    },
    text: {
      primary: paletaDeCores.neutra[800],
      secondary: paletaDeCores.neutra[600],
    },
    divider: paletaDeCores.neutra[200],
    success: paletaDeCores.sucesso,
    warning: paletaDeCores.aviso,
    error: paletaDeCores.erro,
  },
});
