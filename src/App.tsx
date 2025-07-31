import { HomePage } from './pages/HomePage';
import { useEffect } from 'react';
import { useProfilesQuery } from './hooks/useProfileQueries';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setCurrentProfile } from './store/profileSlice';

function App() {
  const dispatch = useAppDispatch();
  const { data: profiles, isLoading, error } = useProfilesQuery();
  const currentProfile = useAppSelector(
    (state) => state.profile.currentProfile
  );

  useEffect(() => {
    if (profiles && profiles.length > 0 && !currentProfile) {
      dispatch(setCurrentProfile(profiles[1]));
    }
  }, [profiles, currentProfile, dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Error loading profile: {error.message}</div>
      </div>
    );
  }

  if (!currentProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>No profile found. Please create a profile.</div>
      </div>
    );
  }

  return (
    <div>
      <HomePage />
    </div>
  );
}

export default App;
