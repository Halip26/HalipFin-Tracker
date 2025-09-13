# HalipFin Tracker

A modern and intelligent personal finance tracker built to help you manage your income, expenses, and budgets with ease. This application provides AI-powered insights to help you understand your spending habits better.

## ✨ Features

- **📊 Interactive Dashboard**: Get a quick overview of your financial health with cards for total income, expenses, and current balance.
- **🤖 AI-Powered Insights**: Leverages Genkit and Google's Gemini model to analyze your spending data and suggest relevant charts and insights.
- **💸 Transaction Management**: Easily add and view your income and expense transactions.
- **🎯 Budget Goals**: Set monthly budgets for different spending categories and track your progress.
- **📈 Visualizations**: Understand your spending distribution with interactive pie and bar charts.
- **🎨 Modern UI**: Built with ShadCN UI and Tailwind CSS for a clean, responsive, and aesthetically pleasing interface.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **AI/Generative**: [Genkit (Google)](https://firebase.google.com/docs/genkit) with Gemini
- **Charts**: [Recharts](https://recharts.org/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm or your favorite package manager

### Installation

1.  **Clone the repository:**
    ```sh
    git clone <YOUR_REPOSITORY_URL>
    cd <YOUR_PROJECT_DIRECTORY>
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of your project and add your Google Gemini API key. You can get one from [Google AI Studio](https://makersuite.google.com/).

    ```env
    GEMINI_API_KEY="YOUR_API_KEY"
    ```

### Running the Application

1.  **Run the Genkit developer server (in a separate terminal):**
    This command starts the Genkit flows required for the AI features.
    ```sh
    npm run genkit:dev
    ```

2.  **Run the Next.js development server:**
    ```sh
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

---

This project was bootstrapped with [Firebase Studio](https://firebase.google.com/docs/studio).