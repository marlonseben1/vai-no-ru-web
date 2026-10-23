import { Box, Container, Typography } from '@mui/material';
import {
  POLITICA_DE_PRIVACIDADE_ATUALIZADO_EM,
  POLITICA_DE_PRIVACIDADE_SECOES,
  POLITICA_DE_PRIVACIDADE_VERSAO,
} from './PoliticaDePrivacidade.static';

export function PoliticaDePrivacidade() {
  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
        Política de Privacidade
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Versão {POLITICA_DE_PRIVACIDADE_VERSAO} · Última atualização:{' '}
        {POLITICA_DE_PRIVACIDADE_ATUALIZADO_EM}
      </Typography>

      {POLITICA_DE_PRIVACIDADE_SECOES.map(
        ({ titulo, paragrafos, itens }, indice) => (
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
        ),
      )}
    </Container>
  );
}
