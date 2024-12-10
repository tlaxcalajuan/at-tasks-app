import { useState, useRef } from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import Task from '../components/task';
import Spinner from '../components/spinner'; // Asegúrate de tener un componente Spinner

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TasksGroupProps {
  tasks: Task[]; // Lista de tareas que recibe el componente
  isLoading: boolean; // Estado de carga
  onDeleteTask: (taskId: number) => void;
  onEditTask: (taskId: number) => void;
  onCompleteTask: (taskId: number, newstatus: boolean) => void;
}

const TasksGroup: React.FC<TasksGroupProps> = ({ tasks, isLoading, onDeleteTask, onEditTask, onCompleteTask }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const contentRef = useRef<HTMLUListElement>(null);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="flex-1 overflow-auto space-y-6" style={{ scrollbarWidth: 'none' }}>
      <div className="bg-white shadow rounded p-4">
        {/* Encabezado con la funcionalidad de collapse */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Tareas</h2>
          <button
            onClick={toggleCollapse}
            className="text-gray-500 hover:text-gray-700"
            title={isCollapsed ? 'Expandir' : 'Colapsar'}
          >
            {isCollapsed ? <MdExpandMore size={24} /> : <MdExpandLess size={24} />}
          </button>
        </div>

        {/* Contenedor colapsable con animación */}
        <div
          className={`overflow-hidden transition-[height] duration-300 ease-in-out ${isCollapsed ? 'h-0' : ''}`}
        >
          <ul ref={contentRef} className="space-y-2 pt-2">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <Spinner /> {/* Spinner de carga */}
              </div>
            ) : tasks.length === 0 ? (
              <li className="text-center text-gray-500">No hay tareas disponibles.</li>
            ) : (
              tasks.map((task: Task) => (
                <Task
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  completed={task.completed}
                  onToggle={onCompleteTask}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TasksGroup;
