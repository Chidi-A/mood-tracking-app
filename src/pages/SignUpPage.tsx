import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLogo } from '../components/AuthLogo';
import { authService } from '../services/authService';
import { getErrorMessage } from '../utils/errorUtils';

interface SignUpFormData {
  email: string;
  password: string;
}

interface SignUpPageProps {
  onSwitchToLogin?: () => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = () => {
  // API/Auth state (separate from form validation)
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  // React Hook Form for form validation and state
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpFormData>();

  // Form submission handler
  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    setApiError(null); // Clear previous API errors

    try {
      const signUpData = {
        email: data.email,
        password: data.password,
      };

      await authService.signUp(signUpData);

      reset();

      // Navigate to onboarding after successful signup
      navigate('/onboarding');
    } catch (error: unknown) {
      console.error('❌ Sign up error:', error);
      setApiError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-light flex flex-col items-center py-20 px-4">
      <div className="mb-12">
        <AuthLogo />
      </div>
      <div className="max-w-[530px] w-full bg-white rounded-2xl shadow-sm py-10 px-8">
        <div className="mb-8">
          <h1 className="text-preset-3 text-neutral-900 mb-2">
            Create an account
          </h1>
          <p className="text-preset-6-regular text-neutral-600">
            Join to track your daily mood and sleep with ease.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-preset-6-regular text-neutral-900 mb-2">
              Email address
            </label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              type="email"
              className={`w-full px-4 py-3 border rounded-[10px] focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                errors.email ? 'border-red-300' : 'border-neutral-300'
              }`}
              placeholder="name@mail.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-preset-6-regular text-neutral-900 mb-2">
              Password
            </label>
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              type="password"
              className={`w-full px-4 py-3 border rounded-[10px] focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                errors.password ? 'border-red-300' : 'border-neutral-300'
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* API Error Display (separate from form validation errors) */}
          {apiError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-[10px]">
              <p className="text-sm text-red-600">{apiError}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-[10px] text-preset-5 transition-colors"
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-preset-6-regular text-neutral-600 mt-6">
          Already got an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-700">
            Log in.
          </Link>
        </p>
      </div>
    </div>
  );
};
