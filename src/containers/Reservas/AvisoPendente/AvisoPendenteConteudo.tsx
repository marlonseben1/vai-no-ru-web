import { Box, Stack, Typography } from '@mui/material';
import type { ReservaDiaInput } from 'types';
import { montarTextosAviso, resumirReservas } from './avisoPendente.helpers';
import {
  COR_BORDA,
  COR_TEXTO,
  COR_TEXTO_SECUNDARIO,
  caixaSx,
  HORARIOS_ENVIO,
  linhaSx,
} from './avisoPendente.static';

interface AvisoPendenteConteudoProps {
  dias: ReservaDiaInput[];
}

export function AvisoPendenteConteudo({ dias }: AvisoPendenteConteudoProps) {
  const { plural, cancelamento } = montarTextosAviso(dias);
  const { periodo, almocos, jantares } = resumirReservas(dias);
  const resumo = [
    { rotulo: 'Período', valor: periodo, peso: 1.6 },
    { rotulo: 'Almoços', valor: String(almocos), peso: 1 },
    { rotulo: 'Jantares', valor: String(jantares), peso: 1 },
  ];

  return (
    <Stack spacing={2.5} sx={{ color: COR_TEXTO }}>
      <Typography sx={{ fontSize: 16 }}>
        {plural ? 'Suas reservas estão ' : 'Sua reserva está '}
        <strong>{plural ? 'pendentes' : 'pendente'}</strong>
        {plural
          ? ': elas já foram registradas e serão enviadas ao RU automaticamente no dia de cada refeição.'
          : ': ela já foi registrada e será enviada ao RU automaticamente no dia da refeição.'}
      </Typography>

      {plural && (
        <Box sx={{ ...caixaSx, display: 'flex' }}>
          {resumo.map(({ rotulo, valor, peso }) => (
            <Box
              key={rotulo}
              sx={{
                flex: peso,
                px: 2,
                py: 1.5,
                '&:not(:last-child)': { borderRight: `1px solid ${COR_BORDA}` },
              }}
            >
              <Typography sx={{ fontSize: 13, color: COR_TEXTO_SECUNDARIO }}>
                {rotulo}
              </Typography>
              <Typography
                sx={{ fontSize: 17, fontWeight: 700, whiteSpace: 'nowrap' }}
              >
                {valor}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      <Stack spacing={1}>
        <Typography
          sx={{ fontSize: 15, fontWeight: 500, color: COR_TEXTO_SECUNDARIO }}
        >
          O envio acontece:
        </Typography>
        <Box sx={caixaSx}>
          {HORARIOS_ENVIO.map(({ rotulo, horario }) => (
            <Box key={rotulo} sx={linhaSx}>
              <Typography sx={{ fontSize: 16 }}>{rotulo}</Typography>
              <Typography sx={{ fontSize: 17, fontWeight: 700 }}>
                às {horario}
              </Typography>
            </Box>
          ))}
        </Box>
      </Stack>

      <Typography sx={{ fontSize: 15, color: COR_TEXTO_SECUNDARIO }}>
        {cancelamento}
        {plural && ' Veja todas em Minhas reservas.'}
      </Typography>
    </Stack>
  );
}
