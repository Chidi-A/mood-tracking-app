import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';
import { useAppDispatch } from '../store/hooks';
import { setCurrentProfile } from '../store/profileSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated,
}) => {
  const { user } = useAuth();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [needsOnboarding, setNeedsOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (isAuthenticated && user) {
        try {
          const hasProfile = await authService.hasCompletedOnboarding(user.id);
          setNeedsOnboarding(!hasProfile);
          if (hasProfile) {
            const profile = await authService.getUserProfile(user.id);
            if (profile) {
              dispatch(setCurrentProfile(profile));
            }
          }
        } catch (error) {
          console.error('Error checking onboarding status:', error);
          // If there's an error checking onboarding status, sign out the user
          // This handles cases where the user was deleted but session remains
          await authService.signOut();
          setNeedsOnboarding(null);
        }
      } else {
        setNeedsOnboarding(null);
      }
    };
    checkOnboardingStatus();
  }, [isAuthenticated, user, dispatch]);

  // Not authenticated - redirect to signup
  if (!isAuthenticated) {
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  // Still checking onboarding status
  if (needsOnboarding === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Loading profile...</div>
      </div>
    );
  }

  // On homepage but needs onboarding
  if (location.pathname === '/' && needsOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  // On onboarding but doesn't need it
  if (location.pathname === '/onboarding' && !needsOnboarding) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
