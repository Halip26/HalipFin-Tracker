import { categories } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { Transaction } from '@/lib/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function RecentTransactions({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const categoryMap = new Map(categories.map((c) => [c.name, c]));

  return (
    <div className="space-y-6">
      {transactions.map((transaction) => {
        const categoryInfo = categoryMap.get(transaction.category);
        const Icon = categoryInfo?.icon;

        return (
          <div key={transaction.id} className="flex items-center">
            <Avatar className="h-9 w-9 border">
              <AvatarFallback className="bg-background">
                {Icon && (
                  <Icon
                    className="h-5 w-5 text-muted-foreground"
                    style={{ color: categoryInfo?.color }}
                  />
                )}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {transaction.description}
              </p>
              <p className="text-sm text-muted-foreground">
                {transaction.category}
              </p>
            </div>
            <div
              className={cn(
                'ml-auto font-medium',
                transaction.type === 'income' ? 'text-accent' : ''
              )}
            >
              {transaction.type === 'income' ? '+' : '-'}$
              {transaction.amount.toFixed(2)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
