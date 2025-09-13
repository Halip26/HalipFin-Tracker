'use server';

/**
 * @fileOverview An AI agent that suggests relevant spending charts based on user data.
 *
 * - suggestCharts - A function that suggests charts based on the provided data.
 * - ChartSuggestionInput - The input type for the suggestCharts function.
 * - ChartSuggestionOutput - The return type for the suggestCharts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChartSuggestionInputSchema = z.object({
  totalIncome: z.number().describe('The total income of the user.'),
  totalExpenses: z.number().describe('The total expenses of the user.'),
  spendingByCategory: z
    .record(z.number())
    .describe(
      'A record of spending by category, where the key is the category name and the value is the amount spent.'
    ),
  timePeriod: z
    .string()
    .describe(
      'The time period for which the data is being analyzed (e.g., monthly, yearly).'
    ),
});
export type ChartSuggestionInput = z.infer<typeof ChartSuggestionInputSchema>;

const ChartSuggestionOutputSchema = z.object({
  suggestedCharts: z
    .array(z.string())
    .describe(
      'An array of suggested chart types based on the available data (e.g., pie chart, bar chart, line chart).'
    ),
  insights: z
    .array(z.string())
    .describe(
      'An array of key insights derived from the suggested charts (e.g., percentage of income spent on each category, spending trends over time).'
    ),
});
export type ChartSuggestionOutput = z.infer<typeof ChartSuggestionOutputSchema>;

export async function suggestCharts(input: ChartSuggestionInput): Promise<ChartSuggestionOutput> {
  return suggestChartsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chartSuggestionPrompt',
  input: {schema: ChartSuggestionInputSchema},
  output: {schema: ChartSuggestionOutputSchema},
  prompt: `You are an AI assistant specializing in financial data analysis and visualization. Given the following financial data for a user, suggest the most relevant chart types to help them understand their spending habits and financial situation.

Data:
Time Period: {{{timePeriod}}}
Total Income: {{{totalIncome}}}
Total Expenses: {{{totalExpenses}}}
Spending by Category: {{#each spendingByCategory}}{{{@key}}}: {{{this}}}, {{/each}}

Based on this data, suggest chart types that would be most helpful for the user. For each chart type, also provide a key insight that can be derived from the chart.

Consider the following chart types:
- Pie chart (for showing spending distribution by category)
- Bar chart (for comparing spending across categories)
- Line chart (for showing spending trends over time)

Format your response as a JSON object with the following structure:
{
  "suggestedCharts": ["chart type 1", "chart type 2", ...],
  "insights": ["insight 1", "insight 2", ...]
}
`,
});

const suggestChartsFlow = ai.defineFlow(
  {
    name: 'suggestChartsFlow',
    inputSchema: ChartSuggestionInputSchema,
    outputSchema: ChartSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
