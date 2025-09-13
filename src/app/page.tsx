import { DollarSign, CreditCard, Wallet, Activity } from 'lucide-react';

import { suggestCharts } from '@/ai/flows/suggest-charts';
import { transactions, budgets, serializableCategories } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MainNav } from '@/components/main-nav';
import { UserNav } from '@/components/user-nav';
import { RecentTransactions } from '@/components/recent-transactions';
import { BudgetGoals } from '@/components/budget-goals';
import { SpendingPieChart } from '@/components/spending-pie-chart';
import { SpendingBarChart } from '@/components/spending-bar-chart';
import { AddTransactionSheet } from '@/components/add-transaction-sheet';

export default async function DashboardPage() {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const spendingByCategory = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const chartSuggestions = await suggestCharts({
    totalIncome,
    totalExpenses,
    spendingByCategory,
    timePeriod: 'this month',
  });

  return (
    <div className="flex-col md:flex">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 md:px-8">
          <h1 className="text-2xl font-bold tracking-tight font-headline text-primary">
            Halip Finance Tracker
          </h1>
          <MainNav className="mx-6 hidden md:flex" />
          <div className="ml-auto flex items-center space-x-4">
            <AddTransactionSheet categories={serializableCategories} />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight font-headline">
            Dashboard
          </h2>
        </div>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Income
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  Rp{totalIncome.toLocaleString('id-ID')}
                </div>
                <p className="text-xs text-muted-foreground">
                  in the last 30 days
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Expenses
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">
                  Rp{totalExpenses.toLocaleString('id-ID')}
                </div>
                <p className="text-xs text-muted-foreground">
                  in the last 30 days
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Balance</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Rp{balance.toLocaleString('id-ID')}</div>
                <p className="text-xs text-muted-foreground">
                  Your current balance
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Insight</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium">
                  {chartSuggestions.insights[0] || 'No insights available.'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {chartSuggestions.insights[1]}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
                <CardDescription>
                  A breakdown of your expenses.
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                {chartSuggestions.suggestedCharts.includes('pie chart') && (
                  <SpendingPieChart data={spendingByCategory} />
                )}
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  Your 5 most recent transactions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentTransactions transactions={transactions.slice(0, 5)} />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Budget Goals</CardTitle>
                <CardDescription>
                  Your progress towards monthly budget goals.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BudgetGoals budgets={budgets} spending={spendingByCategory} />
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Category Comparison</CardTitle>
                <CardDescription>
                  Comparing spending amounts across categories.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {chartSuggestions.suggestedCharts.includes('bar chart') && (
                  <SpendingBarChart data={spendingByCategory} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
