import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { colorPalette } from 'theme/colorPalette';
import { CardapioConteudo } from './CardapioConteudo/CardapioConteudo';
import { useCardapioPage } from './useCardapioPage';

export function CardapioPage() {
  const {
    periodo,
    chaveSemana,
    semanaAtual,
    cardapioQuery,
    dias,
    irParaSemanaAnterior,
    irParaProximaSemana,
    irParaHoje,
  } = useCardapioPage();
  return (
    <Box sx={{ width: '100%', minWidth: 0, p: { xs: 2, sm: 0 } }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="body2" color={colorPalette.neutral[600]}>
            {periodo}
          </Typography>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 700, color: colorPalette.neutral[900] }}
          >
            Cardápio da semana
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            aria-label="Semana anterior"
            onClick={irParaSemanaAnterior}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Button
            variant="outlined"
            color="inherit"
            disabled={semanaAtual}
            onClick={irParaHoje}
          >
            Hoje
          </Button>
          <IconButton aria-label="Próxima semana" onClick={irParaProximaSemana}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>

      <CardapioConteudo
        key={chaveSemana}
        cardapioQuery={cardapioQuery}
        dias={dias}
      />
    </Box>
  );
}
