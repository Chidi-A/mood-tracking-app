import { useEffect, useState, useRef } from 'react';
import { useAppSelector } from '../store/hooks';
import { SettingsModal } from './SettingsModal';

export const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const currentProfile = useAppSelector(
    (state) => state.profile.currentProfile
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!currentProfile) {
    return <div>Loading...</div>; // Or redirect to login
  }

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src={currentProfile.avatar_url || '/avatar-placeholder.svg'}
            alt={currentProfile.name}
            className="w-10 h-10 rounded-full"
          />

          <span>
            <img
              src="src/assets/images/icon-dropdown-arrow.svg"
              alt="dropdown-arrow"
            />
          </span>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 px-4 py-3 bg-white rounded-lg shadow-lg w-50">
            {/* User Info Section */}
            <div className="pb-3 border-b border-blue-100">
              <div className="text-preset-6 text-neutral-900">
                {currentProfile.name}
              </div>
              <div className="text-preset-7 text-neutral-300">
                {currentProfile.email}
              </div>
            </div>

            {/* Menu Options */}
            <div className="py-1">
              <button
                onClick={() => {
                  // Open settings modal
                  setIsSettingsOpen(true);
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 mt-3 w-full text-left cursor-pointer"
              >
                <span>
                  <img
                    src="src/assets/images/icon-settings.svg"
                    alt="settings"
                    className="w-4 h-4"
                  />
                </span>
                <span className="text-preset-7 text-neutral-900">Settings</span>
              </button>
              <button
                onClick={() => {
                  // Handle logout
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 mt-3 w-full text-left cursor-pointer"
              >
                <span>
                  <img
                    src="src/assets/images/icon-logout.svg"
                    alt="logout"
                    className="w-4 h-4"
                  />
                </span>
                <span className="text-preset-7 text-neutral-900">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
};
