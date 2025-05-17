import React, { useState } from "react";
import { Input, Select, Button } from "antd";
import { useDispatch } from "react-redux";
import { addTask } from "../store/tasksSlice";
import styled from "styled-components";
import type { AppDispatch } from "../store";

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const TaskForm: React.FC<{ onTaskAdded?: () => void }> = ({ onTaskAdded }) => {
    const [description, setDescription] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState<"High" | "Medium" | "Low" | "">(
        ""
    );

    const handleAdd = () => {
        if (!title.trim()) return;

        dispatch(
            addTask({
                title,
                description: description.trim() || undefined,
                category: category.trim() || undefined,
                priority: priority || undefined,
            })
        );

        setTitle("");
        setCategory("");
        setPriority("");
        setDescription("");
        onTaskAdded?.();
    };

    return (
        <FormWrapper>
            <Input
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Input
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <Select
                placeholder="Select priority"
                value={priority || undefined}
                onChange={(v) => setPriority(v)}
                options={[
                    { value: "High", label: "High" },
                    { value: "Medium", label: "Medium" },
                    { value: "Low", label: "Low" },
                ]}
            />
            <Input.TextArea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
            />
            <Button type="primary" onClick={handleAdd}>
                Add Task
            </Button>
        </FormWrapper>
    );
};

export default TaskForm;
