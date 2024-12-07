// components/MainLayout.tsx
import Header from './header';
import Sidebar from './sidebar';
import { ReactNode } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <Header />

      <div className="flex h-full">
        {/* Sidebar */}
        <Sidebar />

        {/* Contenido dinámico */}
        <div className="flex-1 flex flex-col md:ml-44 mt-16 md:pr-4">
          <div className="flex-1 overflow-auto" style={{ scrollbarWidth: 'none' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
