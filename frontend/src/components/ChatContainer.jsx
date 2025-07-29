import { useEffect } from "react";
import useZustandStore from "../hook/useZustandStore";
import useChatStore from "../hook/useChatstore";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import ChatHeader from "./ui/ChatHeader";
import MessageInput from "./MessageInput";
import { formatTime } from "../utils/formatTime";
import EmptyChatIcon from "./ui/EmptyChatIcon";

const ChatContainer = () => {
  const { getMessages, isMessagesLoading, selectedUser } = useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <ChatHeader />
      {isMessagesLoading ? <MessageSkeleton /> : <MessageBox />}
      <MessageInput />
    </div>
  );
};

const MessageBox = () => {
  const { messages, selectedUser } = useChatStore();
  const { authUser } = useZustandStore();

  return (
    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-2">
          <EmptyChatIcon className="mb-4 w-16 h-16 text-main/45" />
          <span className="text-lg font-semibold">
            No messages yet. Say hi! 👋
          </span>
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message?._id}
            className={`chat ${
              message.sender?.toString() === authUser?._id?.toString()
                ? "chat-end"
                : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="profile-pic"
                  src={
                    message?.sender?.toString() === authUser?._id?.toString()
                      ? authUser.profileImage || "./avatar.png"
                      : selectedUser.profileImage || "./avatar.png"
                  }
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.attachment && (
                <img
                  src={message.attachment}
                  alt="attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.content && <p>{message.content}</p>}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatContainer;
