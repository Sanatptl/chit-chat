import { MessageSquare, Users } from "lucide-react";

const ChatPlaceholder = ({ onOpenSidebar }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-background-card/20 p-6">
      {/* Mobile: Show button to open contacts */}
      <div className="lg:hidden mb-8">
        <button
          onClick={onOpenSidebar}
          className="flex items-center gap-3 px-6 py-3 bg-main/10 text-main rounded-full hover:bg-main/20 transition-colors"
        >
          <Users className="size-5" />
          <span className="font-medium">View Contacts</span>
        </button>
      </div>

      {/* Welcome message */}
      <div className="text-center space-y-4 max-w-md">
        <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-main/10 rounded-full flex items-center justify-center mb-6">
          <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-main" />
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-main">
          Welcome to Delhi-Chat!
        </h2>

        <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
          {window.innerWidth < 1024
            ? "Tap 'View Contacts' above to start chatting with your friends"
            : "Select a conversation from the sidebar to start chatting"}
        </p>
      </div>

      {/* Decorative elements */}
      <div className="mt-8 flex items-center gap-2 opacity-50">
        <div className="w-2 h-2 bg-main rounded-full animate-pulse"></div>
        <div
          className="w-2 h-2 bg-main rounded-full animate-pulse"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-2 h-2 bg-main rounded-full animate-pulse"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  );
};

export default ChatPlaceholder;
