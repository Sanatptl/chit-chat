import { Users, X } from "lucide-react";
import { useEffect } from "react";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import useZustandStore from "../hook/useZustandStore";
import useChatStore from "../hook/useChatStore";

const Sidebar = ({ isMobile = false, onClose }) => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useZustandStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    // Close sidebar on mobile after selecting a user
    if (isMobile && onClose) {
      onClose();
    }
  };

  if (isUsersLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <aside className="flex flex-col border-r border-base-200 h-full w-80 lg:w-72 bg-background-card/95 lg:bg-transparent">
      {/* Header with close button for mobile */}
      <div className="border-b p-3 w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="size-5 text-main" />
          <span className="font-medium text-base">Contacts</span>
        </div>
        {isMobile && onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-base-200 rounded-full transition-colors"
          >
            <X className="size-5" />
          </button>
        )}
      </div>

      {/* Users list */}
      <div className="overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full py-3 flex-1">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => handleUserSelect(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-200 transition-colors ${
              selectedUser?._id === user._id
                ? "bg-base-200 border-r-2 border-main"
                : ""
            }`}
          >
            {/* Avatar with online indicator */}
            <div className="relative flex-shrink-0">
              <img
                src={user.profileImage || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info */}
            <div className="text-left min-w-0 flex-1">
              <div className="font-medium truncate text-sm">{user.name}</div>
              <div className="text-xs text-zinc-400 mt-0.5">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
