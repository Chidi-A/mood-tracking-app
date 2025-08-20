import { useState, useRef, useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { useUpdateProfile } from '../hooks/useProfileQueries';
import type { UpdateProfileData } from '../services/profileService';
import { useForm } from 'react-hook-form';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  avatar_image?: File;
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const currentProfile = useAppSelector(
    (state) => state.profile.currentProfile
  );
  const updateProfile = useUpdateProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: currentProfile?.name || '',
    },
  });

  useEffect(() => {
    if (currentProfile) {
      setValue('name', currentProfile.name);
      setPreviewImage(currentProfile.avatar_url || null);
    }
  }, [currentProfile, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (250KB = 256000 bytes)
      if (file.size > 256000) {
        alert('File size must be less than 250KB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      setValue('avatar_image', file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!currentProfile) return;

    // Add validation
    if (!data.name.trim()) {
      alert('Name is required');
      return;
    }

    try {
      const updateData: UpdateProfileData = {
        name: data.name.trim(), // Trim whitespace
        ...(data.avatar_image && { avatar_image: data.avatar_image }),
      };

      const result = await updateProfile.mutateAsync({
        id: currentProfile.id,
        data: updateData,
      });

      if (result) {
        onClose();
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral-900/70 flex items-start justify-center pt-20 z-50">
      <div className="bg-white rounded-lg py-12 px-10  w-[600px] relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-preset-3 text-neutral-900">
            Update your profile
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 absolute top-6 right-8"
          >
            ✕
          </button>
        </div>

        {/* Description */}
        <p className="text-preset-6 text-neutral-600 mb-8">
          Personalize your account with your name and photo.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Input */}
          <div className="mb-6">
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
              className={`w-full p-2 border border-neutral-600 text-preset-6-regular text-neutral-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : ''
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="mb-8">
            <div className="flex items-start gap-4">
              <img
                src={previewImage || 'src/assets/images/avatar-placeholder.svg'}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <label className="block text-preset-6-regular text-neutral-900 mb-1.5">
                  Upload Image
                </label>
                <p className="text-preset-7 text-neutral-600 mb-4">
                  Max 250KB, PNG or JPEG
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-preset-6 text-neutral-900"
                >
                  Upload
                </button>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting || updateProfile.isPending}
              className="flex-1 py-4 bg-blue-600 text-white text-preset-5 rounded-[10px] hover:bg-blue-600 disabled:opacity-50"
            >
              {isSubmitting || updateProfile.isPending
                ? 'Saving...'
                : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
