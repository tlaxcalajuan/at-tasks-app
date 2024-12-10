import React from "react";
import TaskBoard from "../../components/TaskBoard";

type Task = {
  id: number;
  title: string;
  status: "pending" | "in-progress" | "completed";
};

const mockTasks: Task[] = [
  { id: 1, title: "Task 1", status: "pending" },
  { id: 2, title: "Task 2", status: "in-progress" },
  { id: 3, title: "Task 3", status: "completed" },
  { id: 4, title: "Task 4", status: "pending" },
  { id: 5, title: "Task 5", status: "in-progress" },
];

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Task Board</h1>
      <TaskBoard tasks={mockTasks} />
    </div>
  );
};

export default App;
