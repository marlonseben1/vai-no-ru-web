import { Box, ButtonBase, Typography } from '@mui/material';
import { Link } from 'react-router';
import { colorPalette } from 'theme/colorPalette';
import { ITENS_CONFIGURACOES } from './ConfiguracoesPage.static';

export function ConfiguracoesPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
        Configurações
      </Typography>

      <Box
        sx={{
          mt: 3,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 120px)',
          gap: 2,
        }}
      >
        {ITENS_CONFIGURACOES.map(({ texto, caminho, icone }) => (
          <ButtonBase
            key={caminho}
            component={Link}
            to={caminho}
            sx={{
              aspectRatio: '1',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 1,
              p: 1,
              textAlign: 'center',
              borderRadius: '8px',
              border: `1px solid ${colorPalette.neutral[200]}`,
              bgcolor: 'background.paper',
              color: colorPalette.primary[800],
              '&:hover': { bgcolor: colorPalette.primary[50] },
              '& svg': { fontSize: 32 },
            }}
          >
            {icone}
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {texto}
            </Typography>
          </ButtonBase>
        ))}
      </Box>
    </Box>
  );
}
