import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import TaskDetail from "./components/TaskDetail";
import MainLayout from "./components/MainLayout";

const App: React.FC = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />} />
                <Route path="/task/:taskId" element={<TaskDetail />} />
            </Routes>
        </BrowserRouter>
    </Provider>
);

export default App;
