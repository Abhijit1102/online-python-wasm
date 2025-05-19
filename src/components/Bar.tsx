import DarkModeToggle from './Button/DarkModeToggle';

type Props = {
  onOpen: () => void;
  onSave: () => void;
  onReset: () => void;
  onRun: () => void;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const Bar = ({ onOpen, onSave, onReset, onRun, darkMode, setDarkMode }: Props) => {
  return (
    <div className={`bar-container ${darkMode ? 'dark' : 'light'}`}>
      <button onClick={onOpen}>📂</button>
      <button onClick={onSave}>💾</button>
      <button onClick={onReset}>🔄</button>
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <button onClick={onRun}>▶️</button>
    </div>
  );
};

export default Bar;
