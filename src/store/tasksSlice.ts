import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Task = {
    id: string;
    title: string;
    description?: string;
    category?: string;
    priority?: "High" | "Medium" | "Low";
    completed: boolean;
    status: "Todo" | "In Progress" | "Review" | "Done";
    order: number;
};

interface TasksState {
    tasks: Task[];
}

const initialState: TasksState = {
    tasks: [],
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask(
            state,
            action: PayloadAction<{
                title: string;
                description?: string;
                category?: string;
                priority?: "High" | "Medium" | "Low";
            }>
        ) {
            const newTask: Task = {
                id: Date.now().toString(),
                title: action.payload.title,
                description: action.payload.description,
                completed: false,
                status: "Todo",
                category: action.payload.category,
                priority: action.payload.priority,
                order: state.tasks.length,
            };
            state.tasks.push(newTask);
        },
        toggleTask(state, action: PayloadAction<string>) {
            const task = state.tasks.find((t) => t.id === action.payload);
            if (task) task.completed = !task.completed;
        },
        deleteTask(state, action: PayloadAction<string>) {
            state.tasks = state.tasks.filter((t) => t.id !== action.payload);
        },
        updateTask(state, action: PayloadAction<Task>) {
            const index = state.tasks.findIndex(
                (t) => t.id === action.payload.id
            );
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        reorderTasks(state, action: PayloadAction<string[]>) {
            action.payload.forEach((id, index) => {
                const task = state.tasks.find((t) => t.id === id);
                if (task) task.order = index;
            });
        },
        updateTaskStatus(
            state,
            action: PayloadAction<{ id: string; newStatus: Task["status"] }>
        ) {
            const task = state.tasks.find((t) => t.id === action.payload.id);
            if (task) {
                task.status = action.payload.newStatus;
            }
        },
    },
});

export const {
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    reorderTasks,
    updateTaskStatus,
} = tasksSlice.actions;

export default tasksSlice.reducer;
