import React, { useState } from "react";
import { Select } from "antd";
import { useSelector } from "react-redux";
import styled from "styled-components";
import type { RootState } from "../store";
import TaskBoard from "./TaskBoard";

const Container = styled.div`
    margin: 0 10px;
`;

const TaskList: React.FC = () => {
    const tasks = useSelector((state: RootState) => state.tasks.tasks);

    const [filterCategory, setFilterCategory] = useState<string | null>(null);
    const [filterPriority, setFilterPriority] = useState<
        "High" | "Medium" | "Low" | null
    >(null);
    const [filterCompleted, setFilterCompleted] = useState<boolean | null>(
        null
    );

    const filteredTasks = tasks
        .filter((task) =>
            filterCategory ? task.category === filterCategory : true
        )
        .filter((task) =>
            filterPriority ? task.priority === filterPriority : true
        )
        .filter((task) =>
            filterCompleted !== null ? task.completed === filterCompleted : true
        );

    return (
        <Container>
            <div
                style={{
                    display: "flex",
                    gap: 12,
                    marginTop: 12,
                    marginLeft: 117,
                    flexWrap: "wrap",
                }}
            >
                <Select
                    placeholder="Filter by Category"
                    value={filterCategory || undefined}
                    onChange={(value) => setFilterCategory(value)}
                    allowClear
                    style={{ width: 160 }}
                    options={[
                        ...new Set(
                            tasks.map((t) => t.category).filter(Boolean)
                        ),
                    ].map((cat) => ({ value: cat!, label: cat! }))}
                />

                <Select
                    placeholder="Filter by Priority"
                    value={filterPriority || undefined}
                    onChange={(value) => setFilterPriority(value)}
                    allowClear
                    style={{ width: 160 }}
                    options={[
                        { value: "High", label: "High" },
                        { value: "Medium", label: "Medium" },
                        { value: "Low", label: "Low" },
                    ]}
                />

                <Select
                    placeholder="Filter by Status"
                    value={
                        filterCompleted !== null
                            ? filterCompleted
                                ? "Completed"
                                : "Incomplete"
                            : undefined
                    }
                    onChange={(value) => {
                        if (value === "Completed") setFilterCompleted(true);
                        else if (value === "Incomplete")
                            setFilterCompleted(false);
                        else setFilterCompleted(null);
                    }}
                    allowClear
                    style={{ width: 160 }}
                    options={[
                        { value: "Completed", label: "Completed" },
                        { value: "Incomplete", label: "Incomplete" },
                    ]}
                />
            </div>
            <TaskBoard tasks={filteredTasks} />
        </Container>
    );
};

export default TaskList;
