"use client";

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { categories } from '@/lib/data';

const categoryMap = new Map(categories.map((c) => [c.name, c]));

export function SpendingBarChart({
  data,
}: {
  data: Record<string, number>;
}) {
  const chartData = React.useMemo(
    () =>
      Object.entries(data).map(([category, value]) => ({
        category,
        spent: value,
        fill: categoryMap.get(category)?.color || 'hsl(var(--muted))',
      })),
    [data]
  );

  const chartConfig = {
    spent: {
      label: 'Spent',
    },
  } satisfies ChartConfig;

   // Dynamically add categories to chartConfig for tooltip coloring
   chartData.forEach(item => {
    chartConfig[item.category as keyof typeof chartConfig] = {
      label: item.category,
      color: item.fill,
    }
  });


  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="spent" radius={8} />
      </BarChart>
    </ChartContainer>
  );
}
