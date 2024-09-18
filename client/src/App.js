import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddUser from './pages/AddUser'
import Login from './pages/Login'
import Welcome from './components/Welcome/Welcome';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/AddUser" element={<AddUser />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Welcome" element={<Welcome />} />
    </Routes>
  </Router>
  );
}

export default App;
