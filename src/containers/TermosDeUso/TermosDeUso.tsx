import { Box, Container, Typography } from '@mui/material';
import {
  TERMOS_DE_USO_ATUALIZADO_EM,
  TERMOS_DE_USO_SECOES,
  TERMOS_DE_USO_VERSAO,
} from './TermosDeUso.static';

export function TermosDeUso() {
  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
        Termos de Uso
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Versão {TERMOS_DE_USO_VERSAO} · Última atualização:{' '}
        {TERMOS_DE_USO_ATUALIZADO_EM}
      </Typography>

      {TERMOS_DE_USO_SECOES.map(({ titulo, paragrafos, itens }, indice) => (
        <Box key={titulo} component="section" sx={{ mt: 4 }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }}>
            {indice + 1}. {titulo}
          </Typography>
          {paragrafos?.map((paragrafo) => (
            <Typography key={paragrafo} sx={{ mt: 1.5 }}>
              {paragrafo}
            </Typography>
          ))}
          {itens && (
            <Box component="ul" sx={{ mt: 1.5, pl: 3 }}>
              {itens.map((item) => (
                <Typography key={item} component="li" sx={{ mt: 0.5 }}>
                  {item}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Container>
  );
}
