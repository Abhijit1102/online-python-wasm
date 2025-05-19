import { useEffect, useRef, useState } from 'react';
import CodeEditor from './components/CodeEditor';
import OutputDisplay from './components/OutputDisplay';
import Bar from './components/Bar';
import './App.css';

function App() {
  const pyodideRef = useRef<any>(null);
  const [code, setCode] = useState('print("Hello, Pyodide!")');
  const [output, setOutput] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const loadPyodideInstance = async () => {
      const pyodide = await (window as any).loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/',
      });
      pyodideRef.current = pyodide;
    };
    loadPyodideInstance();
  }, []);

  const runCode = async () => {
    if (!pyodideRef.current) {
      setOutput('Pyodide not loaded yet...');
      return;
    }
    try {
      const codeToRun = `
import sys
import io
_stdout = sys.stdout
sys.stdout = io.StringIO()

try:
${code.split('\n').map(line => '  ' + line).join('\n')}
finally:
  output = sys.stdout.getvalue()
  sys.stdout = _stdout
`;
      await pyodideRef.current.runPythonAsync(codeToRun);
      const output = pyodideRef.current.globals.get('output');
      setOutput(output);
    } catch (err: any) {
      setOutput(err.toString());
    }
  };

  const handleOpenFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt,.py,text/plain';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const text = await file.text();
        setCode(text);
      }
    };
    input.click();
  };

  const handleSaveFile = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.py';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setCode('print("Hello, Pyodide!")');
    setOutput('');
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <h1 style={{ textAlign: 'center', margin: '20px 0', fontWeight: 'bold' }}>
  Python in the Browser (WASM)
    </h1>
      <Bar
        onOpen={handleOpenFile}
        onSave={handleSaveFile}
        onReset={handleReset}
        onRun={runCode}  // <-- you run code only via this button
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <CodeEditor code={code} setCode={setCode} darkMode={darkMode} />
      <OutputDisplay output={output} darkMode={darkMode} />
    </div>
  );
}

export default App;
