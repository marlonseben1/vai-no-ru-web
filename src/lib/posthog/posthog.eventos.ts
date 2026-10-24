/**
 * Catálogo de eventos do PostHog: `nome do evento` → `propriedades`.
 *
 * ! Não renomeie eventos existentes: o nome identifica o histórico no PostHog.
 */
export type EventosPostHog = {
  // Navegação
  $pageview: SemPropriedades;

  // Auth
  onboarding_concluido: SemPropriedades;

  // Cardápio
  cardapio_semana_navegada: { direcao: 'anterior' | 'proxima' | 'hoje' };

  // Reservas
  reserva_criada: PropriedadesReservaCriada;
  reserva_primeira_reserva: SemPropriedades;
  reserva_cancelada: SemPropriedades;
  reserva_reativada: SemPropriedades;
  reserva_editada: { refeicao: string };
  reserva_agendamento_forcado: SemPropriedades;
  reserva_erro: PropriedadesReservaErro;
  reserva_ces_exibida: SemPropriedades;
  reserva_ces_voto: PropriedadesReservaCesVoto;
};

export type NomeEvento = keyof EventosPostHog;

/**
 * Argumentos de propriedades de um evento:
 * - sem propriedades: nenhum argumento
 * - propriedades todas opcionais: argumento opcional
 * - demais casos: argumento obrigatório
 */
export type ArgsPropriedades<E extends NomeEvento> = [
  EventosPostHog[E],
] extends [undefined]
  ? []
  : Partial<EventosPostHog[E]> extends EventosPostHog[E]
    ? [propriedades?: EventosPostHog[E]]
    : [propriedades: EventosPostHog[E]];

/** Evento enviado sem propriedades */
type SemPropriedades = undefined;

// Propriedades de cada evento

interface PropriedadesReservaCriada {
  quantidadeDias: number;
  refeicoes: string[];
}

interface PropriedadesReservaCesVoto {
  notaCes: number;
  feedback: string | null;
}

interface PropriedadesReservaErro {
  acao: 'criar' | 'editar' | 'cancelar' | 'reativar' | 'forcar_agendamento';
  /** 0 quando a API não respondeu */
  status: number;
  codigo: string | null;
}
