import { ReactNode } from 'react';

export interface TipCategory {
  icon: ReactNode;
  title: string;
  key: string;
}

export interface Tip {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface TipContent {
  [key: string]: Tip[];
}