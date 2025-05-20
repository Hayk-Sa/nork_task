import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import styled from "styled-components";
import type { Task } from "../store/tasksSlice";
import { Card, Tag, Tooltip, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTask } from "../store/tasksSlice";

const DraggableWrapper = styled.div<{ isDragging: boolean }>`
    opacity: ${(props) => (props.isDragging ? 0.5 : 1)};
    cursor: grab;
    margin-top: 10px;
`;

type Props = {
    task: Task;
};

const priorityColorMap = {
    High: "red",
    Medium: "orange",
    Low: "green",
};

const TaskCard: React.FC<Props> = ({ task }) => {
    const {
        attributes,
        listeners: originalListeners,
        setNodeRef,
        isDragging,
    } = useDraggable({
        id: task.id,
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigate(`/task/${task.id}`);
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsModalVisible(true);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteTask(task.id));
        setIsModalVisible(false);
    };

    const handleCancelDelete = () => {
        setIsModalVisible(false);
    };

    const listeners = {
        ...originalListeners,
        onPointerDown: (event: React.PointerEvent) => {
            const target = event.target as HTMLElement;
            if (
                target.closest(".taskcard-edit-icon") ||
                target.closest(".taskcard-delete-icon")
            ) {
                event.stopPropagation(); // Prevent drag from starting on icon click
                return;
            }
            originalListeners?.onPointerDown?.(event);
        },
    };

    return (
        <>
            <DraggableWrapper
                ref={setNodeRef}
                {...listeners}
                {...attributes}
                isDragging={isDragging}
            >
                <Card
                    size="small"
                    title={`Title: ${task.title}`}
                    style={{ marginBottom: 12 }}
                    extra={
                        <div style={{ display: "flex", gap: 8 }}>
                            <Tooltip title="Edit">
                                <EditOutlined
                                    className="taskcard-edit-icon"
                                    onClick={handleEdit}
                                />
                            </Tooltip>
                            <Tooltip title="Delete">
                                <DeleteOutlined
                                    className="taskcard-delete-icon"
                                    onClick={handleDeleteClick}
                                />
                            </Tooltip>
                        </div>
                    }
                >
                    {task.category && (
                        <Tag
                            style={{
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word",
                            }}
                            color="blue"
                        >
                            Category: {task.category}
                        </Tag>
                    )}
                    {task.priority && (
                        <Tag color={priorityColorMap[task.priority]}>
                            Priority: {task.priority}
                        </Tag>
                    )}
                    {task.completed && <Tag color="green">✔ Completed</Tag>}
                    {task.description && (
                        <div
                            style={{
                                marginTop: 8,
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word",
                            }}
                        >
                            Description: {task.description}
                        </div>
                    )}
                </Card>
            </DraggableWrapper>

            <Modal
                title="Are you sure you want to delete this task?"
                open={isModalVisible}
                onOk={handleConfirmDelete}
                onCancel={handleCancelDelete}
                okText="Yes, delete"
                okType="danger"
                cancelText="Cancel"
            >
                <p>"{task.title}" will be permanently removed.</p>
            </Modal>
        </>
    );
};

export default TaskCard;
