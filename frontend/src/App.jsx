import { useEffect } from "react";
import { Navbar } from "./components";
import { Routes, Route, Navigate } from "react-router";
import { HomePage, LoginPage, ProfilePage, SignupPage } from "./pages";
import useZustandStore from "./hook/useZustandStore";

const App = () => {
  const { authUser, checkAuth } = useZustandStore();

  useEffect(() => {
    try {
      checkAuth();
    } catch (error) {
      console.log("Error in useEffect ", error);
    }
  }, [checkAuth]);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
};

export default App;
