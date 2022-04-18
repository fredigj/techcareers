import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import SeekerRoute from "./routing/SeekerRoute";
import Signin from "./screens/Auth/Signin";
import Signup from "./screens/Auth/Signup";
import ForgotPassword from "./screens/Auth/ForgotPassword";
import LinkResetPassword from "./screens/Auth/LinkResetPassword";
import ProtectedRoute from "./routing/ProtectedRoute";
import Landing from "./screens/Landing";


function App() {
  return (
    <Routes>
      <Route index element={<Landing />} />
      {/* <Route path="landing" element={<Landing />} /> */}
      <Route
        path="signin"
        element={
            <Signin />
        }
      />
      <Route
        path="signup"
        element={
            <Signup />
        }
      />
      <Route
        path="forgot-password"
        element={
            <ForgotPassword />
        }
      />
      <Route
        path="reset-password/:token"
        element={
            <LinkResetPassword />
        }
      />
    </Routes>
  );
}

export default App;
