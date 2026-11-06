import { Box } from '@mui/material';
import {
  COR_TEXTO,
  COR_TEXTO_SECUNDARIO,
  ID_TITULO_AVISO,
} from './avisoPendente.static';

interface AvisoPendenteTituloProps {
  titulo: string;
  subtitulo: string;
}

export function AvisoPendenteTitulo({
  titulo,
  subtitulo,
}: AvisoPendenteTituloProps) {
  return (
    <>
      <Box
        component="span"
        id={ID_TITULO_AVISO}
        sx={{
          display: 'block',
          fontSize: 24,
          lineHeight: 1.3,
          fontWeight: 500,
          color: COR_TEXTO,
        }}
      >
        {titulo}
      </Box>
      <Box
        component="span"
        sx={{
          display: 'block',
          mt: 0.25,
          lineHeight: 1.4,
          fontSize: 15,
          fontWeight: 400,
          color: COR_TEXTO_SECUNDARIO,
        }}
      >
        {subtitulo}
      </Box>
    </>
  );
}
