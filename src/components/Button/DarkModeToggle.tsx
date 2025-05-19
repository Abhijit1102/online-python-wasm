type DarkModeToggleProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const DarkModeToggle = ({ darkMode, setDarkMode }: DarkModeToggleProps) => {
  return (
    <button onClick={() => setDarkMode((prev) => !prev)}>
      {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;
