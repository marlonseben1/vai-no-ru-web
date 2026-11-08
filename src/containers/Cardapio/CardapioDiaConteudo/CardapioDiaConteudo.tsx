import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import useIsResponsivo from 'hooks/useIsResponsivo';
import { dataDoDia } from 'shared/Cardapio/Cardapio.helpers';
import { COR_DESTAQUE, COR_TEXTO } from 'shared/Cardapio/Cardapio.static';
import { CardapioMenu } from 'shared/Cardapio/CardapioMenu/CardapioMenu';
import { ReservasStore } from 'store/reservas/reservas.store';
import { paletaDeCores } from 'theme/paletaDeCores';
import type { Cardapio } from 'types';
import { capitalizar } from 'utils/capitalizar';
import { isDataDesabilitada } from '../../Reservas/CriarReservaDialog/CriarReservaDialog.rules';

interface CardapioDiaConteudoProps {
  dia: Cardapio;
}

export function CardapioDiaConteudo({ dia }: CardapioDiaConteudoProps) {
  const isResponsivo = useIsResponsivo();
  const data = dataDoDia(dia);

  function handleReservarDia() {
    ReservasStore.setCadastroReservaDialog({
      mode: 'criar',
      dataInicial: data,
    });
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
          mb: 2.5,
        }}
      >
        <Typography
          component="h2"
          sx={{ fontSize: 18, fontWeight: 500, color: COR_TEXTO }}
        >
          {capitalizar(dayjs(data).format('dddd, D [de] MMMM'))}
        </Typography>
        {/* no mobile o "+" da barra inferior já abre a nova reserva */}
        {!isResponsivo && (
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            disabled={isDataDesabilitada(dayjs(data), [])}
            onClick={handleReservarDia}
            sx={{
              minHeight: 40,
              px: 2,
              borderRadius: '8px',
              borderColor: COR_DESTAQUE,
              color: COR_DESTAQUE,
              bgcolor: paletaDeCores.neutra[0],
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': {
                bgcolor: paletaDeCores.turquesa[50],
                borderColor: COR_DESTAQUE,
              },
            }}
          >
            Reservar este dia
          </Button>
        )}
      </Box>
      <CardapioMenu cardapio={dia} />
    </>
  );
}
