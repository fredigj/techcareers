import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import SeekerRoute from "./routing/SeekerRoute";
import Signin from "./screens/Auth/Signin";
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
          <ProtectedRoute>
            <Signin />
          </ProtectedRoute>
        }
      />
      <Route
        path="signin"
        element={
          <SeekerRoute>
            <Signin />
          </SeekerRoute>
        }
      />
    </Routes>
  );
}

export default App;
