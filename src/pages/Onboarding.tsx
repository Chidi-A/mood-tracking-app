import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthLogo } from '../components/AuthLogo';
import { profileService } from '../services/profileService';
import { useAuth } from '../hooks/useAuth';
import { getErrorMessage } from '../utils/errorUtils';

interface OnboardingFormData {
  name: string;
  avatar_image?: FileList;
}

export const OnboardingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<OnboardingFormData>();

  // Watch for avatar_image changes
  const avatarImage = watch('avatar_image');

  // Update preview when file is selected
  React.useEffect(() => {
    if (avatarImage && avatarImage.length > 0) {
      const file = avatarImage[0];

      // Validate file size (250KB = 256000 bytes)
      if (file.size > 256000) {
        setError('Image must be less than 250KB');
        setPreviewImage(null);
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setError(null); // Clear any previous errors
      };
      reader.readAsDataURL(file);

      // Cleanup function to revoke the URL
      return () => {
        if (previewImage) {
          URL.revokeObjectURL(previewImage);
        }
      };
    }
  }, [avatarImage, previewImage]);

  const onSubmit = async (data: OnboardingFormData) => {
    if (!user) {
      setError('User not found. Please try logging in again.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create the profile using the existing profile service
      await profileService.createEditProfile(
        {
          name: data.name,
          email: user.email!,
          avatar_image: data.avatar_image?.[0],
        },
        user.id
      );

      // Navigate to home after successful onboarding
      navigate('/');
    } catch (error: unknown) {
      console.error('❌ Profile creation error:', error);
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-light flex flex-col items-center py-20 px-4">
      <div className=" mb-12">
        <AuthLogo />
      </div>
      <div className="max-w-[530px] w-full bg-white rounded-2xl shadow-sm py-10 px-8">
        <div className="mb-8">
          <h1 className="text-preset-3 text-neutral-900  mb-2">
            Personalize your experience
          </h1>
          <p className="text-preset-6-regular text-neutral-600">
            {' '}
            Add your name and a profile picture to make Mood yours.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-preset-6-regular text-neutral-900 mb-2">
              Name
            </label>
            <input
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
              type="text"
              className="w-full px-4 py-3 border border-neutral-300 rounded-[10px] focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Jane Appleseed"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden border border-neutral-200">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Avatar preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="/images/avatar-placeholder.svg"
                    alt="Avatar placeholder"
                    className="w-16 h-16"
                  />
                )}
              </div>
              <div>
                <input
                  {...register('avatar_image')}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="avatar-upload-onboarding"
                />
                <label className="block text-preset-6-regular text-neutral-900 mb-1.5">
                  Upload Image
                </label>
                <p className="text-preset-7 text-neutral-600 mb-4">
                  Max 250KB, PNG or JPEG
                </p>
                <label
                  htmlFor="avatar-upload-onboarding"
                  className="inline-block cursor-pointer bg-white border border-neutral-300 rounded-lg px-4 py-2 text-preset-6 text-neutral-700 hover:bg-gray-50 transition-colors"
                >
                  {previewImage ? 'Change Image' : 'Upload'}
                </label>
                {previewImage && (
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImage(null);
                      const fileInput = document.getElementById(
                        'avatar-upload-onboarding'
                      ) as HTMLInputElement;
                      if (fileInput) fileInput.value = '';
                    }}
                    className="ml-2 text-preset-7 text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-[10px]">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-[10px] text-preset-5 transition-colors"
          >
            {isLoading ? 'Saving...' : 'Start Tracking'}
          </button>
        </form>
      </div>
    </div>
  );
};
