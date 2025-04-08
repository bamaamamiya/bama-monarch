import { useState, useEffect, useRef } from "react";
import ChatBubble from "./components/ChatBubble";
import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const ROLES = {
  now: "Bama Now",
  monarch: "Bama Monarch",
};

function App() {
  const messagesEndRef = useRef(null);
  const [currentRole, setCurrentRole] = useState("now");
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle dark mode class
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Firebase Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch chat messages from Firestore
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => doc.data());
      setChat(messages);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password).catch((err) =>
      alert(err.message)
    );
  };

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password).catch((err) =>
      alert(err.message)
    );
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    await addDoc(collection(db, "messages"), {
      text: input,
      role: currentRole,
      uid: user.uid,
      createdAt: serverTimestamp(),
      timestamp: new Date().toISOString(),
    });

    setInput("");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <h2 className="text-2xl font-bold mb-4">Login / Register</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-2 p-2 rounded bg-white dark:bg-gray-800"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-4 p-2 rounded bg-white dark:bg-gray-800"
        />
        <div className="flex gap-2">
          <button
            onClick={handleRegister}
            className="bg-green-500 px-4 py-2 rounded text-white"
          >
            Register
          </button>
          <button
            onClick={handleLogin}
            className="bg-blue-500 px-4 py-2 rounded text-white"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white dark:bg-gray-800 px-4 py-2 shadow-md flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold">Bama Monarch Chat</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            👤 Current Bama:{" "}
            <span className="font-medium">
              {currentRole === "now" ? "Now" : "Monarch"}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded p-4 overflow-y-auto h-[60vh] mb-4">
        {chat.map((msg, idx) => (
          <ChatBubble
            key={idx}
            msg={msg}
            isCurrent={msg.role === currentRole}
          />
        ))}
        <div ref={messagesEndRef} />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 shadow-inner px-4 py-3 w-full max-w-md rounded-t-xl">
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setCurrentRole(currentRole === "now" ? "monarch" : "now")
            }
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            <img
              src={
                currentRole === "now"
                  ? "/images/icon/192.jpg"
                  : "/images/icon/1922.jpg"
              }
              alt="role icon"
              className="w-6 h-6"
            />
          </button>
          <input
            className="flex-1 p-2 rounded border dark:bg-gray-800 dark:border-gray-600"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
