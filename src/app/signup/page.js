import ProtectedRoute from "../_components/ProtectedRoute";
import SignupForm from "../_components/SignupForm";

const Signup = () => {
  return (
    <ProtectedRoute publicRoute={true}>
      <SignupForm />
    </ProtectedRoute>
  );
};

export default Signup;
