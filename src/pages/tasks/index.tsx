import TasksGroup from '@/components/tasksGroup';
import MainLayout from '../../components/mainLayout';
import { IoMdAddCircle } from 'react-icons/io';
import { useState } from 'react';
import Spinner from '@/components/spinner';  // Importa tu componente Spinner
import '../globals.css';

const TasksPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/cerrar el modal
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
  });
  const [loading, setLoading] = useState(false); // Estado para manejar el loading spinner

  let userId = "";

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

  const handleCreateTask = async () => {
    userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).id : null;

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

      const data = await response.json();
      if (response.ok) {
        setIsModalOpen(false); // Cerrar el modal
        // Aquí podrías actualizar el estado o hacer una recarga para reflejar la tarea nueva
      } else {
        console.log('Hubo un error al agregar la tarea');
      }
    } catch (error) {
      console.log('Error en la conexión');
    } finally {
      setLoading(false); // Desactivamos el spinner después de la petición
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Encabezado estático */}
      <div className="px-6 pt-6 pb-2">
        <div className="mb-4">
          <h1 className="text-3xl font-bold">¡Bienvenido 👋!</h1>
          <p className="text-gray-600">{today}</p>
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
        <TasksGroup />
      </div>

      {/* Modal para agregar tarea */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Agregar Nueva Tarea</h2>
            <div>
              <label htmlFor="title" className="block font-semibold">Título</label>
              <input
                type="text"
                id="title"
                name="title"
                value={taskData.title}
                onChange={handleChange}
                className="w-full border rounded-md p-2 mb-4"
                placeholder="Escribe el título de la tarea"
              />
            </div>

            <div>
              <label htmlFor="description" className="block font-semibold">Descripción</label>
              <textarea
                id="description"
                name="description"
                value={taskData.description}
                onChange={handleChange}
                className="w-full border rounded-md p-2 mb-4"
                placeholder="Escribe la descripción de la tarea"
              />
            </div>

            {/* El input de userId ha sido eliminado */}

            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateTask}
                className="bg-rose-500 text-white py-2 px-4 rounded hover:bg-rose-600"
                disabled={loading} // Deshabilita el botón mientras se está creando la tarea
              >
                {loading ? <Spinner /> : 'Agregar'} {/* Muestra el spinner si loading es true */}
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
