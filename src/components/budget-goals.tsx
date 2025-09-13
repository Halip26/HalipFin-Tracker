import type { Budget } from '@/lib/types';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export function BudgetGoals({
  budgets,
  spending,
}: {
  budgets: Budget[];
  spending: Record<string, number>;
}) {
  return (
    <div className="space-y-6">
      {budgets.map((budget) => {
        const spent = spending[budget.category] || 0;
        const progress = Math.min((spent / budget.goal) * 100, 100);
        const remaining = budget.goal - spent;

        return (
          <div key={budget.category} className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>{budget.category}</span>
              <span
                className={cn(
                  'font-semibold',
                  progress > 80 && 'text-destructive'
                )}
              >
                ${spent.toFixed(0)} / ${budget.goal}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground text-right">
              {remaining >= 0
                ? `$${remaining.toFixed(0)} remaining`
                : `$${Math.abs(remaining).toFixed(0)} over budget`}
            </p>
          </div>
        );
      })}
    </div>
  );
}
