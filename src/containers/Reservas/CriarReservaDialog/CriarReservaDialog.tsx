import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import {
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
import { LABEL_REFEICAO } from 'constants/labels';
import dayjs from 'dayjs';
import useIsResponsivo from 'hooks/useIsResponsivo';
import { useCallback } from 'react';
import { refeicoesDisponiveis } from 'utils/refeicoesDisponiveis';
import { formatarDataLista } from './CriarReservaDialog.helpers';
import { useCriarReservaDialog } from './useCriarReservaDialog';

const COR_PRINCIPAL = '#3F706B';
const COR_PRINCIPAL_HOVER = '#345B57';

export function CriarReservaDialog() {
  const isResponsivo = useIsResponsivo();
  const {
    open,
    dias,
    onClose,
    handleExited,
    handleRemover,
    handleReservar,
    desabilitarData,
    diasSelecionados,
    handleToggleData,
    refeicaoParaTodos,
    handleTrocarRefeicao,
    criarReservasMutation,
    mostrarAplicarParaTodos,
    handleAplicarRefeicaoParaTodos,
  } = useCriarReservaDialog();

  const DiaCalendario = useCallback(
    (props: PickerDayProps) => (
      <MultiDatePickerDay
        {...props}
        diasSelecionados={diasSelecionados}
        corPrincipal={COR_PRINCIPAL}
      />
    ),
    [diasSelecionados],
  );

  // o modal só cresce (abre a lista ao lado) quando há ao menos um dia selecionado
  const larguraModal = dias.length > 0 ? 760 : 440;

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
        <IconButton
          onClick={onClose}
          aria-label="Fechar"
          sx={{ width: 44, height: 44 }}
        >
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
            maxWidth: isResponsivo ? '100%' : 360,
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
            dayOfWeekFormatter={(dia) =>
              dia.format('dddd').charAt(0).toUpperCase()
            }
            slots={{ day: DiaCalendario }}
            sx={{
              '--tamanho-dia': isResponsivo
                ? 'min(44px, calc((100vw - 40px) / 7 - 4px))'
                : '48px',
              width: '100%',
              maxWidth: isResponsivo ? '100%' : 360,
              '& .MuiPickersCalendarHeader-root': { pl: 1, pr: 0 },
              '& .MuiPickersCalendarHeader-label': {
                fontSize: '1rem',
                fontWeight: 500,
              },
              '& .MuiDayCalendar-weekContainer': {
                display: 'grid',
                gridTemplateColumns: 'repeat(7, var(--tamanho-dia))',
                justifyContent: 'center',
                m: 0,
              },
              '& .MuiDayCalendar-header': {
                display: 'grid',
                gridTemplateColumns: 'repeat(7, var(--tamanho-dia))',
                justifyContent: 'center',
              },
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

            <Stack sx={{ width: '100%', minWidth: { md: 300 } }}>
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
                        minWidth: 120,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {formatarDataLista(dia.data)}
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
                      slotProps={{
                        htmlInput: {
                          'aria-label': `Refeição de ${dayjs(dia.data).format('DD/MM/YYYY')}`,
                        },
                      }}
                    >
                      {refeicoesDisponiveis(dia.data).map((valor) => (
                        <MenuItem key={valor} value={valor}>
                          {LABEL_REFEICAO[valor]}
                        </MenuItem>
                      ))}
                    </TextField>

                    <IconButton
                      onClick={() => handleRemover(dia.data)}
                      aria-label={`Remover ${dayjs(dia.data).format('DD/MM/YYYY')}`}
                      sx={{
                        width: 44,
                        height: 44,
                        '&:hover': {
                          color: 'error.main',
                          bgcolor: 'error.light',
                        },
                      }}
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
        <Button
          variant="contained"
          fullWidth
          disabled={dias.length === 0 || criarReservasMutation.isPending}
          onClick={handleReservar}
          sx={{
            borderRadius: 2,
            py: 1.2,
            minHeight: 48,
            fontWeight: 'bold',
            bgcolor: COR_PRINCIPAL,
            '&:hover': { bgcolor: COR_PRINCIPAL_HOVER },
            '&.Mui-disabled': { bgcolor: 'action.disabledBackground' },
          }}
        >
          Reservar {dias.length} {dias.length === 1 ? 'dia' : 'dias'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
