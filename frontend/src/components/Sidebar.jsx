import { Users } from "lucide-react";
import { useEffect } from "react";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import useZustandStore from "../hook/useZustandStore";
import useChatStore from "../hook/useChatStore";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useZustandStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <aside className="flex flex-col items-center border-r border-base-200 h-full w-20 lg:w-72 transition-all duration-200">
      <div className="border-b p-3 w-full">
        <div className="flex items-center gap-2">
          <Users className="size-4 sm:size-6 text-main" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>
      <div className="overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full py-3">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-background-card transition-colors ${
              selectedUser?._id === user._id
                ? "bg-background-card ring-1 ring-base-300"
                : ""
            }
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profileImage || "/avatar.png"}
                alt={user.name}
                className="size-8 sm:size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.name}</div>
              <div className="text-sm text-zinc-400">
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
