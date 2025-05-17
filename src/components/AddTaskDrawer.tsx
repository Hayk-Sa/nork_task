import React, { useState } from "react";
import { Drawer, Button } from "antd";
import styled from "styled-components";
import TaskList from "./TaskList";

const AddTaskButton = styled(Button)`
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1000;
    background: #1890ff;
    color: white;
    border: none;

    &:hover {
        background: #40a9ff;
    }
`;

const AddTaskDrawerView: React.FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <AddTaskButton type="primary" onClick={() => setOpen(true)}>
                Add Task
            </AddTaskButton>

            <Drawer
                title="Add Task"
                placement="left"
                width={720}
                onClose={() => setOpen(false)}
                open={open}
                bodyStyle={{ padding: 0 }}
            >
                <TaskList />
            </Drawer>
        </>
    );
};

export default AddTaskDrawerView;
