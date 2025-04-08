const ChatBubble = ({ msg, isCurrent }) => {
  const time = new Date(msg.timestamp || Date.now()).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isNow = msg.role === "now";

  return (
    <div
      className={`flex mb-2 ${isCurrent ? "justify-end" : "justify-start"}`}
    >
      <div className={`flex flex-col max-w-[70%]`}>
        <div
          className={`px-4 py-2 rounded-2xl ${
            isCurrent
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-green-500 text-white rounded-bl-none"
          }`}
        >
          {msg.text}
        </div>
        <span className="text-xs mt-1 text-gray-500 dark:text-gray-400">
          {msg.role === "now" ? "Now" : "Monarch"} • {time}
        </span>
      </div>
    </div>
  );
};

export default ChatBubble;
