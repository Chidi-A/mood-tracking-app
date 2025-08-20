import { supabase } from '../lib/supabase';

export interface Profile {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  created_at?: string;
}

export interface CreateProfileData {
  name: string;
  email: string;
  avatar_image?: File;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  avatar_image?: File;
}

export const profileService = {
  async getProfiles(): Promise<Profile[]> {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching profiles:', error);
      throw new Error(`Failed to fetch profiles: ${error.message}`);
    }

    return profiles;
  },

  async createEditProfile(
    profileData: CreateProfileData | UpdateProfileData,
    id?: string
  ): Promise<Profile> {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const hasImagePath =
      profileData.avatar_image?.name?.startsWith?.(supabaseUrl);

    let avatarUrl: string | undefined;
    let imageName: string | undefined;

    // Handle new image upload
    if (profileData.avatar_image && !hasImagePath) {
      imageName = `${Math.random()}-${
        profileData.avatar_image.name
      }`.replaceAll('/', '');
      avatarUrl = `${supabaseUrl}/storage/v1/object/public/profile-avatars/${imageName}`;
    }

    let data: Profile | null;
    let error: { message: string } | null;
    let isCreating = false; // Track if we're creating or updating

    if (!id) {
      // Creating new profile without specific ID
      isCreating = true;
      const { name, email } = profileData as CreateProfileData;
      const result = await supabase
        .from('profiles')
        .insert({
          name,
          email,
          avatar_url: avatarUrl,
        })
        .select()
        .single();
      data = result.data;
      error = result.error;
    } else {
      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', id)
        .single();

      if (!existingProfile) {
        // Creating new profile with specific ID (for auth users)
        isCreating = true;
        const { name, email } = profileData as CreateProfileData;
        const result = await supabase
          .from('profiles')
          .insert({
            id, // Use the auth user's ID
            name,
            email,
            avatar_url: avatarUrl,
          })
          .select()
          .single();
        data = result.data;
        error = result.error;
      } else {
        // Updating existing profile
        isCreating = false;
        const updateData: Partial<Profile> = {};

        if (profileData.name) {
          updateData.name = profileData.name;
        }

        if (profileData.email) {
          updateData.email = profileData.email;
        }

        if (avatarUrl) {
          updateData.avatar_url = avatarUrl;
        }

        const result = await supabase
          .from('profiles')
          .update(updateData)
          .eq('id', id)
          .select()
          .single();
        data = result.data;
        error = result.error;
      }
    }

    if (error) {
      console.error('❌ Database error:', error);
      throw new Error(
        `Profile could not be ${isCreating ? 'created' : 'updated'}`
      );
    }

    if (!data) {
      throw new Error(
        `Profile could not be ${isCreating ? 'created' : 'updated'}`
      );
    }

    // Upload image to Supabase Storage if it's a new image
    if (profileData.avatar_image && !hasImagePath && imageName) {
      try {
        const { error: storageError } = await supabase.storage
          .from('profile-avatars')
          .upload(imageName, profileData.avatar_image);

        if (storageError) {
          console.error('❌ Storage error:', storageError);
          throw new Error('Profile image could not be uploaded');
        }
      } catch (uploadError) {
        console.error('❌ Upload error:', uploadError);
        throw uploadError;
      }
    }

    return data;
  },

  async createProfile(profileData: CreateProfileData): Promise<Profile> {
    return this.createEditProfile(profileData);
  },

  async updateProfile(
    profileId: string,
    profileData: UpdateProfileData
  ): Promise<Profile> {
    return this.createEditProfile(profileData, profileId);
  },

  async deleteProfile(id: string): Promise<void> {
    // Get profile to check if it has an avatar
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('❌ Error fetching profile for deletion:', fetchError);
      throw new Error('Profile not found');
    }

    // Delete from database
    const { error: deleteError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('❌ Error deleting profile:', deleteError);
      throw new Error('Profile could not be deleted');
    }

    // Delete avatar from storage if it exists
    if (profile?.avatar_url) {
      try {
        const imageName = profile.avatar_url.split('/').pop();
        if (imageName) {
          const { error: storageError } = await supabase.storage
            .from('profile-avatars')
            .remove([imageName]);

          if (storageError) {
            console.warn(
              '⚠️ Could not delete avatar from storage:',
              storageError
            );
            // Don't throw error here as the profile was deleted successfully
          }
        }
      } catch (storageError) {
        console.warn('⚠️ Error deleting avatar from storage:', storageError);
      }
    }
  },
};
