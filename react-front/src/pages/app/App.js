import './App.css';
import LoginComponent from '../login/login';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';

function App() {
  return (
    <ScopedCssBaseline enableColorScheme >
    {/* The rest of your application */}
    <LoginComponent/>
  </ScopedCssBaseline>
  );
}

export default App;
