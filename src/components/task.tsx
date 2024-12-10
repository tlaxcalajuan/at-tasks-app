import { FaCheck } from 'react-icons/fa';
import { MdDelete, MdEdit } from 'react-icons/md';

interface TaskProps {
  id: number;
  title: string;
  completed: boolean;
  onToggle: (id: number, newStatus: boolean) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({ id, title, completed, onToggle, onEdit, onDelete }) => {
  // Cambiar el estado al hacer clic en el checkbox
  const handleToggle = () => {
    onToggle(id, !completed); // Cambiar el estado de completed a su valor opuesto
  };

  return (
    <li className="flex items-center justify-between px-4 py-2 border rounded hover:bg-gray-50">
      <div className="flex items-center space-x-4">
        {/* Checkbox con peer para aplicar estilos */}
        <div className="relative">
          <input
            type="checkbox"
            checked={completed}
            onChange={handleToggle} // Llamada a handleToggle cuando cambia el estado
            id={`checkbox-${id}`}
            className="peer hidden"
          />
          <label
            htmlFor={`checkbox-${id}`}
            className="block text-transparent text-xs w-4 h-4 border-2 rounded cursor-pointer peer-checked:text-white peer-checked:bg-rose-500 peer-checked:border-rose-500"
          >
            <FaCheck />
          </label>
        </div>

        {/* Título */}
        <span className={`text-md ${completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
          {title}
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {/* Botón de editar */}
        <button
          onClick={() => onEdit(id)}
          className="text-zinc-400 hover:text-zinc-500"
          title="Editar"
        >
          <MdEdit />
        </button>

        {/* Botón de borrar */}
        <button
          onClick={() => onDelete(id)}
          className="text-lg text-rose-400 hover:text-rose-500"
          title="Eliminar"
        >
          <MdDelete />
        </button>
      </div>
    </li>
  );
};

export default Task;
