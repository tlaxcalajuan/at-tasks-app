// components/Sidebar.tsx
import { useState } from 'react';
import { MdDashboard, MdOutlineClose, MdLibraryAddCheck, MdOutlinePendingActions } from 'react-icons/md';
import { RiMenu4Line } from 'react-icons/ri';
import { useRouter } from 'next/router';
import WorkspacesGroup from './workspacesGroup';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false); // Cerrar el sidebar en dispositivos móviles al hacer clic
  };

  return (
    <>
      {/* Overlay para pantallas móviles */}
      <div
        className={`fixed inset-0 md:hidden ${isOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar (siempre visible en md y superiores) */}
      <div
        className={`fixed top-0 left-0 w-64 md:w-fit md:min-w-40 h-full bg-white transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0 mt-20' : '-translate-x-full md:translate-x-0 mt-20'
        } md:mt-20`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Tareas</h2>
          <ul className='text-sm'>
            <li
              className="mb-4 cursor-pointer flex items-center"
              onClick={() => handleNavigation('/tasks')}
            >
              <MdDashboard className="mr-2" />
              Todas
            </li>
            <li
              className="mb-4 cursor-pointer flex items-center"
              onClick={() => handleNavigation('/pending')}
            >
              <MdOutlinePendingActions className="mr-2" />
              Pendientes
            </li>
            <li
              className="mb-4 cursor-pointer flex items-center"
              onClick={() => handleNavigation('/completed')}
            >
              <MdLibraryAddCheck className="mr-2" />
              Completadas
            </li>

            {/* Sección Workspaces */}
            <WorkspacesGroup />
          </ul>
        </div>
      </div>

      {/* Botón para abrir/cerrar el sidebar en pantallas móviles */}
      <div
        className="fixed text-4xl top-5 left-6 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <button className="text-zinc-900 text-4xl">
          {isOpen ? <MdOutlineClose /> : <RiMenu4Line />}
        </button>
      </div>
    </>
  );
};

export default Sidebar;
