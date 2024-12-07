import TasksGroup from '@/components/tasksGroup';
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import '../globals.css';
import { useState } from 'react';
import { IoMdAddCircle } from 'react-icons/io';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const today = new Date().toLocaleDateString('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <Header />

      <div className="flex h-full">
        {/* Sidebar */}
        <Sidebar />

        {/* Contenido principal */}
        <div className="flex-1 flex flex-col md:ml-44 mt-16 md:pr-4"  >
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
                onClick={() => alert('Agregar tarea')}
              >
                <IoMdAddCircle /> <span className='ml-2'>Agregar Tarea</span>
              </button>
            </div>
          </div>

          {/* Contenido desplazable */}
          <div className="flex-1 overflow-auto p-6 space-y-6" style={{scrollbarWidth: 'none'}}>
            <TasksGroup />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
