import { useEffect } from 'react';
import type { Page } from '../../App';

const siteName = 'FuturoCraque';
const baseUrl = 'https://profissionais-de-futebol.vercel.app';

const pageMeta: Record<Page, { description: string; title: string; path: string }> = {
  about: {
    description: 'Conheca a plataforma FuturoCraque para formacao organizada de jovens atletas.',
    path: '/sobre',
    title: 'Sobre o FuturoCraque',
  },
  athletes: {
    description: 'Busque atletas por posicao, cidade e nivel, salve favoritos e registre avaliacoes tecnicas.',
    path: '/atletas',
    title: 'Busca de atletas',
  },
  clubs: {
    description: 'Perfis esportivos organizados para clubes, avaliadores e olheiros.',
    path: '/clubes',
    title: 'Clubes e olheiros',
  },
  dashboard: {
    description: 'Painel do atleta com plano de treino, metas, perfil publico e inscricoes.',
    path: '/dashboard',
    title: 'Painel do atleta',
  },
  home: {
    description: 'Treinos, perfil esportivo, avaliacao e oportunidades verificadas para jovens atletas.',
    path: '/',
    title: 'FuturoCraque - Plataforma de formacao de atletas',
  },
  legal: {
    description: 'Termos, privacidade, LGPD e autorizacao de responsaveis no FuturoCraque.',
    path: '/legal',
    title: 'Termos e privacidade',
  },
  notFound: {
    description: 'A pagina solicitada nao foi encontrada no FuturoCraque.',
    path: '/404',
    title: 'Pagina nao encontrada',
  },
  parents: {
    description: 'Seguranca, autorizacao e acompanhamento familiar para atletas menores.',
    path: '/pais',
    title: 'Pais e responsaveis',
  },
  publicProfile: {
    description: 'Perfil publico de atleta com dados esportivos, videos, score e avaliacoes.',
    path: '/atleta',
    title: 'Perfil publico de atleta',
  },
  resources: {
    description: 'Biblioteca de videos, guias, planos de treino e ferramentas para evolucao esportiva.',
    path: '/recursos',
    title: 'Recursos de treino',
  },
  support: {
    description: 'Central de suporte para atletas, responsaveis, treinadores e parceiros.',
    path: '/suporte',
    title: 'Suporte',
  },
  trials: {
    description: 'Busque peneiras e testes em clubes por cidade, idade, posicao e requisitos.',
    path: '/peneiras',
    title: 'Testes e peneiras em clubes',
  },
  serverError: {
    description: 'Erro temporario ao carregar a plataforma FuturoCraque.',
    path: '/500',
    title: 'Erro no servidor',
  },
};

function setMeta(name: string, content: string, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let tag = document.head.querySelector<HTMLMetaElement>(selector);

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(property ? 'property' : 'name', name);
    document.head.appendChild(tag);
  }

  tag.content = content;
}

export function Seo({ page }: { page: Page }) {
  useEffect(() => {
    const meta = pageMeta[page];
    const url = `${baseUrl}${meta.path}`;
    const title = `${meta.title} | ${siteName}`;

    document.title = title;
    setMeta('description', meta.description);
    setMeta('robots', 'index,follow');
    setMeta('og:title', title, true);
    setMeta('og:description', meta.description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', url, true);
    setMeta('twitter:card', 'summary_large_image');

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [page]);

  return null;
}
