import { useAppStore } from 'store/app/appStore';
import type { ReservaDiaInput } from 'types';
import { AvisoPendenteConteudo } from './AvisoPendenteConteudo';
import { AvisoPendenteRodape } from './AvisoPendenteRodape';
import { AvisoPendenteTitulo } from './AvisoPendenteTitulo';
import { montarTextosAviso } from './avisoPendente.helpers';
import { rootPropsAviso } from './avisoPendente.static';

interface AvisoPendenteOptions {
  /** Reservas recém-criadas, usadas para montar o conteúdo do aviso */
  dias: ReservaDiaInput[];
  /** Executa quando o usuário fecha o aviso, por qualquer meio */
  onClose?: () => void;
}

export function abrirAvisoPendente({ dias, onClose }: AvisoPendenteOptions) {
  const { setDialogGeral } = useAppStore.getState();
  const { titulo, subtitulo } = montarTextosAviso(dias);

  const handleFecharAviso = () => {
    setDialogGeral(null);
    onClose?.();
  };

  setDialogGeral({
    title: <AvisoPendenteTitulo titulo={titulo} subtitulo={subtitulo} />,
    content: <AvisoPendenteConteudo dias={dias} />,
    // o botão fecha direto pelo store e não passa por esse onClose (que cobre Esc e clique fora)
    onClose: onClose,
    rootProps: rootPropsAviso,
    footer: <AvisoPendenteRodape onEntendi={handleFecharAviso} />,
  });
}
