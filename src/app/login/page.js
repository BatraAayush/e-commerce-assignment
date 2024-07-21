"use client"
import LoginForm from '../_components/LoginForm'
import ProtectedRoute from '../_components/ProtectedRoute';

const Login = () => {
    return <ProtectedRoute publicRoute={true}>
       <LoginForm />
    </ProtectedRoute>
}

export default Login;