import React, { useState } from "react";
import { Input, Select, Button, Form } from "antd";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addTask } from "../../store/tasksSlice";
import type { AppDispatch } from "../../store";

const FormWrapper = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const TaskForm: React.FC<{ onTaskAdded?: () => void }> = ({ onTaskAdded }) => {
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState<"High" | "Medium" | "Low" | "">(
        ""
    );
    const dispatch = useDispatch<AppDispatch>();

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleAdd();
    };

    return (
        <FormWrapper layout="vertical" onSubmitCapture={handleSubmit}>
            <Form.Item label="Task Title" required>
                <Input
                    id="task-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    aria-required="true"
                />
            </Form.Item>

            <Form.Item label="Category">
                <Input
                    id="task-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </Form.Item>

            <Form.Item label="Priority">
                <Select
                    id="task-priority"
                    value={priority || undefined}
                    onChange={(v) => setPriority(v)}
                    placeholder="Select priority"
                    options={[
                        { value: "High", label: "High" },
                        { value: "Medium", label: "Medium" },
                        { value: "Low", label: "Low" },
                    ]}
                    aria-label="Select task priority"
                    allowClear
                />
            </Form.Item>

            <Form.Item label="Description">
                <Input.TextArea
                    id="task-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Task
                </Button>
            </Form.Item>
        </FormWrapper>
    );
};

export default TaskForm;
