import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';
import { profileService } from './profileService';

export interface SignUpData {
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export const authService = {
  // Sign up new user
  async signUp(data: SignUpData): Promise<{ user: User }> {
    const { email, password } = data;

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: undefined,
      },
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('User creation failed');

    return { user: authData.user };
  },

  // Sign in existing user
  async signIn(data: SignInData) {
    const { email, password } = data;

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return authData;
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current session
  async getCurrentSession() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  // Get user profile using existing profile service
  async getUserProfile(userId: string) {
    try {
      const profiles = await profileService.getProfiles();
      return profiles.find((profile) => profile.id === userId) || null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  },

  // Check if user has completed onboarding (has a profile)
  async hasCompletedOnboarding(userId: string): Promise<boolean> {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 = no rows returned
        console.error('Error checking onboarding status:', error);
        return false;
      }

      return !!profile;
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      return false;
    }
  },

  // Get current user
  async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  // Reset password
  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  },

  // Update password
  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
  },

  // Clear all auth data (useful for testing)
  async clearAllAuthData() {
    try {
      // Sign out first
      await this.signOut();

      // Clear local storage
      localStorage.clear();
      sessionStorage.clear();

      // Clear any Supabase-specific storage
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith('sb-') || key.includes('supabase')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  },
};
