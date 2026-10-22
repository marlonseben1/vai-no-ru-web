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
  reserva_criada: { quantidadeDias: number; refeicoes: string[] };
  reserva_primeira_reserva: SemPropriedades;
  reserva_cancelada: SemPropriedades;
  reserva_reativada: SemPropriedades;
  reserva_editada: { refeicao: string };
  reserva_agendamento_forcado: SemPropriedades;
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
