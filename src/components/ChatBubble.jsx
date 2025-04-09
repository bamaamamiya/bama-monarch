import { useState, useRef, useEffect } from "react";

const ChatBubble = ({ msg, isCurrent, currentUserUid, onDelete, onEdit }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const isOwner = msg.uid === currentUserUid;
  const time = new Date(msg.timestamp || Date.now()).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`flex mb-2 ${isCurrent ? "justify-end" : "justify-start"}`}>
      <div className="flex items-start gap-2 max-w-[70%] relative">
        {!isCurrent && isOwner && (
          <div className="relative">
            <button onClick={() => setShowMenu(!showMenu)} className="text-lg px-1">⋯</button>
            {showMenu && (
              <div
                ref={menuRef}
                className="absolute left-full top-0 z-10 bg-white shadow-md rounded border text-sm flex gap-2"
              >
                <button onClick={() => onEdit(msg)} className="px-3 py-1 hover:bg-gray-100 border-r-2 border-black">
                  ✏️
                </button>
                <button onClick={() => onDelete(msg)} className="px-3 py-1 hover:bg-gray-100 text-red-600 ">
                  🗑️
                </button>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col">
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
        </div>

        {isCurrent && isOwner && (
          <div className="relative">
            <button onClick={() => setShowMenu(!showMenu)} className="text-lg px-1">⋯</button>
            {showMenu && (
              <div
                ref={menuRef}
                className="absolute right-full top-0 z-10 bg-white shadow-md rounded border text-sm flex gap-2"
              >
                <button onClick={() => onEdit(msg)} className="px-3 py-1 hover:bg-gray-100 border-r-2 border-black">
                  ✏️
                </button>
                <button onClick={() => onDelete(msg)} className="px-3 py-1 hover:bg-gray-100 text-red-600 ">
                  🗑️
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
