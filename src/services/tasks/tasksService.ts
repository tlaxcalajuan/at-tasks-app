/* eslint-disable @typescript-eslint/no-explicit-any */
// services/tasksService.ts
export const fetchTasks = async (userId: string, token: string) => {
    try {
      const response = await fetch(`http://localhost:4300/api/tasks/user/${userId}/without-workspace`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) throw new Error('Error al obtener tareas');
      const data = await response.json();
      return data.data.map((task: any) => ({
        id: task.id,
        title: task.attributes.title,
        description: task.attributes.description,
        completed: task.attributes.completed,
      }));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  export const createTask = async (taskData: any, userId: string, token: string) => {
    try {
      const response = await fetch('http://localhost:4300/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ...taskData, userId }),
      });
  
      if (!response.ok) throw new Error('Error al crear tarea');
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }

    

  };

  /* eslint-disable @typescript-eslint/no-explicit-any */
// services/tasksService.ts
export const deleteTask = async (id: number, token: string): Promise<any> => {
    try {
      const response = await fetch(`http://localhost:4300/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) throw new Error('Error al eliminar la tarea');
      console.log(`Tarea con ID ${id} eliminada`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  