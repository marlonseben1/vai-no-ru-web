import { ConfirmacaoContext } from 'contexts/ConfirmacaoContext';
import { useContext } from 'react';

export const useConfirmacao = () => useContext(ConfirmacaoContext);
