import {
  ButtonBase,
  Stack,
  type SxProps,
  type Theme,
  Typography,
} from '@mui/material';
import type { NotaCes } from 'types/ces';
import {
  COR_NOTA,
  COR_NOTA_SELECIONADA,
  ICONE_POR_NOTA,
  LEGENDA_POR_NOTA,
} from '../CesDialog.static';

interface CesNotaProps {
  valor: NotaCes;
  selecionada: boolean;
  colunaSx: SxProps<Theme>;
  onSelecionar: (valor: NotaCes) => void;
}

export function CesNota({
  valor,
  colunaSx,
  selecionada,
  onSelecionar,
}: CesNotaProps) {
  const Icone = ICONE_POR_NOTA[valor];

  return (
    <Stack
      sx={[
        { alignItems: 'center' },
        ...(Array.isArray(colunaSx) ? colunaSx : [colunaSx]),
      ]}
    >
      <ButtonBase
        role="radio"
        aria-checked={selecionada}
        aria-label={`Nota ${valor} de 5: ${LEGENDA_POR_NOTA[valor]}`}
        onClick={() => onSelecionar(valor)}
        sx={{
          width: '100%',
          height: { xs: 44, sm: 56 },
          borderRadius: 3,
          color: selecionada ? 'common.white' : COR_NOTA_SELECIONADA[valor],
          bgcolor: selecionada ? COR_NOTA_SELECIONADA[valor] : COR_NOTA[valor],
          transition: 'background-color 0.15s, color 0.15s',
          '&:hover, &:focus-visible': {
            bgcolor: COR_NOTA_SELECIONADA[valor],
            color: 'common.white',
          },
        }}
      >
        <Icone sx={{ fontSize: { xs: 26, sm: 34 } }} />
      </ButtonBase>
      <Typography
        aria-hidden
        variant="caption"
        color="text.secondary"
        sx={{ mt: 1.5, textAlign: 'center', lineHeight: 1.2 }}
      >
        {LEGENDA_POR_NOTA[valor]}
      </Typography>
    </Stack>
  );
}
