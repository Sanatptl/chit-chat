import ChatPlaceholder from "../components/ui/ChatPlaceholder";
import Sidebar from "../components/Sidebar";
import useChatStore from "../hook/useChatstore";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="h-screen bg-background/50">
      <div className="flex items-center justify-center pt-16 px-4">
        <div className="max-w-6xl w-full h-[calc(100vh-8rem)] shadow-xl rounded-lg">
          <div className="flex h-full rounded-lg overflow-hidden">
            {/* side bar */}
            <Sidebar />
            {/* chat container */}
            {!selectedUser ? <ChatPlaceholder /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
