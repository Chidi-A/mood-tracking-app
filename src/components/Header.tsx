import { Logo } from './Logo';
// import { useState } from 'react';
import { ProfileDropdown } from './ProfileDropdown';

export const Header = () => {
  // const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <header className="flex justify-between items-center pt-[2.5rem]">
      <Logo />

      <div className="flex items-center space-x-2">
        <ProfileDropdown />
      </div>

      {/* <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      /> */}
    </header>
  );
};
