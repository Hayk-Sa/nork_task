import React from "react";
import { useDroppable } from "@dnd-kit/core";
import styled from "styled-components";
import type { Task } from "../store/tasksSlice";
import TaskCard from "./TaskCard";

const ColumnWrapper = styled.div`
    flex: 1;
    min-width: 250px;
    background: #f0f2f5;
    padding: 12px;
    border-radius: 8px;
`;

type Props = {
    id: Task["status"];
    title: string;
    tasks: Task[];
};

const TaskColumn: React.FC<Props> = ({ id, title, tasks }) => {
    const { setNodeRef } = useDroppable({ id });

    return (
        <ColumnWrapper ref={setNodeRef}>
            <h3>{title}</h3>
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </ColumnWrapper>
    );
};

export default TaskColumn;
