import { EMAIL_CONTATO } from 'constants/contato';

interface SecaoLegal {
  titulo: string;
  paragrafos?: string[];
  itens?: string[];
}

export const TERMOS_DE_USO_VERSAO = '1.0';
export const TERMOS_DE_USO_ATUALIZADO_EM = '22/10/2026';

export const TERMOS_DE_USO_SECOES: SecaoLegal[] = [
  {
    titulo: 'Aceitação',
    paragrafos: [
      'Estes Termos de Uso regulam o uso do Vai no RU, mantido por Marlon Seben. Ao entrar com sua conta e marcar que leu e aceita estes Termos e a Política de Privacidade, você concorda com eles. Se não concordar, não utilize o sistema.',
    ],
  },
  {
    titulo: 'O que é o Vai no RU',
    paragrafos: [
      'O Vai no RU permite consultar o cardápio e agendar reservas automáticas de refeições no Restaurante Universitário da UPF, sem precisar preencher o formulário a cada vez.',
      'O Vai no RU é uma ferramenta independente, sem vínculo oficial com a UPF. A disponibilidade das refeições e as regras do restaurante são definidas pela UPF.',
    ],
  },
  {
    titulo: 'Cadastro e conta',
    itens: [
      'O acesso é feito com uma conta Google. E-mails @upf.br têm acesso liberado; outros e-mails ficam como convidado, sujeitos à aprovação.',
      'A conta é pessoal e não pode ser cedida, vendida ou compartilhada.',
      'Você deve informar dados verdadeiros (como nome e perfil) e mantê-los atualizados.',
      'Você é responsável pelas ações realizadas na sua conta e deve avisar o Vai no RU caso suspeite de uso não autorizado.',
    ],
  },
  {
    titulo: 'Condutas proibidas',
    paragrafos: ['Ao usar o sistema, você não pode:'],
    itens: [
      'usar a conta de outra pessoa ou se passar por ela;',
      'tentar acessar áreas, dados ou sistemas sem autorização, ou burlar medidas de segurança;',
      'sobrecarregar o sistema com automações, requisições em massa ou qualquer forma de ataque;',
      'usar o sistema para reservar refeições de forma fraudulenta ou contrária às regras do restaurante;',
      'copiar, modificar ou distribuir o sistema, exceto quando permitido por lei ou por licença aplicável.',
    ],
  },
  {
    titulo: 'Reservas e responsabilidade do usuário',
    paragrafos: [
      'As reservas dependem de sistemas e regras da UPF, fora do controle do Vai no RU. Embora o sistema busque efetivar as reservas como configurado, não há garantia que toda reserva será efetivada. Confira suas reservas e cancele as que não for aproveitar.',
    ],
  },
  {
    titulo: 'Propriedade intelectual',
    paragrafos: [
      'O código, o design, a marca e os demais conteúdos do Vai no RU pertencem a Marlon Seben ou a seus licenciantes, e são protegidos pela legislação aplicável. Estes Termos não transferem nenhum direito sobre eles além do uso do sistema.',
    ],
  },
  {
    titulo: 'Disponibilidade e limitação de responsabilidade',
    itens: [
      'O Vai no RU é oferecido "como está" e pode ficar indisponível por manutenção, falhas ou fatores externos, como instabilidade de serviços de terceiros (por exemplo, Google e sistemas da UPF).',
      'Nenhum sistema conectado à internet oferece segurança absoluta. O Vai no RU adota medidas razoáveis para proteger seus dados, conforme a Política de Privacidade.',
      'Na máxima extensão permitida em lei, o Vai no RU não responde por danos decorrentes de indisponibilidade, de dados incorretos informados pelo usuário, de decisões tomadas com base no sistema ou de falhas em serviços de terceiros.',
      'Nada nestes Termos exclui direitos que a lei garanta ao usuário.',
    ],
  },
  {
    titulo: 'Suspensão e encerramento',
    paragrafos: [
      'O Vai no RU pode suspender ou encerrar contas que violem estes Termos ou a legislação, ou que representem risco ao sistema ou a outros usuários, com aviso quando possível. Você pode parar de usar o sistema e pedir a exclusão dos seus dados a qualquer momento, conforme a Política de Privacidade.',
    ],
  },
  {
    titulo: 'Privacidade e cookies',
    paragrafos: [
      'O tratamento de dados pessoais segue a Política de Privacidade, que faz parte destes Termos.',
    ],
  },
  {
    titulo: 'Alterações dos Termos',
    paragrafos: [
      'Estes Termos podem ser atualizados. A versão vigente fica sempre publicada nesta página, com a data da última atualização. Mudanças relevantes serão comunicadas no sistema. O uso após a atualização indica concordância com a nova versão.',
    ],
  },
  {
    titulo: 'Lei aplicável, foro e contato',
    paragrafos: [
      'Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro da comarca de Marau/RS para resolver controvérsias, ressalvados os direitos do consumidor quando aplicáveis.',
      `Dúvidas e solicitações: ${EMAIL_CONTATO}.`,
    ],
  },
];
