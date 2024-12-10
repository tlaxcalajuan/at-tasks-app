import React from "react";

type Task = {
  id: number;
  title: string;
  status: "pending" | "in-progress" | "completed";
};

type TaskColumnProps = {
  title: string;
  tasks: Task[];
};

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks }) => {
  return (
    <div className="task-column">
      <h2>{title}</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={`task ${task.status}`}>
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskColumn;
