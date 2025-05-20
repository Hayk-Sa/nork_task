import React, { useState } from "react";
import { Select } from "antd";
import { useSelector } from "react-redux";
import styled from "styled-components";
import type { RootState } from "../../store";
import { TaskBoard } from "../task-board";

const Container = styled.div`
    margin: 0 10px;
`;

const FiltersWrapper = styled.div`
    display: flex;
    gap: 12px;
    margin-left: 117px;
    flex-wrap: wrap;
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: #333;
`;

const LabelTitle = styled.span`
    padding-bottom: 3px;
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

    const uniqueCategories = [
        ...new Set(tasks.map((t) => t.category).filter(Boolean)),
    ];

    return (
        <Container>
            <FiltersWrapper>
                <Label htmlFor="filter-category">
                    <LabelTitle>Category</LabelTitle>
                    <Select
                        id="filter-category"
                        aria-label="Filter by Category"
                        placeholder="Select category"
                        value={filterCategory || undefined}
                        onChange={(value) => setFilterCategory(value)}
                        allowClear
                        style={{ width: 160 }}
                        options={uniqueCategories.map((cat) => ({
                            value: cat!,
                            label: cat!,
                        }))}
                    />
                </Label>

                <Label htmlFor="filter-priority">
                    <LabelTitle>Priority</LabelTitle>
                    <Select
                        id="filter-priority"
                        aria-label="Filter by Priority"
                        placeholder="Select priority"
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
                </Label>

                <Label htmlFor="filter-completed">
                    <LabelTitle>Status</LabelTitle>
                    <Select
                        id="filter-completed"
                        aria-label="Filter by Status"
                        placeholder="Select status"
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
                </Label>
            </FiltersWrapper>

            <TaskBoard tasks={filteredTasks} />
        </Container>
    );
};

export default TaskList;
