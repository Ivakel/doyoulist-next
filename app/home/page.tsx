"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { TaskDisplayContextProvider } from "@/context/taskDisplayContext"
import Provider from "@/components/Provider"
import HomePage from "./homePage"
import { ThemeProvider } from "@/context/ThemesProvider"
import { AddTaskContextProvider } from "@/context/AddTaskContext"
import { MainDisplayContextProvider } from "@/context/MainDisplayContext"
import { EditDailyTaskContextProvider } from "@/context/EditDailyTaskDataContext"

const queryClient = new QueryClient()
export default function page() {
    return (
        <Provider>
            <EditDailyTaskContextProvider>
                <MainDisplayContextProvider>
                    <TaskDisplayContextProvider>
                        <QueryClientProvider client={queryClient}>
                            <ThemeProvider
                                attribute="class"
                                defaultTheme="system"
                                enableSystem
                                disableTransitionOnChange
                            >
                                <AddTaskContextProvider>
                                    <HomePage />
                                </AddTaskContextProvider>
                            </ThemeProvider>
                        </QueryClientProvider>
                    </TaskDisplayContextProvider>
                </MainDisplayContextProvider>
            </EditDailyTaskContextProvider>
        </Provider>
    )
}
