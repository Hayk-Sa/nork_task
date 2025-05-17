import React, { useState } from "react";
import {
    DndContext,
    DragOverlay,
    type DragEndEvent,
    type DragStartEvent,
} from "@dnd-kit/core";
import { useDispatch } from "react-redux";
import { updateTaskStatus } from "../store/tasksSlice";
import styled from "styled-components";
import type { Task } from "../store/tasksSlice";
import TaskColumn from "./TaskColumn";
import TaskCard from "./TaskCard";

type TaskBoardProps = {
    tasks: Task[];
};

const BoardWrapper = styled.div`
    display: flex;
    gap: 16px;
    margin-top: 24px;
    overflow-x: auto;
`;

const statuses: Task["status"][] = ["Todo", "In Progress", "Review", "Done"];

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks }) => {
    const dispatch = useDispatch();
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const handleDragStart = (event: DragStartEvent) => {
        const draggedTask = tasks.find((t) => t.id === event.active.id);
        if (draggedTask) {
            setActiveTask(draggedTask);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveTask(null); // Reset after drop

        if (!over || active.id === over.id) return;

        const activeTask = tasks.find((t) => t.id === active.id);
        const targetStatus = over.id as Task["status"];

        if (!activeTask || activeTask.status === targetStatus) return;

        dispatch(
            updateTaskStatus({
                id: activeTask.id,
                newStatus: targetStatus,
            })
        );
    };

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <BoardWrapper>
                {statuses.map((status) => (
                    <TaskColumn
                        key={status}
                        id={status}
                        title={status}
                        tasks={tasks.filter((t) => t.status === status)}
                    />
                ))}
            </BoardWrapper>

            <DragOverlay>
                {activeTask ? <TaskCard task={activeTask} /> : null}
            </DragOverlay>
        </DndContext>
    );
};

export default TaskBoard;
