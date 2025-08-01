import { NavLink } from "react-router-dom";
import { MessagesSquare, Settings, User, LogOut, Menu, X } from "lucide-react";
import useZustandStore from "../hook/useZustandStore";
import { useEffect, useState } from "react";

const Navbar = () => {
  // const { authUser, logout } = useZustandStore(); You're calling the hook, which means React does subscribe to state changes, and it will re-render when any part of the store changes, including authUser. That's why your component updated and authUser appeared in the navbar.

  // ⚠️ Why It's Not the Recommended Way:
  // This approach subscribes your component to the entire store. That means:

  // If any value in the store changes (authUser, isSigningUp, isLoggingIn, isAuthenticated, etc.), the Navbar component will re-render.

  // This can cause unnecessary renders and reduce performance — especially in larger apps or components that use only a few values from the store.

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const authUser = useZustandStore((state) => state.authUser);
  const logout = useZustandStore((state) => state.logout);
  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isMobileMenuOpen) return;

    const handleClickOutside = (event) => {
      if (!event.target.closest(".mobile-menu-container")) {
        setIsMobileMenuOpen(false);
      }
    };
    // Use a small delay to prevent immediate closing when opening
    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 w-full backdrop-blur-lg bg-background/80 border-b border-base-300 z-50">
        <div className="container px-3 sm:px-4 h-16 mx-auto">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <div className="flex items-center">
              <NavLink
                to="/"
                className="flex items-center gap-2 sm:gap-2.5 hover:opacity-80 transition-all"
                onClick={handleLinkClick}
              >
                <div className="flex items-center justify-center size-8 sm:size-9 rounded-full bg-main/10">
                  <MessagesSquare className="w-4 h-4 sm:w-5 sm:h-5 text-main" />
                </div>
                <h1 className="text-base sm:text-lg text-main italic font-bold">
                  Delhi-chat
                </h1>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              <NavLink
                to="/setting"
                className={({ isActive }) =>
                  `btn btn-sm gap-2 hover:text-main transition-colors ${
                    isActive ? "text-main" : ""
                  }`
                }
              >
                <Settings className="w-4 h-4" />
                <span className="hidden lg:inline">Settings</span>
              </NavLink>

              {authUser && (
                <>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `btn btn-sm gap-2 hover:text-main transition-colors ${
                        isActive ? "text-main" : ""
                      }`
                    }
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden lg:inline">Profile</span>
                  </NavLink>

                  <button
                    className="btn btn-sm gap-2 hover:text-main transition-colors"
                    onClick={logout}
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden lg:inline">Logout</span>
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden mobile-menu-container">
              <button
                className="btn btn-ghost btn-sm btn-circle"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden mobile-menu-container transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-background/95 backdrop-blur-lg border-t border-base-300">
            <div className="container px-4 py-3 mx-auto">
              <div className="flex flex-col space-y-2">
                {/* User Info Section (if authenticated) */}
                {authUser && (
                  <div className="flex items-center gap-3 p-3  rounded-lg mb-3">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img
                          src={authUser.profileImage || "/avatar.png"}
                          alt={authUser.name || "User"}
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {authUser.name || "User"}
                      </p>
                      <p className="text-xs text-base-content/60 truncate">
                        {authUser.email}
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Links */}
                <NavLink
                  to="/setting"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-base-100 ${
                      isActive ? "bg-main/10 text-main" : ""
                    }`
                  }
                  onClick={handleLinkClick}
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">Settings</span>
                </NavLink>

                {authUser && (
                  <>
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-base-100 ${
                          isActive ? "bg-main/10 text-main" : ""
                        }`
                      }
                      onClick={handleLinkClick}
                    >
                      <User className="w-5 h-5" />
                      <span className="font-medium">Profile</span>
                    </NavLink>

                    <button
                      className="flex items-center gap-3 p-3 rounded-lg transition-colors text-error hover:bg-error/10 w-full text-left"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );

  // return (
  //   <nav className="fixed top-0 w-full backdrop-blur-lg bg-background/10 border-b border-base-300 z-99">
  //     <div className="container px-4 h-16 mx-auto">
  //       <div className="flex items-center justify-between h-full">
  //         <div className="flex gap-8 items-center">
  //           <NavLink
  //             to="/"
  //             className={`flex items-center gap-2.5 hover:opacity-80 transition-all`}
  //           >
  //             <div className="flex items-center justify-center size-9 rounded-full bg-main/10">
  //               <MessagesSquare className="w-5 h-5 text-main" />
  //             </div>
  //             <h1 className="text-lg text-main italic font-bold">Delhi-chat</h1>
  //           </NavLink>
  //         </div>

  //         <div className="flex items-center gap-2">
  //           <NavLink
  //             to="/setting"
  //             className={({ isActive }) =>
  //               `btn btn-sm hover:text-main transition-colors ${
  //                 isActive ? "text-main" : ""
  //               }`
  //             }
  //           >
  //             <Settings className="w-4 h-4" />
  //             <span className="hidden sm:inline">Setting</span>
  //           </NavLink>
  //           {authUser && (
  //             <>
  //               <NavLink
  //                 to="/profile"
  //                 className={({ isActive }) =>
  //                   `btn btn-sm gap-2 hover:text-main ${
  //                     isActive ? "text-main" : ""
  //                   }`
  //                 }
  //               >
  //                 <User className="w-4 h-4" />
  //                 <span className="hidden sm:inline">Profile</span>
  //               </NavLink>
  //               <button
  //                 to="/logout"
  //                 className="btn btn-sm gap-2 hover:text-main"
  //                 onClick={logout}
  //               >
  //                 <LogOut className="size-5" />
  //                 <span className="hidden sm:inline">Logout</span>
  //               </button>
  //             </>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   </nav>
  // );
};

export default Navbar;
