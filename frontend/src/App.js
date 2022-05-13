import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import SeekerRoute from "./routing/SeekerRoute";
import Signin from "./screens/Auth/Signin";
import Signup from "./screens/Auth/Signup";
import ForgotPassword from "./screens/Auth/ForgotPassword";
import LinkResetPassword from "./screens/Auth/LinkResetPassword";
import ProtectedRoute from "./routing/ProtectedRoute";
import Landing from "./screens/Landing";
import Settings from "./screens/Settings";
import CompleteProfile from "./screens/CompleteProfile";
import Profile from "./screens/Profile";
import Dashboard from './screens/Dashboard';


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
      <Route
        path="settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="complete-profile"
        element={
          <CompleteProfile />
        }
      />
      <Route
        path="profile/:id"
        element={
          <Profile />
        }
      />
      <Route
        path="dashboard"
        element={
          <Dashboard />
        }
      />
    </Routes>
  );
}

export default App;
