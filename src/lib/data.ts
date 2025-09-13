import {
  UtensilsCrossed,
  Car,
  Ticket,
  Home,
  Zap,
  ShoppingBag,
  HeartPulse,
  MoreHorizontal,
  Briefcase,
  Gift,
} from 'lucide-react';
import type { Transaction, CategoryInfo, Budget, CategoryInfoSerializable } from '@/lib/types';
import * as Icons from 'lucide-react';


const categoryIcons: { [key: string]: typeof UtensilsCrossed } = {
  UtensilsCrossed,
  Car,
  Ticket,
  Home,
  Zap,
  ShoppingBag,
  HeartPulse,
  MoreHorizontal,
  Briefcase,
  Gift,
};

const rawCategories: Omit<CategoryInfo, 'icon'>[] = [
  // Expenses
  { name: 'Food', iconName: 'UtensilsCrossed', color: 'hsl(var(--chart-1))' },
  { name: 'Transportation', iconName: 'Car', color: 'hsl(var(--chart-2))' },
  { name: 'Entertainment', iconName: 'Ticket', color: 'hsl(var(--chart-3))' },
  { name: 'Housing', iconName: 'Home', color: 'hsl(var(--chart-4))' },
  { name: 'Utilities', iconName: 'Zap', color: 'hsl(var(--chart-5))' },
  { name: 'Shopping', iconName: 'ShoppingBag', color: 'hsl(var(--chart-1))' },
  { name: 'Health', iconName: 'HeartPulse', color: 'hsl(var(--chart-2))' },
  { name: 'Other', iconName: 'MoreHorizontal', color: 'hsl(var(--chart-3))' },
  // Income
  { name: 'Salary', iconName: 'Briefcase', color: 'hsl(var(--chart-1))' },
  { name: 'Freelance', iconName: 'Briefcase', color: 'hsl(var(--chart-2))' },
  { name: 'Gift', iconName: 'Gift', color: 'hsl(var(--chart-3))' },
];

export const categories: CategoryInfo[] = rawCategories.map(c => ({
  ...c,
  icon: categoryIcons[c.iconName]
}));

export const serializableCategories: CategoryInfoSerializable[] = rawCategories;

export const transactions: Transaction[] = [
  {
    id: '1',
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
    amount: 8000000,
    type: 'income',
    category: 'Salary',
    description: 'Monthly Salary',
  },
  {
    id: '2',
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
    amount: 550000,
    type: 'expense',
    category: 'Food',
    description: 'Groceries',
  },
  {
    id: '3',
    date: new Date(new Date().setDate(new Date().getDate() - 3)),
    amount: 300000,
    type: 'expense',
    category: 'Transportation',
    description: 'Gas',
  },
  {
    id: '4',
    date: new Date(new Date().setDate(new Date().getDate() - 4)),
    amount: 150000,
    type: 'expense',
    category: 'Entertainment',
    description: 'Movie tickets',
  },
  {
    id: '5',
    date: new Date(new Date().setDate(new Date().getDate() - 5)),
    amount: 2500000,
    type: 'expense',
    category: 'Housing',
    description: 'Rent',
  },
  {
    id: '6',
    date: new Date(new Date().setDate(new Date().getDate() - 6)),
    amount: 450000,
    type: 'expense',
    category: 'Utilities',
    description: 'Electricity Bill',
  },
  {
    id: '7',
    date: new Date(new Date().setDate(new Date().getDate() - 7)),
    amount: 750000,
    type: 'expense',
    category: 'Shopping',
    description: 'New clothes',
  },
  {
    id: '8',
    date: new Date(new Date().setDate(new Date().getDate() - 8)),
    amount: 200000,
    type: 'expense',
    category: 'Health',
    description: 'Pharmacy',
  },
  {
    id: '9',
    date: new Date(new Date().setDate(new Date().getDate() - 9)),
    amount: 125000,
    type: 'expense',
    category: 'Food',
    description: 'Lunch out',
  },
  {
    id: '10',
    date: new Date(new Date().setDate(new Date().getDate() - 12)),
    amount: 3000000,
    type: 'income',
    category: 'Freelance',
    description: 'Project X',
  },
  {
    id: '11',
    date: new Date(new Date().setDate(new Date().getDate() - 17)),
    amount: 50000,
    type: 'expense',
    category: 'Transportation',
    description: 'Bus fare',
  },
  {
    id: '12',
    date: new Date(new Date().setDate(new Date().getDate() - 22)),
    amount: 250000,
    type: 'expense',
    category: 'Food',
    description: 'Dinner with friends',
  },
];

export const budgets: Budget[] = [
  { category: 'Food', goal: 2000000 },
  { category: 'Transportation', goal: 500000 },
  { category: 'Entertainment', goal: 750000 },
  { category: 'Housing', goal: 2500000 },
  { category: 'Utilities', goal: 500000 },
  { category: 'Shopping', goal: 1000000 },
  { category: 'Health', goal: 500000 },
  { category: 'Other', goal: 250000 },
];
