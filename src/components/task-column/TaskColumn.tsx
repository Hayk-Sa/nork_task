import React from "react";
import { useDroppable } from "@dnd-kit/core";
import styled from "styled-components";
import type { Task } from "../../store/tasksSlice";
import TaskCard from "../task-card/TaskCard";

const ColumnWrapper = styled.section`
    flex: 1;
    min-width: 250px;
    background: #f0f2f5;
    border-radius: 8px;
    padding: 12px;
`;

const Title = styled.span`
    font-size: 20px;
`;

type Props = {
    id: Task["status"];
    title: string;
    tasks: Task[];
};

const TaskColumn: React.FC<Props> = ({ id, title, tasks }) => {
    const { setNodeRef } = useDroppable({ id });
    const headingId = `${id}-heading`;

    return (
        <ColumnWrapper ref={setNodeRef} role="list" aria-labelledby={headingId}>
            <Title id={headingId}>{title}</Title>
            {tasks.map((task) => (
                <div key={task.id} role="listitem" tabIndex={0}>
                    <TaskCard task={task} />
                </div>
            ))}
        </ColumnWrapper>
    );
};

export default TaskColumn;
