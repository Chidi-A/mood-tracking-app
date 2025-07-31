import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../services/profileService';
import { updateProfile as updateProfileAction } from '../store/profileSlice';
import { useAppDispatch } from '../store/hooks';
import type {
  Profile,
  CreateProfileData,
  UpdateProfileData,
} from '../services/profileService';

const PROFILES_KEY = ['profiles'] as const;

export const useProfilesQuery = () => {
  return useQuery({
    queryKey: PROFILES_KEY,
    queryFn: () => profileService.getProfiles(),
    staleTime: 0,
  });
};

export const useCreateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProfileData) => profileService.createProfile(data),
    onSuccess: (newProfile) => {
      queryClient.invalidateQueries({ queryKey: PROFILES_KEY });
      queryClient.setQueryData(PROFILES_KEY, (oldData: Profile[]) => {
        return oldData ? [newProfile, ...oldData] : [newProfile];
      });
    },
    onError: (error) => {
      console.error('Error creating profile:', error);
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProfileData }) =>
      profileService.updateProfile(id, data),
    onSuccess: (updatedProfile) => {
      queryClient.invalidateQueries({ queryKey: PROFILES_KEY });
      queryClient.setQueryData(PROFILES_KEY, (oldData: Profile[]) => {
        return oldData
          ? oldData.map((profile) =>
              profile.id === updatedProfile.id ? updatedProfile : profile
            )
          : [updatedProfile];
      });

      queryClient.setQueryData(['currentProfile'], updatedProfile);
      dispatch(updateProfileAction(updatedProfile));
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
    },
  });
};

export const useDeleteProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => profileService.deleteProfile(id),
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: PROFILES_KEY });
      queryClient.setQueryData(PROFILES_KEY, (oldData: Profile[]) => {
        return oldData
          ? oldData.filter((profile) => profile.id !== deletedId)
          : [];
      });
    },
    onError: (error) => {
      console.error('Error deleting profile:', error);
    },
  });
};
