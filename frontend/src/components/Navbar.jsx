import { NavLink } from "react-router-dom";
import { MessagesSquare, Settings, User, LogOut } from "lucide-react";
import useZustandStore from "../hook/useZustandStore";

const Navbar = () => {
  // const { authUser, logout } = useZustandStore(); You're calling the hook, which means React does subscribe to state changes, and it will re-render when any part of the store changes, including authUser. That's why your component updated and authUser appeared in the navbar.

  // ⚠️ Why It's Not the Recommended Way:
  // This approach subscribes your component to the entire store. That means:

  // If any value in the store changes (authUser, isSigningUp, isLoggingIn, isAuthenticated, etc.), the Navbar component will re-render.

  // This can cause unnecessary renders and reduce performance — especially in larger apps or components that use only a few values from the store.

  const authUser = useZustandStore((state) => state.authUser);
  const logout = useZustandStore((state) => state.logout);

  return (
    <nav className="fixed top-0 w-full backdrop-blur-lg bg-background/10 border-b border-base-300 z-99">
      <div className="container px-4 h-16 mx-auto">
        <div className="flex items-center justify-between h-full">
          <div className="flex gap-8 items-center">
            <NavLink
              to="/"
              className={`flex items-center gap-2.5 hover:opacity-80 transition-all`}
            >
              <div className="flex items-center justify-center size-9 rounded-full bg-main/10">
                <MessagesSquare className="w-5 h-5 text-main" />
              </div>
              <h1 className="text-lg text-main italic font-bold">Delhi-chat</h1>
            </NavLink>
          </div>

          <div className="flex items-center gap-2">
            <NavLink
              to="/setting"
              className={({ isActive }) =>
                `btn btn-sm hover:text-main transition-colors ${
                  isActive ? "text-main" : ""
                }`
              }
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Setting</span>
            </NavLink>
            {authUser && (
              <>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `btn btn-sm gap-2 hover:text-main ${
                      isActive ? "text-main" : ""
                    }`
                  }
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </NavLink>
                <button
                  to="/logout"
                  className="btn btn-sm gap-2 hover:text-main"
                  onClick={logout}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
