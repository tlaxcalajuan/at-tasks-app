import React from "react";
import TaskColumn from "./TaskColumn";

type Task = {
  id: number;
  title: string;
  status: "pending" | "in-progress" | "completed";
};

type TaskBoardProps = {
  tasks: Task[];
};

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks }) => {
  const groupedTasks = {
    pending: tasks.filter((task) => task.status === "pending"),
    inProgress: tasks.filter((task) => task.status === "in-progress"),
    completed: tasks.filter((task) => task.status === "completed"),
  };

  return (
    <div className="task-board">
      <TaskColumn title="Pending" tasks={groupedTasks.pending} />
      <TaskColumn title="In Progress" tasks={groupedTasks.inProgress} />
      <TaskColumn title="Completed" tasks={groupedTasks.completed} />
    </div>
  );
};

export default TaskBoard;
