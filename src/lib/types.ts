import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

export type Icon = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
>;

export type Transaction = {
  id: string;
  date: Date;
  amount: number;
  type: 'income' | 'expense';
  category: string; // category name
  description: string;
};

export type CategoryInfo = {
  name: string;
  icon: Icon;
  color: string; // HSL color string
};

export type Budget = {
  category: string; // category name
  goal: number;
};
