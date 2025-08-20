import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setAuth } from '../store/authSlice';
import { setCurrentProfile } from '../store/profileSlice';
import { supabase } from '../lib/supabase';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) throw error;

        dispatch(
          setAuth({
            user: session?.user ?? null,
            session,
          })
        );
        if (!session?.user?.id) {
          dispatch(setCurrentProfile(null));
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
        dispatch(setAuth({ user: null, session: null }));
      }
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      dispatch(
        setAuth({
          user: session?.user ?? null,
          session,
        })
      );
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  return {
    user: auth.user,
    session: auth.session,
    isLoading: auth.isLoading,
    isInitialized: auth.isInitialized,
    isAuthenticated: !!auth.user,
    error: auth.error,
  };
};
