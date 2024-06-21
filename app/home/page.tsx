"use client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { TaskDisplayContextProvider } from "@/context/taskDisplayContext";
import Provider from "@/components/Provider";
import HomePage from "./homePage";
import { ThemeProvider } from "@/context/ThemesProvider";

const queryClient = new QueryClient();
export default function page() {
  return (
    <Provider>
      <TaskDisplayContextProvider>
        <QueryClientProvider client={queryClient}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <HomePage />
          </ThemeProvider>
        </QueryClientProvider>
      </TaskDisplayContextProvider>
    </Provider>
  );
}
