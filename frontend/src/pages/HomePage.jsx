import { useState } from "react";
import ChatPlaceholder from "../components/ui/ChatPlaceholder";
import Sidebar from "../components/Sidebar";
import useChatStore from "../hook/useChatStore.js";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-background/50">
      <div className="flex items-center justify-center pt-16 px-2 sm:px-4">
        <div className="max-w-6xl w-full h-[calc(100vh-4rem)] sm:h-[calc(100vh-8rem)] shadow-xl rounded-lg">
          <div className="flex h-full rounded-lg overflow-hidden relative">
            {/* Mobile overlay when sidebar is open */}
            {isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}

            {/* Sidebar */}
            <div
              className={`
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
              lg:translate-x-0 transition-transform duration-300 ease-in-out
              fixed lg:relative z-150 lg:z-auto
              h-full lg:h-auto top-16 sm:top-0 left-0
              lg:flex lg:flex-col
            `}
            >
              <Sidebar
                isMobile={true}
                onClose={() => setIsSidebarOpen(false)}
              />
            </div>

            {/* Main chat area */}
            <div className="flex-1 flex flex-col min-w-0">
              {!selectedUser ? (
                <ChatPlaceholder onOpenSidebar={() => setIsSidebarOpen(true)} />
              ) : (
                <ChatContainer
                  onOpenSidebar={() => setIsSidebarOpen(true)}
                  onCloseSidebar={() => setIsSidebarOpen(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
