export const AuthLogo = () => {
  return (
    <div className="flex items-center space-x-4">
      <img
        src="/src/assets/images/logo-icon.svg"
        alt="App Logo"
        className="w-10 h-10"
      />
      <span className="font-reddit-sans text-[1.3125rem] tracking-[-0.05rem] text-[var(--color-neutral-900)] font-bold">
        Mood tracker
      </span>
    </div>
  );
};
