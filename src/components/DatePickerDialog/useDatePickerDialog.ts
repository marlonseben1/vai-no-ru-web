import type { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';
import type { Refeicao } from 'types/refeicao';
import type { ReservaDiaInput } from 'types/reserva';

interface UseDatePickerDialogParams {
  value: ReservaDiaInput[];
  onChange: (dias: ReservaDiaInput[]) => void;
  onClose: () => void;
  diasBloqueados: string[];
}

function ordenarPorData(dias: ReservaDiaInput[]) {
  return [...dias].sort((a, b) => a.data.localeCompare(b.data));
}

export function useDatePickerDialog({
  value,
  onChange,
  onClose,
  diasBloqueados,
}: UseDatePickerDialogParams) {
  // rascunho das edições feitas no modal; null = ainda sem edição (mostra o valor do form)
  const [rascunho, setRascunho] = useState<ReservaDiaInput[] | null>(null);
  const dias = useMemo(
    () => ordenarPorData(rascunho ?? value),
    [rascunho, value],
  );
  const diasSelecionados = useMemo(() => dias.map((dia) => dia.data), [dias]);

  function desabilitarData(data: Dayjs): boolean {
    const diaSemana = data.day();
    return (
      diaSemana === 0 ||
      diaSemana === 6 ||
      diasBloqueados.includes(data.format('YYYY-MM-DD'))
    );
  }

  function handleToggleData(data: Dayjs | null) {
    if (!data) return;
    const dataISO = data.format('YYYY-MM-DD');

    if (dias.some((dia) => dia.data === dataISO)) {
      setRascunho(dias.filter((dia) => dia.data !== dataISO));
    } else {
      setRascunho(
        ordenarPorData([...dias, { data: dataISO, refeicao: 'Almoco' }]),
      );
    }
  }

  function handleTrocarRefeicao(data: string, refeicao: Refeicao) {
    setRascunho(
      dias.map((dia) => (dia.data === data ? { ...dia, refeicao } : dia)),
    );
  }

  function handleRemover(data: string) {
    setRascunho(dias.filter((dia) => dia.data !== data));
  }

  function handleConfirmar() {
    onChange(dias);
    onClose();
  }

  // o rascunho é descartado em handleExited, depois da animação de saída
  function handleCancelar() {
    onClose();
  }

  function handleExited() {
    setRascunho(null);
  }

  return {
    dias,
    diasSelecionados,
    desabilitarData,
    handleToggleData,
    handleTrocarRefeicao,
    handleRemover,
    handleConfirmar,
    handleCancelar,
    handleExited,
  };
}
