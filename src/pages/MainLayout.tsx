import React, { useState } from "react";
import { Drawer, Button, Empty } from "antd";
import styled from "styled-components";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { TaskForm } from "../components/task-form";
import { TaskList } from "../components/task-list";

const Layout = styled.div`
    display: flex;
    height: 100vh;
`;

const SidebarTrigger = styled(Button)`
    position: fixed;
    top: 34px;
    left: 27px;
    z-index: 1000;
`;

const Content = styled.main`
    flex: 1;
    overflow-y: auto;
    padding: 10px;
`;

const SkipLink = styled.a`
    position: absolute;
    left: -999px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;

    &:focus {
        position: static;
        width: auto;
        height: auto;
        margin: 8px;
        padding: 4px;
        background: #000;
        color: #fff;
        z-index: 1001;
    }
`;

const MainLayout: React.FC = () => {
    const [open, setOpen] = useState(false);
    const tasks = useSelector((state: RootState) => state.tasks.tasks);

    return (
        <>
            <SkipLink href="#main-content">Skip to main content</SkipLink>

            <SidebarTrigger
                type="primary"
                onClick={() => setOpen(true)}
                aria-label="Open drawer to create a new task"
            >
                Create Task
            </SidebarTrigger>

            <Drawer
                title="Create Task"
                placement="left"
                width={400}
                onClose={() => setOpen(false)}
                open={open}
                destroyOnClose
                aria-label="Task creation drawer"
            >
                <TaskForm onTaskAdded={() => setOpen(false)} />
            </Drawer>

            <Layout>
                <Content id="main-content" role="main">
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
