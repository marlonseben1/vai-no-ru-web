import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Button, IconButton, Typography } from '@mui/material';
import {
  COR_BORDA,
  COR_TEXTO,
  LARGURA_MAXIMA_CARDAPIO,
} from './Cardapio.static';
import { CardapioConteudo } from './CardapioConteudo/CardapioConteudo';
import { useCardapio } from './useCardapio';

export function Cardapio() {
  const {
    periodo,
    periodoCurto,
    chaveSemana,
    semanaAtual,
    cardapioQuery,
    dias,
    irParaSemanaAnterior,
    irParaProximaSemana,
    irParaHoje,
  } = useCardapio();

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: LARGURA_MAXIMA_CARDAPIO,
        mx: 'auto',
        minWidth: 0,
        p: { xs: 2, sm: 0 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
          mb: 3,
        }}
      >
        <Typography
          variant="h1"
          noWrap
          sx={{
            fontSize: { xs: 26, sm: 36 },
            fontWeight: 700,
            color: COR_TEXTO,
          }}
        >
          Cardápio da semana
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: 1,
          }}
        >
          {!semanaAtual && (
            <Button
              color="inherit"
              onClick={irParaHoje}
              sx={{ minHeight: 44, order: { xs: 1, sm: 0 } }}
            >
              Hoje
            </Button>
          )}
          <Box
            component="nav"
            aria-label="Navegação de semana"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
              border: { xs: `1px solid ${COR_BORDA}`, sm: 'none' },
              borderRadius: { xs: '12px', sm: 0 },
              bgcolor: { xs: '#FFFFFF', sm: 'transparent' },
              px: { xs: 0.5, sm: 0 },
            }}
          >
            <IconButton
              aria-label="Semana anterior"
              onClick={irParaSemanaAnterior}
              sx={{ width: 44, height: 44, color: COR_TEXTO }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <Typography
              sx={{
                fontSize: { xs: 15, sm: 16 },
                fontWeight: 500,
                color: COR_TEXTO,
              }}
            >
              <Box
                component="span"
                sx={{ display: { xs: 'none', sm: 'inline' } }}
              >
                {periodoCurto}
              </Box>
              <Box
                component="span"
                sx={{ display: { xs: 'inline', sm: 'none' } }}
              >
                {periodo}
              </Box>
            </Typography>
            <IconButton
              aria-label="Próxima semana"
              onClick={irParaProximaSemana}
              sx={{ width: 44, height: 44, color: COR_TEXTO }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
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
