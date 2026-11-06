import { Box, Pagination, PaginationItem, Typography } from '@mui/material';
import useIsResponsivo from 'hooks/useIsResponsivo';
import { PAGE_SIZE_RESERVAS } from '../Reservas.static';

interface ReservasPaginacaoProps {
  page: number;
  total: number;
  totalPaginas: number;
  onMudarPagina: (pagina: number) => void;
}

export function ReservasPaginacao({
  page,
  total,
  totalPaginas,
  onMudarPagina,
}: ReservasPaginacaoProps) {
  const isResponsivo = useIsResponsivo();
  const inicio = (page - 1) * PAGE_SIZE_RESERVAS + 1;
  const fim = Math.min(page * PAGE_SIZE_RESERVAS, total);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: isResponsivo ? 'center' : 'space-between',
        flexWrap: 'wrap',
        gap: 2,
        mt: 3,
      }}
    >
      {!isResponsivo && (
        <Typography variant="body2" color="text.secondary">
          Mostrando {inicio}–{fim} de {total}
        </Typography>
      )}
      <Pagination
        count={totalPaginas}
        page={page}
        onChange={(_event, novaPagina) => onMudarPagina(novaPagina)}
        color="primary"
        shape="rounded"
        getItemAriaLabel={(tipo, pagina) => {
          if (tipo === 'previous') return 'Página anterior';
          if (tipo === 'next') return 'Próxima página';
          return `Página ${pagina}`;
        }}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            aria-current={item.selected ? 'page' : undefined}
            sx={
              isResponsivo
                ? undefined
                : {
                    width: 40,
                    height: 40,
                    borderRadius: '8px',
                    '&.Mui-selected, &.Mui-selected:hover': {
                      bgcolor: '#3F706B',
                      color: '#FFFFFF',
                      fontWeight: 700,
                    },
                    '&.Mui-disabled': { color: '#8A9493', opacity: 1 },
                  }
            }
          />
        )}
      />
    </Box>
  );
}
