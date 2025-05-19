type OutputDisplayProps = {
  output: string;
  darkMode: boolean;
};

const OutputDisplay = ({ output, darkMode }: OutputDisplayProps) => {
  return (
    <pre
      className={`output-container ${darkMode ? 'dark' : ''}`}
      style={{
        backgroundColor: darkMode ? '#1e1e1e' : '#f5f5f5',
        color: darkMode ? '#d4d4d4' : '#333',
      }}
    >
      {output}
    </pre>
  );
};

export default OutputDisplay;
