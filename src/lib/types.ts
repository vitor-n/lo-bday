export interface TextChunk {
  id: string;
  text: string;
  author?: string;
  source?: string;
  tags?: string[];
}

export interface Deck {
  id: string;
  title: string;
  description: string;
  icon: string;
  chunks: TextChunk[];
}

export type ThemeMode = 'dark' | 'light' | 'brutalist';
export type FontSizeOption = 'sm' | 'base' | 'lg' | 'xl';
