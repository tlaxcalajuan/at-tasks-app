import React, { useState } from 'react';
import { MdAddCircle, MdExpandLess, MdExpandMore, MdWorkspaces, MdDelete } from 'react-icons/md';

function WorkspacesGroup() {
  const [isWorkspacesOpen, setIsWorkspacesOpen] = useState(false); // Controla el collapse de Workspaces
  const [workspaces, setWorkspaces] = useState<{ id: number; name: string; isEditing: boolean }[]>([]); // Array para almacenar los workspaces con un flag de edición

  const handleAddWorkspace = () => {
    // Agregar un nuevo workspace con un nombre único
    const newWorkspace = {
      id: workspaces.length + 1,
      name: `Workspace ${workspaces.length + 1}`,
      isEditing: true, // Al agregarlo, se hace editable automáticamente
    };
    setWorkspaces([...workspaces, newWorkspace]);
  };

  const handleDeleteWorkspace = (id: number) => {
    // Eliminar un workspace del array
    setWorkspaces(workspaces.filter((ws) => ws.id !== id));
  };

  const handleNavigation = (path: string) => {
    // Lógica de navegación (puedes adaptarlo según tu necesidad)
    console.log(`Navegar a: ${path}`);
  };

  const handleEditWorkspace = (id: number, name: string) => {
    // Cambiar el estado de edición de un workspace
    setWorkspaces(workspaces.map((ws) =>
      ws.id === id ? { ...ws, name, isEditing: false } : ws
    ));
  };

  const handleDoubleClick = (id: number) => {
    // Activar el modo de edición
    setWorkspaces(workspaces.map((ws) =>
      ws.id === id ? { ...ws, isEditing: true } : ws
    ));
  };

  return (
    <div className="bg-zinc-100 -mx-3 p-3 my-2 rounded-md">
      <li
        className="cursor-pointer flex items-center"
        onClick={() => setIsWorkspacesOpen(!isWorkspacesOpen)}
      >
        <div className="flex items-center mr-2">
          <MdWorkspaces className="mr-2" />
          <span>Workspaces</span>
        </div>
        <span className="text-zinc-500">
          {!isWorkspacesOpen ? (
            <MdExpandMore size={18} />
          ) : (
            <MdExpandLess size={18} />
          )}
        </span>
      </li>

      {/* Contenedor de Workspaces con animación de expansión/colapso */}
      <div
        className={`pl-2 overflow-hidden transition-all duration-200 ease-in-out ${
          isWorkspacesOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <ul className="text-xs mt-4">
          {workspaces.length === 0 ? (
            <li className="text-gray-500">No hay workspaces</li>
          ) : (
            workspaces.map((workspace) => (
              <li key={workspace.id} className="flex justify-between mb-2 cursor-pointer text-gray-700">
                <span
                  onClick={() => handleNavigation(`/workspaces/${workspace.id}`)}
                  onDoubleClick={() => handleDoubleClick(workspace.id)}
                >
                  {workspace.isEditing ? (
                    <input
                      type="text"
                      value={workspace.name}
                      onChange={(e) => handleEditWorkspace(workspace.id, e.target.value)}
                      onBlur={() => handleEditWorkspace(workspace.id, workspace.name)}
                      className="border-b border-zinc-400 focus:outline-none"
                      autoFocus
                    />
                  ) : (
                    workspace.name
                  )}
                </span>
                <MdDelete
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDeleteWorkspace(workspace.id)}
                />
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Botón para agregar un nuevo workspace */}
      <li
        className="text-xs mt-2 cursor-pointer flex justify-center items-center bg-zinc-800 px-3 py-2 rounded hover:bg-zinc-900 text-white"
        onClick={handleAddWorkspace}
      >
        <MdAddCircle className="mr-1" />
        Agregar espacio
      </li>
    </div>
  );
}

export default WorkspacesGroup;
