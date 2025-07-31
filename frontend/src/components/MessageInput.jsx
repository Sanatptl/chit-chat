import { Image, Send, X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import useChatStore from "../hook/useChatStore";

const MessageInput = () => {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
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
      toast.success("message sent!");
    } catch (error) {
      console.error("failed to send message: " + error);
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex gap-1 w-full">
          <input
            type="text"
            className="input w-full input-bordered input-sm sm:input-md rounded-lg"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder="Type a message..."
          />
          <input
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          <button
            type="button"
            className={`flex btn btn-circle size-8 sm:size-10 ${
              imagePreview ? "text-emerald-500" : "text-zinc-400"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className="size-6" />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle size-8 sm:size-10 !bg-main/10 disabled:!bg-transparent disabled:cursor-"
          disabled={!content.trim() && !imagePreview}
        >
          <Send className="text-main size-6" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
