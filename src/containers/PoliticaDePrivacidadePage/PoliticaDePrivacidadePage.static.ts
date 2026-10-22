import { EMAIL_CONTATO } from 'constants/contato';

interface SecaoLegal {
  titulo: string;
  paragrafos?: string[];
  itens?: string[];
}

export const POLITICA_DE_PRIVACIDADE_VERSAO = '1.0';
export const POLITICA_DE_PRIVACIDADE_ATUALIZADO_EM = '22/10/2026';

export const POLITICA_DE_PRIVACIDADE_SECOES: SecaoLegal[] = [
  {
    titulo: 'Quem somos',
    paragrafos: [
      `O Vai no RU é mantido por Marlon Seben, controlador dos dados pessoais aqui tratados, nos termos da Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018). Contato para assuntos de privacidade: ${EMAIL_CONTATO}.`,
    ],
  },
  {
    titulo: 'Dados coletados',
    itens: [
      'Dados da conta Google: nome e e-mail, recebidos no login.',
      'Dados do cadastro: nome, perfil (por exemplo, aluno ou servidor) e origem da conta (UPF ou convidado). Para e-mails @upf.br, a matrícula é identificada a partir do e-mail.',
      'Dados de uso: reservas, preferências e histórico dentro do sistema.',
      'Dados técnicos: informações do navegador, páginas acessadas e interações, coletadas por ferramenta de análise somente se você aceitar os cookies de análise.',
      'Gravação de sessão: com o seu consentimento, a navegação é registrada em vídeo para identificar problemas de uso. Campos de formulário são sempre mascarados, assim como nome, e-mail e matrícula exibidos em tela.',
    ],
  },
  {
    titulo: 'Para que os dados são usados',
    itens: [
      'Criar e manter sua conta e permitir o login.',
      'Consultar o cardápio e realizar e gerenciar suas reservas.',
      'Garantir a segurança do sistema e prevenir fraudes.',
      'Entender como o sistema é usado e corrigir problemas, se você consentir com análise e gravação de sessão.',
      'Cumprir obrigações legais.',
    ],
  },
  {
    titulo: 'Bases legais',
    itens: [
      'Execução do serviço que você solicitou (conta, login e reservas).',
      'Consentimento, para cookies de análise e gravação de sessão. Você pode recusar ou revogar a qualquer momento.',
      'Cumprimento de obrigação legal e exercício regular de direitos, quando aplicável.',
      'Legítimo interesse, para segurança e prevenção a fraudes.',
    ],
  },
  {
    titulo: 'Cookies e tecnologias semelhantes',
    paragrafos: [
      'O Vai no RU usa duas categorias de cookies. Você pode mudar sua escolha a qualquer momento em "Preferências de cookies", no rodapé das páginas.',
    ],
    itens: [
      'Essenciais (sempre ativos): cookie de sessão, que mantém você logado, e o registro local da sua escolha de cookies. Sem eles o sistema não funciona.',
      'Análise e gravação de sessão (só com o seu aceite): cookies e armazenamento local do PostHog, que medem o uso e gravam a navegação.',
      'Login com Google: o botão de login é fornecido pelo Google, que pode definir seus próprios cookies, conforme a política dele.',
    ],
  },
  {
    titulo: 'Compartilhamento',
    paragrafos: [
      'O Vai no RU não vende seus dados. Eles são compartilhados apenas com:',
    ],
    itens: [
      'Google, para autenticação do login.',
      'PostHog (PostHog Inc., Estados Unidos), operador de análise e gravação de sessão, somente se você consentir. Isso envolve transferência internacional de dados. São enviados seu identificador interno, nome e a matrícula (no formato matrícula@upf.br).',
      'Provedores de infraestrutura que hospedam o sistema.',
      'Autoridades, por ordem judicial ou obrigação legal, ou para proteger direitos em disputas.',
    ],
  },
  {
    titulo: 'Por quanto tempo os dados são guardados',
    paragrafos: [
      'Os dados da conta são mantidos enquanto ela estiver ativa e por até 30 dias após a exclusão. As gravações de sessão são mantidas por até 90 dias. Após esses prazos, os dados são excluídos ou anonimizados, salvo se a lei exigir a guarda.',
    ],
  },
  {
    titulo: 'Segurança',
    paragrafos: [
      'O Vai no RU adota medidas técnicas e organizacionais para proteger seus dados, como conexão criptografada, controle de acesso e restrição de acesso às gravações. Nenhum sistema é totalmente seguro; em caso de incidente relevante, você e a autoridade competente serão avisados, conforme a LGPD.',
    ],
  },
  {
    titulo: 'Seus direitos',
    paragrafos: ['Pela LGPD, você pode solicitar a qualquer momento:'],
    itens: [
      'confirmação de que seus dados são tratados e acesso a eles;',
      'correção de dados incompletos, inexatos ou desatualizados;',
      'anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade;',
      'portabilidade dos dados;',
      'eliminação dos dados tratados com base no consentimento;',
      'informação sobre com quem os dados são compartilhados;',
      'informação sobre a possibilidade de não consentir e suas consequências;',
      'revogação do consentimento, sem prejudicar o tratamento já realizado.',
    ],
  },
  {
    titulo: 'Crianças e adolescentes',
    paragrafos: [
      'O Vai no RU é destinado a usuários com acesso ao Restaurante Universitário da UPF e a maiores de 18 anos. Não são coletados intencionalmente dados de menores de idade.',
    ],
  },
  {
    titulo: 'Alterações desta política',
    paragrafos: [
      'Esta política pode ser atualizada. A versão vigente fica sempre nesta página, com a data da última atualização. Mudanças relevantes serão comunicadas no sistema.',
    ],
  },
  {
    titulo: 'Contato',
    paragrafos: [
      `Para exercer seus direitos ou tirar dúvidas: ${EMAIL_CONTATO}. Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).`,
    ],
  },
];
