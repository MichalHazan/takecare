import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddUser from './pages/AddUser';
import Login from './pages/Login';
import Welcome from './components/Welcome/Welcome';
import ProtectedPage from './components/ProtectedPage';
import ProfessionalPage from './components/ProfessionalPages/ProfessionalPage';
import ClientPage from './components/ClientPages/ClientPage';
import ManagementPage from './components/ManagementPages/ManagementPage';
import PrivateRoute from './Route/PrivateRoute';
import AuthButton from './components/AuthButton';

function Main() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/AddUser" element={<AddUser />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/ManagementPage" element={<PrivateRoute element={<ManagementPage />} requiredRole={['management']} />} />
                    <Route path="/professional" element={<PrivateRoute element={<ProfessionalPage />} requiredRole={['professional']} />} />
                    <Route path="/client" element={<PrivateRoute element={<ClientPage />} requiredRole={['client']} />} />
                    <Route path="/ProtectedPage" element={<PrivateRoute element={<ProtectedPage />} requiredRole={['client', 'professional', 'management']} />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
}

export default Main;
