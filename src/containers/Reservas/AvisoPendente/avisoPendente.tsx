import { Box, Button, Stack, Typography } from '@mui/material';
import { LABEL_STATUS_RESERVA } from 'shared/labels';
import {
  HORARIO_LIMITE_MANHA,
  HORARIO_LIMITE_TARDE,
} from 'shared/prazosReserva';
import { useAppStore } from 'store/app/appStore';

function AvisoPendenteConteudo() {
  return (
    <Stack spacing={2}>
      <Typography>
        Sua reserva está <strong>{LABEL_STATUS_RESERVA.PENDENTE}</strong>: ela
        já foi registrada e será enviada ao RU automaticamente no dia da
        refeição.
      </Typography>

      <Box>
        <Typography sx={{ mb: 0.5 }}>O envio acontece:</Typography>
        <Box component="ul" sx={{ m: 0, pl: 3 }}>
          <li>
            <Typography>
              Almoço ou Almoço e Jantar: às{' '}
              <strong>{HORARIO_LIMITE_MANHA}</strong>
            </Typography>
          </li>
          <li>
            <Typography>
              Jantar: às <strong>{HORARIO_LIMITE_TARDE}</strong>
            </Typography>
          </li>
        </Box>
      </Box>

      <Typography color="text.secondary">
        Você pode cancelar a reserva enquanto ela ainda estiver pendente.
      </Typography>
    </Stack>
  );
}

interface AvisoPendenteOptions {
  /** Executa quando o usuário fecha o aviso, por qualquer meio */
  onClose?: () => void;
}

export function abrirAvisoPendente({ onClose }: AvisoPendenteOptions = {}) {
  const { setDialogGeral } = useAppStore.getState();

  const handleFecharAviso = () => {
    setDialogGeral(null);
    onClose?.();
  };

  setDialogGeral({
    title: 'Reserva registrada!',
    content: <AvisoPendenteConteudo />,
    // o botão fecha direto pelo store e não passa por esse onClose (que cobre Esc e clique fora)
    onClose: onClose,
    footer: (
      <Button variant="contained" onClick={handleFecharAviso}>
        Entendi
      </Button>
    ),
  });
}
