import React from 'react';

interface DashboardGridProps {
  children: React.ReactNode;
}

export const DashboardGrid: React.FC<DashboardGridProps> = ({ children }) => {
  return <div className="flex flex-col gap-8 mt-8 mb-20">{children}</div>;
};
