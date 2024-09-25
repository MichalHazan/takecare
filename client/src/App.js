import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Logout from './Route/Logout'; // Import Logout component
import PrivateRoute from './Route/PrivateRoute'; // Import the PrivateRoute component
import ClientPage from './components/ClientPages/ClientPage';
import LoginForm from './components/LoginForm';
import ManagementPage from './components/ManagementPages/ManagementPage';
import ProfessionalPage from './components/ProfessionalPages/ProfessionalPage';
import ProtectedPage from './components/ProtectedPage';
import SignupForm from './components/SignupForm';
import Welcome from './components/Welcome/Welcome';
import AddUser from './pages/AddUser';

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
                    <Route path="/Signup" element={<SignupForm />} />

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
