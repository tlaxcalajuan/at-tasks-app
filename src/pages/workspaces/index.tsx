// pages/workspaces.tsx
import MainLayout from '../../components/mainLayout';

const WorkspacesPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Workspaces</h1>
      <p>Contenido relacionado con los workspaces...</p>
    </div>
  );
};

WorkspacesPage.getLayout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default WorkspacesPage;
