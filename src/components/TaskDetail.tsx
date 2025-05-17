import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateTask } from "../store/tasksSlice";
import type { Task } from "../store/tasksSlice";
import { Input, Button, Checkbox, Select } from "antd";
import styled from "styled-components";
import type { AppDispatch, RootState } from "../store";

const Container = styled.div`
    max-width: 600px;
    margin: 20px auto;
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
                status, // <- Add this line
            };
            dispatch(updateTask(updatedTask));
            navigate("/");
        }
    };

    if (!task) return null;

    return (
        <Container>
            <h2>Edit Task</h2>
            <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ marginBottom: 12 }}
            />
            <Input
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ marginBottom: 12 }}
            />
            <Input.TextArea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                style={{ marginBottom: 12 }}
            />
            <Select
                placeholder="Priority"
                value={priority || undefined}
                onChange={(value) => setPriority(value)}
                options={[
                    { value: "High", label: "High" },
                    { value: "Medium", label: "Medium" },
                    { value: "Low", label: "Low" },
                ]}
                style={{ marginBottom: 12 }}
            />
            <Select
                placeholder="Status"
                value={status}
                onChange={(value) => setStatus(value)}
                options={[
                    { value: "Todo", label: "Todo" },
                    { value: "In Progress", label: "In Progress" },
                    { value: "Review", label: "Review" },
                    { value: "Done", label: "Done" },
                ]}
                style={{ marginBottom: 12 }}
            />
            <Checkbox
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                style={{ marginBottom: 12 }}
            >
                Completed
            </Checkbox>
            <br />
            <Button type="primary" onClick={handleSave}>
                Save
            </Button>
            <Button style={{ marginLeft: 10 }} onClick={() => navigate("/")}>
                Cancel
            </Button>
        </Container>
    );
};

export default TaskDetail;
