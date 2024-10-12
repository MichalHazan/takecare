import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupForm from './components/SignUp/SignupForm';
import LoginForm from './components/LoginForm';
import ProtectedPage from './components/ProtectedPages/ProtectedPage';
import ProfessionalPage from './components/ProfessionalPages/ProfessionalPage';
import ClientPage from './components/ClientPages/ClientPage';
import ManagementPage from './components/ManagementPages/ManagementPage';
import PrivateRoute from './Route/PrivateRoute';
import LandingPage from './LandingPage/LandingPage'
import NotFound  from './components/NotFound'
import Login from './components/GoogleLogin'


function Main() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/GoogleLogin" element={<Login />} />
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/AddUser" element={<SignupForm />} />
                    <Route path="/NotFound" element={<NotFound />} />
                    <Route path="/Login" element={<LoginForm />} />
                    <Route path="/ManagementPage" element={<PrivateRoute element={<ManagementPage />} requiredRole={['management']} />} />
                    <Route path="/professional" element={<PrivateRoute element={<ProfessionalPage />} requiredRole={['professional']} />} />
                    <Route path="/client" element={<PrivateRoute element={<ClientPage />} requiredRole={['client']} />} />
                    <Route path="/ProtectedPage" element={<PrivateRoute element={<ProtectedPage />} requiredRole={['client', 'professional', 'management']} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
}

export default Main;
