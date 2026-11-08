import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography } from '@mui/material';
import useIsResponsivo from 'hooks/useIsResponsivo';
import { paletaDeCores } from 'theme/paletaDeCores';

interface ReservasProximasVazioProps {
  onNovaReserva: () => void;
}

export function ReservasProximasVazio({
  onNovaReserva,
}: ReservasProximasVazioProps) {
  const isResponsivo = useIsResponsivo();

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        p: '20px 24px',
        bgcolor: paletaDeCores.neutra[0],
        border: `1px dashed ${paletaDeCores.cinza[700]}`,
        borderRadius: '8px',
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 700,
            color: paletaDeCores.cinza[950],
          }}
        >
          Você não tem reservas próximas
        </Typography>
        <Typography sx={{ fontSize: 14, color: paletaDeCores.cinza[800] }}>
          Quando fizer uma nova reserva, ela aparece aqui.
        </Typography>
      </Box>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={onNovaReserva}
        sx={{
          minHeight: 44,
          px: 3,
          width: isResponsivo ? '100%' : 'auto',
          borderRadius: '8px',
          borderColor: paletaDeCores.turquesa[600],
          color: paletaDeCores.turquesa[600],
          bgcolor: paletaDeCores.neutra[0],
          fontWeight: 700,
          '&:hover': {
            bgcolor: paletaDeCores.turquesa[50],
            borderColor: paletaDeCores.turquesa[600],
          },
          '&:focus-visible': {
            outline: `2px solid ${paletaDeCores.turquesa[600]}`,
            outlineOffset: 2,
          },
        }}
      >
        Nova reserva
      </Button>
    </Box>
  );
}
