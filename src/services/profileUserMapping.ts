import { supabase } from '../lib/supabase';

export interface ProfileUserMapping {
  profile_id: string;
  user_id: string;
  created_at?: string;
}

export const profileUserMappingService = {
  // Get or create a mapping for a profile
  async getOrCreateUserForProfile(profileId: string): Promise<string> {
    // Check if we already have a mapping for this profile
    const { data: existingMapping } = await supabase
      .from('profile_user_mappings')
      .select('user_id')
      .eq('profile_id', profileId)
      .single();

    if (existingMapping) {
      return existingMapping.user_id;
    }

    // For now, use a single test user ID for all profiles
    // You'll need to create this user manually in Supabase Dashboard
    // Go to Authentication → Users → Create a test user
    const testUserId = '3cd00dba-3326-4080-86d2-0841dcf10e82'; // Replace with actual UUID

    // Store the mapping
    const { error: mappingInsertError } = await supabase
      .from('profile_user_mappings')
      .insert({
        profile_id: profileId,
        user_id: testUserId,
      });

    if (mappingInsertError) {
      console.error('❌ Error creating mapping:', mappingInsertError);
      throw new Error(
        `Failed to create profile-user mapping: ${mappingInsertError.message}`
      );
    }

    return testUserId;
  },

  async getUserIdForProfile(profileId: string): Promise<string> {
    const { data: mapping, error } = await supabase
      .from('profile_user_mappings')
      .select('user_id')
      .eq('profile_id', profileId)
      .single();

    if (error || !mapping) {
      throw new Error(`No user mapping found for profile ${profileId}`);
    }

    return mapping.user_id;
  },

  async deleteMappingForProfile(profileId: string): Promise<void> {
    await supabase
      .from('profile_user_mappings')
      .delete()
      .eq('profile_id', profileId);
  },
};
