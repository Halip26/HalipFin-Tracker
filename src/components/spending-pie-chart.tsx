"use client";

import * as React from 'react';
import { Pie, PieChart } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { categories } from '@/lib/data';

const categoryMap = new Map(categories.map((c) => [c.name, c]));

export function SpendingPieChart({
  data,
}: {
  data: Record<string, number>;
}) {
  const chartData = React.useMemo(
    () =>
      Object.entries(data).map(([category, value]) => ({
        name: category,
        value,
        fill: categoryMap.get(category)?.color || 'hsl(var(--muted))',
      })),
    [data]
  );

  const chartConfig = React.useMemo(
    () =>
      chartData.reduce((acc, { name, fill }) => {
        acc[name] = { label: name, color: fill };
        return acc;
      }, {} as any),
    [chartData]
  );

  const totalValue = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [chartData]);

  return (
    <div className="relative">
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[300px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel nameKey="name" formatter={(value) => `Rp${Number(value).toLocaleString('id-ID')}`} />}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          strokeWidth={5}
        />
        <ChartLegend
            content={<ChartLegendContent nameKey="name" className="flex-wrap" />}
            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </PieChart>
      </ChartContainer>
       <div className="absolute inset-0 flex flex-col items-center justify-center" aria-hidden="true" style={{top: "-2rem"}}>
        <div className="text-center">
            <p className="text-sm text-muted-foreground">Total Spent</p>
            <p className="text-2xl font-bold font-headline">
            Rp{totalValue.toLocaleString('id-ID')}
            </p>
        </div>
      </div>
    </div>
  );
}
