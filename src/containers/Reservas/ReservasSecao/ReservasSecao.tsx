import { Box, Stack, Typography } from '@mui/material';
import { type ReactNode, useId } from 'react';

interface ReservasSecaoProps {
  titulo: string;
  children: ReactNode;
}

export function ReservasSecao({ titulo, children }: ReservasSecaoProps) {
  const idTitulo = useId();

  return (
    <Box
      component="section"
      aria-labelledby={idTitulo}
      sx={{ '&:not(:last-child)': { mb: 3 } }}
    >
      <Typography
        id={idTitulo}
        variant="h2"
        sx={{
          mb: 1.5,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'text.secondary',
        }}
      >
        {titulo}
      </Typography>
      <Stack spacing={1.5}>{children}</Stack>
    </Box>
  );
}
