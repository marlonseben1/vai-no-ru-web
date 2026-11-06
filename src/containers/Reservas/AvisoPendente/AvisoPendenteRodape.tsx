import { Button } from '@mui/material';
import { COR_PRINCIPAL, COR_PRINCIPAL_HOVER } from './avisoPendente.static';

interface AvisoPendenteRodapeProps {
  onEntendi: () => void;
}

export function AvisoPendenteRodape({ onEntendi }: AvisoPendenteRodapeProps) {
  return (
    <Button
      variant="contained"
      onClick={onEntendi}
      sx={{
        minHeight: 44,
        px: 3,
        borderRadius: 2,
        fontWeight: 700,
        bgcolor: COR_PRINCIPAL,
        '&:hover': { bgcolor: COR_PRINCIPAL_HOVER },
      }}
    >
      Entendi
    </Button>
  );
}
