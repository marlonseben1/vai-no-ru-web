import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import useIsResponsivo from 'hooks/useIsResponsivo';
import { ReservasStore } from 'store/reservas/reservas.store';
import type { Cardapio } from 'types';
import { capitalizar } from 'utils/capitalizar';
import { isDataDesabilitada } from '../../Reservas/CriarReservaDialog/CriarReservaDialog.rules';
import { dataDoDia } from '../Cardapio.helpers';
import { COR_DESTAQUE, COR_TEXTO } from '../Cardapio.static';
import { CardapioMenu } from '../CardapioMenu/CardapioMenu';

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
              bgcolor: '#FFFFFF',
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': { bgcolor: '#EAF0EF', borderColor: COR_DESTAQUE },
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
