import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddUser from './pages/AddUser';
import LoginForm from './components/LoginForm';
import Welcome from './components/Welcome/Welcome';
import SignupForm from './components/SignupForm';
import ProtectedPage from './components/ProtectedPage';
import ProfessionalPage from './components/ProfessionalPages/ProfessionalPage';
import ClientPage from './components/ClientPages/ClientPage';
import ManagementPage from './components/ManagementPages/ManagementPage';
import PrivateRoute from './Route/PrivateRoute'; // Import the PrivateRoute component
import Logout from './Route/Logout'; // Import Logout component

function App() {
    return (
        <Router>
            <div>
                <Logout />
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/AddUser" element={<AddUser />} />
                    <Route path="/Login" element={<LoginForm />} />
                    <Route path="/Welcome" element={<Welcome />} />

                    {/* Protected routes based on roles */}
                    <Route
                        path="/ManagementPage"
                        element={<PrivateRoute element={<ManagementPage />} requiredRole={['management']} />}
                    />
                    <Route
                        path="/professional"
                        element={<PrivateRoute element={<ProfessionalPage />} requiredRole={['professional']} />}
                    />
                    <Route
                        path="/client"
                        element={<PrivateRoute element={<ClientPage />} requiredRole={['client']} />}
                    />
                    <Route
                        path="/ProtectedPage"
                        element={<PrivateRoute element={<ProtectedPage />} requiredRole={['client', 'professional', 'management']} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
