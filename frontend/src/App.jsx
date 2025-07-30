import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./components";
import { Routes, Route, Navigate } from "react-router";
import { HomePage, LoginPage, ProfilePage, SignupPage } from "./pages";
import useZustandStore from "./hook/useZustandStore";
import { Loader } from "lucide-react";

const App = () => {
  const { checkAuth, isCheckingAuth } = useZustandStore();
  const authUser = useZustandStore((state) => state.authUser);

  useEffect(() => {
    try {
      checkAuth();
    } catch (error) {
      console.log("Error in useEffect ", error);
    }
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div className="bg-background">
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
      <Toaster position="bottom-right" />
    </div>
  );
};

export default App;
