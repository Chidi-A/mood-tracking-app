import React from 'react';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  isAuthenticated,
}) => {
  // If authenticated, redirect to home (which will handle onboarding check)
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
