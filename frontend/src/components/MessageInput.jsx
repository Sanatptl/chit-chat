import { Image, Send, X, Paperclip } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import useChatStore from "../hook/useChatStore";

const MessageInput = () => {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false);
  const { sendMessage, selectedUser } = useChatStore();
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      return toast.error("Please select an image file");
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setIsAttachmentMenuOpen(false);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!content.trim() && !imagePreview) return;

    try {
      await sendMessage(
        {
          content: content?.trim(),
          attachment: imagePreview,
        },
        selectedUser._id
      );

      //clear form
      setContent("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("failed to send message: " + error);
    }
  };

  return (
    <div className="p-3 sm:p-4 w-full bg-background-card/20 border-t border-base-300">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              // className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              // flex items-center justify-center"
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-error text-white
              flex items-center justify-center hover:bg-error/80 transition-colors"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      {/* input form */}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 sm:gap-3"
      >
        <div className="flex-1 relative">
          <textarea
            className="textarea textarea-bordered w-full resize-none text-sm sm:text-base 
                     min-h-[40px] max-h-[120px] py-2 sm:py-3 pr-12 sm:pr-14
                     focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder="Type a message..."
            rows="1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />

          {/* Attachment button inside input */}
          <div className="absolute right-2 bottom-2">
            <div className="relative">
              <button
                type="button"
                className={`btn btn-ghost btn-sm btn-circle size-8 sm:size-9 ${
                  imagePreview ? "text-main" : "text-base-content/60"
                } hover:text-main hover:bg-main/10`}
                onClick={() => setIsAttachmentMenuOpen(!isAttachmentMenuOpen)}
              >
                <Paperclip className="size-4" />
              </button>

              {/* Attachment menu */}
              {isAttachmentMenuOpen && (
                <div
                  className="absolute bottom-full right-0 mb-2 bg-base-100 
                               border border-base-300 rounded-lg shadow-lg p-2 min-w-[120px]"
                >
                  <button
                    type="button"
                    className="flex items-center gap-2 w-full p-2 text-sm hover:bg-base-200 
                             rounded-md transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Image className="size-4" />
                    <span>Photo</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <input
          className="hidden"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
        />

        {/* Send button */}
        <button
          type="submit"
          className={`btn btn-circle size-10 sm:size-12 transition-all duration-200 ${
            content.trim() || imagePreview
              ? "bg-main/20 text-main hover:bg-main/50 scale-100"
              : "bg-base-300 text-base-content/50 cursor-not-allowed scale-95"
          }`}
          disabled={!content.trim() && !imagePreview}
        >
          <Send className="size-4 sm:size-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
