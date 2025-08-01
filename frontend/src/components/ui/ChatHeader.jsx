import { X, ArrowLeft, Menu, MoreVertical } from "lucide-react";
import useZustandStore from "../../hook/useZustandStore.js";
import useChatStore from "../../hook/useChatStore.js";

const ChatHeader = ({ onOpenSidebar, onBack }) => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useZustandStore();

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
    // On mobile, going back means deselecting user
    if (window.innerWidth < 1024) {
      setSelectedUser(null);
    }
  };

  return (
    <div className="border-b border-base-300 p-3 bg-background-card/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Back button for mobile */}
          <button
            onClick={handleBack}
            className="lg:hidden p-1.5 hover:bg-base-200 rounded-full transition-colors"
          >
            <ArrowLeft className="size-5" />
          </button>

          {/* Menu button for larger screens */}
          <button
            onClick={onOpenSidebar}
            className="hidden lg:block p-1.5 hover:bg-base-200 rounded-full transition-colors xl:hidden"
          >
            <Menu className="size-5" />
          </button>
          {/* Avatar */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={selectedUser.profileImage || "/avatar.png"}
                alt={selectedUser.name}
                className="size-10 object-cover rounded-full"
              />
              {onlineUsers.includes(selectedUser._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white" />
              )}
            </div>

            {/* User info */}
            <div>
              <h3 className="font-medium text-main">{selectedUser.name}</h3>
              <p className="text-sm text-base-content/70">
                {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        </div>

        {/* Options button */}
        <button className="p-1.5 hover:bg-base-200 rounded-full transition-colors">
          <MoreVertical className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
