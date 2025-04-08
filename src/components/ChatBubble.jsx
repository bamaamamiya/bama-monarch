const ChatBubble = ({ msg, isCurrent, currentUserUid, onDelete, onEdit }) => {
  const time = new Date(msg.timestamp || Date.now()).toLocaleTimeString(
    "id-ID",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const isOwner = msg.uid === currentUserUid;

  return (
    <div className={`flex mb-2 ${isCurrent ? "justify-end" : "justify-start"}`}>
      <div className="flex flex-col max-w-[70%] group relative">
        <div
          className={`px-4 py-2 rounded-2xl ${
            isCurrent
              ? "bg-gray-900 text-white rounded-br-none"
              : "bg-gray-200 text-black rounded-bl-none"
          }`}
        >
          {msg.text}
        </div>
        <span className="text-xs mt-1 text-gray-500 dark:text-gray-400">
          {msg.role === "now" ? "Now" : "Monarch"} • {time}
        </span>

        {isOwner && (
          <div
            className={`absolute top-0 ${
              isCurrent ? "-left-16" : "-right-16"
            } flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity`}
          >
            <button
              onClick={() => onEdit(msg)}
              className="text-xs bg-yellow-500 text-white px-2 py-1 rounded min-w-[45px]"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(msg)}
              className="text-xs bg-red-500 text-white px-2 py-1 rounded min-w-[45px]"
            >
              🗑️
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
