import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";

const loadState = () => {
    try {
        const serializedState = localStorage.getItem("tasks");
        if (serializedState === null) return undefined;
        return { tasks: JSON.parse(serializedState) };
    } catch (e) {
        console.warn("Failed to load state:", e);
        return undefined;
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state.tasks);
        localStorage.setItem("tasks", serializedState);
    } catch (e) {
        console.warn("Failed to save state:", e);
    }
};

const preloadedState = loadState();

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
    },
    preloadedState,
});

store.subscribe(() => {
    saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
