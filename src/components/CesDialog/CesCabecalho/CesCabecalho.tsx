import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Typography } from '@mui/material';
import { ID_TITULO_CES } from '../CesDialog.static';

interface CesCabecalhoProps {
  titulo: string;
  onFechar: () => void;
}

export function CesCabecalho({ titulo, onFechar }: CesCabecalhoProps) {
  return (
    <Box sx={{ position: 'relative', pl: 3, pr: 6, pt: 3, pb: 2 }}>
      <Typography id={ID_TITULO_CES} variant="h6" component="h2">
        {titulo}
      </Typography>
      <IconButton
        size="small"
        onClick={onFechar}
        aria-label="Fechar"
        sx={{ position: 'absolute', top: 12, right: 12 }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
