import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Authpage from "./pages/Authpage/Authpage";
import PageLayout from "./Layout/PageLayout/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import useAuthStore from "./Store/authStore";

function App() {
  const authUser = useAuthStore((state) => state.user);

  return (
    <PageLayout>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Homepage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!authUser ? <Authpage /> : <Navigate to="/" />}
        />
        {/* Asegúrate de que tenga exactamente :username */}
        <Route path="/:username" element={<ProfilePage />} />
      </Routes>
    </PageLayout>
  );
}

export default App;