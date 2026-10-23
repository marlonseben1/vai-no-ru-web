import { DialogContent, Stack } from '@mui/material';
import type { KeyboardEvent } from 'react';
import { NOTAS_CES, type NotaCes } from 'types/ces';
import {
  ESTILO_POR_POSICAO,
  ID_TITULO_CES,
  type PosicaoCes,
} from '../CesDialog.static';
import { CesNota } from '../CesNota/CesNota';

interface CesEtapaAvaliacaoProps {
  nota: NotaCes | null;
  posicao: PosicaoCes;
  onSelecionarNota: (nota: NotaCes) => void;
}

const PASSO_POR_TECLA: Record<string, number> = {
  ArrowUp: -1,
  ArrowLeft: -1,
  ArrowDown: 1,
  ArrowRight: 1,
};

export function CesEtapaAvaliacao({
  nota,
  posicao,
  onSelecionarNota,
}: CesEtapaAvaliacaoProps) {
  const { colunaNotaSx, espacamentoNotas } = ESTILO_POR_POSICAO[posicao];

  // além do Tab, as setas movem a seleção e o foco entre as notas
  function handleTeclado(evento: KeyboardEvent<HTMLDivElement>) {
    const passo = PASSO_POR_TECLA[evento.key];
    if (!passo) return;

    evento.preventDefault();
    const atual = nota ? NOTAS_CES.indexOf(nota) : -passo;
    const indice = (atual + passo + NOTAS_CES.length) % NOTAS_CES.length;
    const proxima = NOTAS_CES[indice];
    if (!proxima) return;

    onSelecionarNota(proxima);
    evento.currentTarget
      .querySelectorAll<HTMLElement>('[role="radio"]')
      [indice]?.focus();
  }

  return (
    <DialogContent sx={{ pb: 3 }}>
      <Stack
        role="radiogroup"
        aria-labelledby={ID_TITULO_CES}
        direction="row"
        spacing={espacamentoNotas}
        sx={{ justifyContent: 'space-between' }}
        onKeyDown={handleTeclado}
      >
        {NOTAS_CES.map((valor) => (
          <CesNota
            key={valor}
            valor={valor}
            colunaSx={colunaNotaSx}
            selecionada={nota === valor}
            onSelecionar={onSelecionarNota}
          />
        ))}
      </Stack>
    </DialogContent>
  );
}
