import { Logo } from './Logo';

export const Header = () => {
  return (
    <header className="flex justify-between items-center pt-[2.5rem]">
      <Logo />

      <div className="flex items-center space-x-2">
        <img
          src="/src/assets/images/avatar-lisa.jpg"
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </header>
  );
};
