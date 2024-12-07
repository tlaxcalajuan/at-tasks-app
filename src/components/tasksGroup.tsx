import { useState, useRef, useEffect } from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import Task from '../components/task';
import Spinner from '../components/spinner';  // Asegúrate de tener un componente Spinner

const TasksGroup: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]); // Estado para almacenar las tareas
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  // Estado de carga
  const contentRef = useRef<HTMLUListElement>(null);

  const toggleTaskStatus = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id: number) => {
    console.log(`Editar tarea con id: ${id}`);
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const getAccessToken = () => {
    const match = document.cookie.match(new RegExp('(^| )access_token=([^;]+)'));
    return match ? match[2] : null;
  };

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);  // Activamos el estado de carga
      const user = localStorage.getItem('user');
      if (!user) {
        console.error('No se encontró el usuario en localStorage');
        setIsLoading(false);  // Desactivamos el estado de carga
        return;
      }

      const { id: userId } = JSON.parse(user);

      const token = getAccessToken();
      if (!token) {
        console.error('No se encontró el token de autenticación');
        setIsLoading(false);  // Desactivamos el estado de carga
        return;
      }

      try {
        const response = await fetch(`http://localhost:4300/api/tasks/user/${userId}/without-workspace`, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const tasksData = data.data.map((task: any) => ({
            id: task.id,
            title: task.attributes.title,
            description: task.attributes.description,
            completed: task.attributes.completed,
          }));
          setTasks(tasksData); // Actualiza el estado con las tareas obtenidas
        } else {
          console.error('Hubo un error al obtener las tareas');
        }
      } catch (error) {
        console.error('Error en la conexión', error);
      } finally {
        setIsLoading(false);  // Desactivamos el estado de carga
      }
    };

    fetchTasks();
  }, []); // El efecto solo se ejecutará una vez al montar el componente

  return (
    <div className="flex-1 overflow-auto space-y-6" style={{ scrollbarWidth: 'none' }}>
      <div className="bg-white shadow rounded p-4">
        {/* Encabezado con la funcionalidad de collapse */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Tareas Libres</h2>
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
                <Spinner />  {/* Aquí insertamos el Spinner */}
              </div>
            ) : tasks.length === 0 ? (
              <li className="text-center text-gray-500">No hay tareas disponibles.</li>
            ) : (
              tasks.map((task: any) => (
                <Task
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  completed={task.completed}
                  onToggle={toggleTaskStatus}
                  onEdit={editTask}
                  onDelete={deleteTask}
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
