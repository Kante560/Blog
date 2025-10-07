import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { Nav } from "../Home/Nav";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  setDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { useAuth } from "../Context/AuthContext";
import { ArrowLeft, Send, Circle } from "lucide-react";

export const Chat = () => {
  const { recipientId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [recipientInfo, setRecipientInfo] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const messagesEndRef = useRef(null);

  const chatId = [user.uid, recipientId].sort().join("_");

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch recipient info
  useEffect(() => {
    const fetchRecipient = async () => {
      const userDoc = await getDoc(doc(db, "users", recipientId));
      if (userDoc.exists()) {
        setRecipientInfo(userDoc.data());
      }
    };
    fetchRecipient();
  }, [recipientId]);

  // Listen to online status
  useEffect(() => {
    const statusRef = doc(db, "status", recipientId);
    const unsubscribe = onSnapshot(statusRef, (doc) => {
      if (doc.exists()) {
        setIsOnline(doc.data().state === "online");
      }
    });
    return () => unsubscribe();
  }, [recipientId]);

  // Listen to messages
  useEffect(() => {
    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesData);

      // Mark messages as read
      snapshot.docs.forEach(async (msgDoc) => {
        const msgData = msgDoc.data();
        if (msgData.receiverId === user.uid && !msgData.read) {
          await updateDoc(doc(db, "chats", chatId, "messages", msgDoc.id), {
            read: true,
          });
        }
      });

      scrollToBottom();
    });

    return () => unsubscribe();
  }, [chatId, user.uid]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await setDoc(
        doc(db, "chats", chatId),
        { lastUpdated: serverTimestamp() },
        { merge: true }
      );

      await addDoc(collection(db, "chats", chatId, "messages"), {
        text: message,
        senderId: user.uid,
        receiverId: recipientId,
        timestamp: serverTimestamp(),
        read: false,
      });

      // Create notification
      await addDoc(collection(db, "notifications"), {
        userId: recipientId,
        type: "message",
        senderId: user.uid,
        senderEmail: user.email,
        senderName: user.displayName || user.email,
        message: message.slice(0, 50),
        chatId: chatId,
        read: false,
        timestamp: serverTimestamp(),
      });

      setMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      <Nav />
      <div className="max-w-4xl  mx-auto mt-20 h-[calc(100vh-6rem)] flex flex-col">
        
        {/* Chat Header */}
        <div className="bg-green-600 text-white p-4 rounded-t-lg shadow-md flex items-center gap-3">
          <button
            onClick={() => navigate("/messages")}
            className="hover:bg-green-700 p-2 rounded-full transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h2 className="font-semibold text-lg">
              {recipientInfo?.name || recipientInfo?.email || "Loading..."}
            </h2>
            <div className="flex items-center gap-1 text-sm text-green-100">
              <Circle
                className={`w-2 h-2 fill-current ${
                  isOnline ? "text-green-300" : "text-gray-400"
                }`}
              />
              <span>{isOnline ? "Online" : "Offline"}</span>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div
          className="relative z-10 flex-1 overflow-y-auto p-4 space-y-3 bg-cover bg-center"
          style={{ backgroundImage: "url('/Dandadan.jpg')" }}
        >
          <div className="fixed inset-0 bg-white/30 dark:bg-black/30 pointer-events-none z-0" />
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.senderId === user.uid ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow relative ${
                    msg.senderId === user.uid
                      ? "bg-green-600/90 text-white rounded-br-none"
                      : "bg-gray-800/90 text-gray-800 dark:text-gray-100 rounded-bl-none"
                  }`}
                >
                  <p className="break-words">{msg.text}</p>
                  <span
                    className={`text-xs mt-1 block ${
                      msg.senderId === user.uid
                        ? "text-green-100"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 mt-10">
              <p>No messages yet. Start the conversation!</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form
          onSubmit={sendMessage}
          className="bg-white p-4 rounded-b-lg shadow-md flex gap-2"
        >
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </>
  );
};
