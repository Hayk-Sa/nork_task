# 📝 Task Management App

A simple task management application built with **React**, **Redux Toolkit**, **Ant Design**, and **@dnd-kit** for drag-and-drop support.

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone git@github.com:Hayk-Sa/nork_task.git

```

Install Dependencies

npm install

npm run dev

src/
├── components/
│ ├── task-form/ # Form to create new tasks
│ ├── task-list/ # Filter controls + board
│ ├── task-board/ # Kanban board wrapper
│ ├── task-column/ # Columns for task statuses
│ └── task-card/ # Individual draggable task cards
│
├── pages/
│ └── MainLayout.tsx # Main app layout and drawer
│
├── store/
│ ├── index.ts # Redux store setup
│ └── tasksSlice.ts # Task-related actions & reducer
│
├── App.tsx # Root app component
├── index.tsx # React DOM entry point
└── index.css # Global styles (fonts, resets)

Features
Add/Edit/Delete tasks
Filter tasks by category, priority, and status
Drag and drop tasks between columns
Styled using Ant Design + Styled Components
State managed with Redux Toolkit
Font: Nunito, set globally in index.css
