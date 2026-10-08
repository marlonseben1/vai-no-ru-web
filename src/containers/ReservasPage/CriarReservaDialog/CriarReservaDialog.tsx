import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import type { PickerDayProps } from '@mui/x-date-pickers/PickerDay';
import { MultiDatePickerDay } from 'components/MultiDatePickerDay/MultiDatePickerDay';
import dayjs from 'dayjs';
import useIsResponsivo from 'hooks/useIsResponsivo';
import { useCallback } from 'react';
import { LABEL_REFEICAO } from 'shared/labels';
import { refeicoesDisponiveis } from 'shared/prazosReserva';
import { useCriarReservaDialog } from './useCriarReservaDialog';

interface CriarReservaDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CriarReservaDialog({ open, onClose }: CriarReservaDialogProps) {
  const isResponsivo = useIsResponsivo();
  const {
    dias,
    diasSelecionados,
    diasBloqueados,
    criarReservasMutation,
    desabilitarData,
    handleToggleData,
    refeicaoParaTodos,
    mostrarAplicarParaTodos,
    handleTrocarRefeicao,
    handleAplicarRefeicaoParaTodos,
    handleRemover,
    handleReservar,
    handleExited,
  } = useCriarReservaDialog({ onClose });

  const DiaCalendario = useCallback(
    (props: PickerDayProps) => (
      <MultiDatePickerDay
        {...props}
        diasSelecionados={diasSelecionados}
        diasBloqueados={diasBloqueados}
      />
    ),
    [diasSelecionados, diasBloqueados],
  );

  // o modal só cresce (abre a lista ao lado) quando há ao menos um dia selecionado
  const larguraModal = dias.length > 0 ? 900 : 480;

  return (
    <Dialog
      open={open}
      onClose={(_event, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
        onClose();
      }}
      maxWidth={false}
      fullScreen={isResponsivo}
      slotProps={{
        transition: { onExited: handleExited },
        paper: {
          sx: isResponsivo
            ? { overflow: 'hidden' }
            : {
                borderRadius: 3,
                overflow: 'hidden',
                m: 4,
                width: larguraModal,
                maxWidth: 'calc(100% - 64px)',
                transition: 'width 0.25s ease',
              },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 0,
        }}
      >
        Nova reserva
        <IconButton size="small" onClick={onClose} aria-label="Fechar">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: isResponsivo ? 'column' : 'row',
          alignItems: isResponsivo ? 'center' : 'flex-start',
          p: isResponsivo ? 1 : 2,
          overflowX: 'hidden',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: isResponsivo ? '100%' : 440,
            flexShrink: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <DateCalendar
            value={null}
            disablePast
            onChange={handleToggleData}
            shouldDisableDate={desabilitarData}
            slots={{ day: DiaCalendario }}
            sx={{
              '--tamanho-dia': isResponsivo
                ? 'min(44px, calc((100vw - 40px) / 7 - 4px))'
                : '52px',
              width: '100%',
              maxWidth: isResponsivo ? '100%' : 440,
              height: 'auto',
              maxHeight: 'none',
              '& .MuiDayCalendar-weekDayLabel': {
                width: 'var(--tamanho-dia)',
                height: 'var(--tamanho-dia)',
              },
              '& .MuiDayCalendar-slideTransition': {
                minHeight: 'calc(6 * (var(--tamanho-dia) + 4px))',
              },
            }}
          />
        </Box>

        {dias.length > 0 && (
          <>
            <Divider
              orientation={isResponsivo ? 'horizontal' : 'vertical'}
              flexItem
              sx={isResponsivo ? { my: 1, width: '100%' } : { mx: 2, my: 2 }}
            />

            <Stack sx={{ width: '100%', minWidth: { md: 360 } }}>
              {mostrarAplicarParaTodos && refeicaoParaTodos && (
                <Button
                  size="small"
                  variant="outlined"
                  onClick={handleAplicarRefeicaoParaTodos}
                  sx={{
                    alignSelf: isResponsivo ? 'stretch' : 'flex-start',
                    mt: 1,
                    mx: isResponsivo ? 1 : 0,
                  }}
                >
                  Alterar para todos ({LABEL_REFEICAO[refeicaoParaTodos]})
                </Button>
              )}

              <Stack
                spacing={2.5}
                sx={{
                  width: '100%',
                  // no mobile (fullscreen) quem rola é o conteúdo da modal
                  maxHeight: isResponsivo ? 'none' : 420,
                  overflowY: isResponsivo ? 'visible' : 'auto',
                  overflowX: isResponsivo ? 'visible' : 'hidden',
                  py: 1.5,
                  px: isResponsivo ? 1 : 0,
                }}
              >
                {dias.map((dia) => (
                  <Stack
                    key={dia.data}
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: 'center' }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        minWidth: 84,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {dayjs(dia.data).format('DD/MM/YYYY')}
                    </Typography>

                    <TextField
                      select
                      size="small"
                      label="Refeição"
                      value={dia.refeicao}
                      onChange={(event) =>
                        handleTrocarRefeicao(
                          dia.data,
                          event.target.value as typeof dia.refeicao,
                        )
                      }
                      sx={{ flex: 1, minWidth: 0 }}
                    >
                      {refeicoesDisponiveis(dia.data).map((valor) => (
                        <MenuItem key={valor} value={valor}>
                          {LABEL_REFEICAO[valor]}
                        </MenuItem>
                      ))}
                    </TextField>

                    <IconButton
                      size="small"
                      onClick={() => handleRemover(dia.data)}
                      aria-label="Remover data"
                    >
                      <DeleteOutlined fontSize="small" />
                    </IconButton>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          px: 2,
          pb: 2,
          flexDirection: 'column',
          gap: 1,
          '& > :not(style) ~ :not(style)': { ml: 0 },
        }}
      >
        {criarReservasMutation.isError && (
          <Alert severity="error" sx={{ width: '100%' }}>
            {criarReservasMutation.error.message}
          </Alert>
        )}
        <Button
          variant="contained"
          fullWidth
          disabled={dias.length === 0 || criarReservasMutation.isPending}
          onClick={handleReservar}
          sx={{ borderRadius: 2, py: 1.2, fontWeight: 'bold' }}
        >
          Reservar ({dias.length})
        </Button>
      </DialogActions>
    </Dialog>
  );
}
