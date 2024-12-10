/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// TasksPage.tsx
import TasksGroup from '@/components/tasksGroup';
import MainLayout from '../../components/mainLayout';
import { IoMdAddCircle } from 'react-icons/io';
import { useState, useEffect } from 'react';
import Spinner from '@/components/spinner';  // Importa tu componente Spinner
import '../globals.css';
import { getUserId } from '@/utils/authUtils';
import { fetchTasks } from '@/services/tasks/tasksService';

const TasksPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/cerrar el modal
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [loading, setLoading] = useState(false); // Estado para manejar el loading spinner
  const [tasks, setTasks] = useState<any[]>([]); // Estado global de tareas
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null); // Estado para manejar la tarea en edición

  const today = new Date().toLocaleDateString('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  // Obtener el token de las cookies
  const getAccessToken = () => {
    const match = document.cookie.match(new RegExp('(^| )access_token=([^;]+)'));
    return match ? match[2] : null;
  };

  const fetchAllTasks = async () => {
    const userId = getUserId();
    const token = getAccessToken();

    if (!userId || !token) {
      console.error('Falta usuario o token');
      return;
    }

    try {
      const data = await fetchTasks(userId, token);
      setTasks(data);
    } catch (error) {
      console.error('Error al cargar tareas', error);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const handleCreateTask = async () => {
    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : null;

    if (!userId) {
      alert('El usuario no está autenticado');
      return;
    }

    const token = getAccessToken();
    if (!token) {
      alert('No se encontró el token de autenticación');
      return;
    }

    setLoading(true); // Activamos el spinner

    try {
      const response = await fetch('http://localhost:4300/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Agregar el token en los encabezados
        },
        body: JSON.stringify({ ...taskData, userId }), // Incluir userId en el cuerpo
      });

      if (response.ok) {
        setIsModalOpen(false); // Cerrar el modal
        setTaskData({ title: '', description: '' });
        fetchAllTasks(); // Actualizar tareas después de crear una nueva
      } else {
        console.log('Hubo un error al agregar la tarea');
      }
    } catch (error) {
      console.log('Error en la conexión');
    } finally {
      setLoading(false); // Desactivamos el spinner después de la petición
    }
  };

  const handleEditTask = (taskId: number) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    if (taskToEdit) {
      setTaskData({ title: taskToEdit.title, description: taskToEdit.description });
      setEditingTaskId(taskId); // Establecer el ID de la tarea a editar
      setIsModalOpen(true); // Abrir el modal de edición
    }
  };

  const handleUpdateTask = async () => {
    const token = getAccessToken();
    if (!token || editingTaskId === null) {
      alert('No se encontró el token de autenticación o falta ID de tarea');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:4300/api/tasks/${editingTaskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(taskData), // Solo pasamos la data de la tarea a editar
      });

      if (response.ok) {
        setIsModalOpen(false); // Cerrar el modal
        setTaskData({ title: '', description: '' });
        setEditingTaskId(null); // Limpiar el ID de tarea en edición
        fetchAllTasks(); // Actualizar tareas después de editar
      } else {
        console.log('Hubo un error al actualizar la tarea');
      }
    } catch (error) {
      console.log('Error en la conexión');
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteTask = (taskId: number) => {
    setTaskToDelete(taskId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;

    const token = getAccessToken();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4300/api/tasks/${taskToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        fetchAllTasks();
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.error('Error al eliminar tarea');
    } finally {
      setLoading(false);
    }
  };

  // Función para marcar la tarea como completada
  const completeTask = async (taskId: number, newStatus: boolean) => {
    const token = getAccessToken();
    if (!token) {
      alert('No se encontró el token de autenticación');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:4300/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: newStatus }), // Solo enviamos el nuevo estado
      });

      if (response.ok) {
        fetchAllTasks(); // Actualizar tareas después de completar
      } else {
        console.log('Hubo un error al completar la tarea');
      }
    } catch (error) {
      console.log('Error en la conexión');
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="flex-1 flex flex-col">
      {/* Encabezado estático */}
      <div className="px-6 pt-6 pb-2">
        <div className="mb-4">
          <h1 className="text-3xl font-bold">¡Bienvenido 👋!</h1>
          <p className="text-gray-600">{today.charAt(0).toUpperCase()}{today.slice(1)}</p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between">
          {/* Barra de búsqueda */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Buscar..."
            className="w-full md:w-auto border rounded-md p-2 text-gray-700"
          />

          {/* Botón para agregar tareas */}
          <button
            className="flex items-center justify-center mt-4 md:mt-0 md:ml-8 bg-rose-500 text-white py-2 px-4 rounded hover:bg-rose-600"
            onClick={() => setIsModalOpen(true)} // Abrir el modal para agregar tarea
          >
            <IoMdAddCircle /> <span className="ml-2">Agregar Tarea</span>
          </button>
        </div>
      </div>

      {/* Contenido desplazable */}
      <div className="flex-1 overflow-auto p-6 space-y-6" style={{ scrollbarWidth: 'none' }}>
        <TasksGroup 
          tasks={tasks} 
          isLoading={false} 
          onDeleteTask={confirmDeleteTask} 
          onEditTask={handleEditTask}
          onCompleteTask={completeTask} // Pasamos la función de completar tarea
        />
      </div>

      {/* Modal para agregar/editar tarea */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-w-md">
            <h2 className="font-bold text-xl mb-4">{editingTaskId ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
            <div>
              <label htmlFor="title" className="block text-gray-700">Título</label>
              <input
                type="text"
                id="title"
                name="title"
                value={taskData.title}
                onChange={handleChange}
                className="w-full border p-2 rounded-md mt-2"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="description" className="block text-gray-700">Descripción</label>
              <textarea
                id="description"
                name="description"
                value={taskData.description}
                onChange={handleChange}
                className="w-full border p-2 rounded-md mt-2"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => { 
                  setTaskData({ title: '', description: '' });
                  setEditingTaskId(null); // Limpiar el ID de tarea en edición
                  setIsModalOpen(false)
                }} // Cerrar el modal
                className="px-4 py-2 bg-gray-300 rounded mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={editingTaskId ? handleUpdateTask : handleCreateTask}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                {loading ? <Spinner /> : editingTaskId ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </div>
        </div>
      )}

{isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl font-bold mb-4">¿Estás seguro de eliminar esta tarea?</h2>
            <div className="flex justify-between">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteTask}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                disabled={loading}
              >
                {loading ? <Spinner /> : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

TasksPage.getLayout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default TasksPage;
