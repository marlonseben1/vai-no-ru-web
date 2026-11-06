import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography } from '@mui/material';
import useIsResponsivo from 'hooks/useIsResponsivo';

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
        bgcolor: '#FFFFFF',
        border: '1px dashed #8A9493',
        borderRadius: '8px',
      }}
    >
      <Box>
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#1F2A2A' }}>
          Você não tem reservas próximas
        </Typography>
        <Typography sx={{ fontSize: 14, color: '#4A5453' }}>
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
          borderColor: '#3F706B',
          color: '#3F706B',
          bgcolor: '#FFFFFF',
          fontWeight: 700,
          '&:hover': { bgcolor: '#EAF0EF', borderColor: '#3F706B' },
          '&:focus-visible': { outline: '2px solid #3F706B', outlineOffset: 2 },
        }}
      >
        Nova reserva
      </Button>
    </Box>
  );
}
