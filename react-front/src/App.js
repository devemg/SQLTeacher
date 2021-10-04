import logo from './logo.svg';
import './App.css';
import Editor from "@monaco-editor/react";

function App() {
  return (
    <div className="container">
      <div className="nav-options">
        <button>Run</button>
      </div>
      <Editor
     height="100%"
     defaultLanguage="javascript"
     defaultValue="// some comment"
   />
    </div>
  );
}

export default App;
