import { useState, useEffect } from "react";
import ChatBubble from "./components/ChatBubble";
import { useRef } from "react";

const ROLES = {
  now: "Bama Now",
  monarch: "Bama Monarch",
};

function App() {
  const messagesEndRef = useRef(null);
  const [currentRole, setCurrentRole] = useState("now");
  const [input, setInput] = useState("");
  const [chat, setChat] = useState(() => {
    const saved = localStorage.getItem("bama_chat");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("bama_chat", JSON.stringify(chat));
  }, [chat]);

  useEffect(() => {
    localStorage.setItem("bama_chat", JSON.stringify(chat));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      text: input,
      role: currentRole,
      timestamp: new Date().toISOString(),
    };

    setChat([...chat, newMessage]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6 px-4">
      <h1 className="text-2xl font-bold mb-4">Bama Monarch Chat</h1>

      <div className="mb-4">
        <select
          value={currentRole}
          onChange={(e) => setCurrentRole(e.target.value)}
          className="p-2 rounded border"
        >
          <option value="now">Bama Now</option>
          <option value="monarch">Bama Monarch</option>
        </select>
      </div>
      <div ref={messagesEndRef} />

      <div className="flex-1 w-full max-w-md bg-white shadow-md rounded p-4 overflow-y-auto h-[60vh] mb-4">
        {chat.map((msg, idx) => (
          <ChatBubble
            key={idx}
            msg={msg}
            isCurrent={msg.role === currentRole}
          />
        ))}
      </div>
      <div ref={messagesEndRef} />

      <div className="flex justify-between w-full max-w-md">
        <button
          onClick={() => {
            if (confirm("Are you sure you want to delete all chat?")) {
              setChat([]);
              localStorage.removeItem("bama_chat");
            }
          }}
          className="text-sm text-red-500 underline mb-2"
        >
          Clear All Chat
        </button>
        {/* gap */}
        <button
          onClick={() => {
            const text = chat
              .map((m) => {
                const name = m.role === "now" ? "Bama Now" : "Bama Monarch";
                return `[${new Date(m.timestamp).toLocaleString()}] ${name}: ${
                  m.text
                }`;
              })
              .join("\n");

            const blob = new Blob([text], { type: "text/plain" });
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = `bama_chat_${
              new Date().toISOString().split("T")[0]
            }.txt`;
            link.click();
            URL.revokeObjectURL(url);
          }}
          className="text-sm text-blue-500 underline mb-2 ml-4"
        >
          Export Chat
        </button>
      </div>
      <div className="w-full max-w-md flex gap-2">
        <input
          className="flex-1 p-2 rounded border"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
