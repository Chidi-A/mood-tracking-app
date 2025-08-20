import logoIcon from '../assets/images/logo-icon.svg';

export const Logo = () => {
  return (
    <div className="flex items-center space-x-4">
      <img src={logoIcon} alt="App Logo" className="w-8 h-8" />
      <span className="font-reddit-sans text-[1.3125rem] tracking-[-0.05rem] text-[var(--color-neutral-900)] font-bold">
        Mood tracker
      </span>
    </div>
  );
};
