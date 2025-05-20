import React, { useState } from "react";
import { Drawer, Button, Empty } from "antd";
import styled from "styled-components";
import TaskList from "./TaskList";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import TaskForm from "./TaskForm";

const Layout = styled.div`
    display: flex;
    height: 100vh;
`;

const SidebarTrigger = styled(Button)`
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1000;
`;

const Content = styled.div`
    flex: 1;
    overflow-y: auto;
`;

const MainLayout: React.FC = () => {
    const [open, setOpen] = useState(false);
    const tasks = useSelector((state: RootState) => state.tasks.tasks);

    return (
        <>
            <SidebarTrigger type="primary" onClick={() => setOpen(true)}>
                Create Task
            </SidebarTrigger>

            <Drawer
                title="Create Task"
                placement="left"
                width={400}
                onClose={() => setOpen(false)}
                open={open}
                destroyOnClose
            >
                <TaskForm onTaskAdded={() => setOpen(false)} />
            </Drawer>

            <Layout>
                <Content>
                    {tasks.length === 0 ? (
                        <Empty description="No tasks available. Add one!" />
                    ) : (
                        <TaskList />
                    )}
                </Content>
            </Layout>
        </>
    );
};

export default MainLayout;
