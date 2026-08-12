export type ViewTab = 'framework' | 'playground' | 'resources' | 'docs' | 'about';

export interface CodeBlockProps {
  title: string;
  code: string;
  language?: string;
  highlightLines?: number[];
  className?: string;
}

export interface FeatureCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  badge?: string;
  codeSnippet?: string;
}

export interface ConfigState {
  driver: 'roadrunner' | 'swoole' | 'workerman';
  frontend: 'vue' | 'react' | 'svelte' | 'blade';
  modules: string[];
  database: 'pgsql' | 'mysql' | 'sqlite';
}

export interface DocArticle {
  id: string;
  category: string;
  title: string;
  description: string;
  code: string;
}
