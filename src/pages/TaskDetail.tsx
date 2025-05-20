import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateTask } from "../store/tasksSlice";
import type { Task } from "../store/tasksSlice";
import { Input, Button, Checkbox, Select } from "antd";
import styled from "styled-components";
import type { AppDispatch, RootState } from "../store";

const Container = styled.main`
    max-width: 600px;
    margin: 20px auto;
    padding: 16px;
`;

const Label = styled.label`
    font-weight: bold;
    display: block;
    margin-bottom: 4px;
    margin-top: 12px;
`;

const TaskDetail: React.FC = () => {
    const { taskId } = useParams<{ taskId: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const task = useSelector((state: RootState) =>
        state.tasks.tasks.find((t) => t.id === taskId)
    );

    const [category, setCategory] = useState(task?.category || "");
    const [priority, setPriority] = useState<"High" | "Medium" | "Low" | "">(
        task?.priority || ""
    );
    const [title, setTitle] = useState(task?.title || "");
    const [description, setDescription] = useState(task?.description || "");
    const [completed, setCompleted] = useState(task?.completed || false);
    const [status, setStatus] = useState<Task["status"]>(
        task?.status || "Todo"
    );

    useEffect(() => {
        if (!task) navigate("/");
    }, [task, navigate]);

    const handleSave = () => {
        if (task) {
            const updatedTask: Task = {
                ...task,
                title,
                description,
                completed,
                category,
                priority: priority || undefined,
                status,
            };
            dispatch(updateTask(updatedTask));
            navigate("/");
        }
    };

    if (!task) return null;

    return (
        <Container role="main" aria-labelledby="edit-task-heading">
            <h1 id="edit-task-heading">Edit Task</h1>

            <Label htmlFor="task-title">Title</Label>
            <Input
                id="task-title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <Label htmlFor="task-category">Category</Label>
            <Input
                id="task-category"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            <Label htmlFor="task-desc">Description</Label>
            <Input.TextArea
                id="task-desc"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
            />

            <Label htmlFor="task-priority">Priority</Label>
            <Select
                id="task-priority"
                placeholder="Priority"
                value={priority || undefined}
                onChange={(value) => setPriority(value)}
                options={[
                    { value: "High", label: "High" },
                    { value: "Medium", label: "Medium" },
                    { value: "Low", label: "Low" },
                ]}
                style={{ width: "100%" }}
            />

            <Label htmlFor="task-status">Status</Label>
            <Select
                id="task-status"
                placeholder="Status"
                value={status}
                onChange={(value) => setStatus(value)}
                options={[
                    { value: "Todo", label: "Todo" },
                    { value: "In Progress", label: "In Progress" },
                    { value: "Review", label: "Review" },
                    { value: "Done", label: "Done" },
                ]}
                style={{ width: "100%" }}
            />

            <Checkbox
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                aria-label="Mark task as completed"
                style={{ marginTop: 12 }}
            >
                Completed
            </Checkbox>

            <div style={{ marginTop: 16 }}>
                <Button
                    type="primary"
                    onClick={handleSave}
                    aria-label="Save changes to task"
                >
                    Save
                </Button>
                <Button
                    onClick={() => navigate("/")}
                    style={{ marginLeft: 10 }}
                    aria-label="Cancel editing and return to task list"
                >
                    Cancel
                </Button>
            </div>
        </Container>
    );
};

export default TaskDetail;
