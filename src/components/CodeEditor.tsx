import { useEffect } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';

type CodeEditorProps = {
  code: string;
  setCode: (code: string) => void;
  darkMode: boolean;
};

const CodeEditor = ({ code, setCode, darkMode }: CodeEditorProps) => {
  const monaco = useMonaco();
  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme('myDarkTheme', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
          'editor.background': '#1e1e1e',
        },
      });
    }
  }, [monaco]);

  return (
    <Editor
      height="300px"
      language="python"
      value={code}
      theme={darkMode ? 'myDarkTheme' : 'light'}
      onChange={(value) => setCode(value || '')}
      options={{
        fontFamily: "'Fira Code', monospace",
        fontSize: 14,
        minimap: { enabled: false },
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;
