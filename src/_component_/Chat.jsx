import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
} from "firebase/firestore";
import { useAuth } from "../Context/AuthContext";

export const Chat = () => {
  const { recipientId } = useParams();
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const chatId = [user.uid, recipientId].sort().join("_");

  useEffect(() => {
    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [chatId]);

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
      });

      setMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <>
    <Nav />
    <div className="p-4">
      {/* Messages */}
      <div className="min-h-[85vh] overflow-y-scroll border p-2 mb-2 bg-gray-100 rounded mt-20">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 flex ${
              msg.senderId === user.uid ? "justify-end" : "justify-start"
            }`}
          >
            <p className="bg-white p-2 rounded shadow max-w-xs">{msg.text}</p>
          </div>
        ))}
      </div>

      {/* Send Box */}
      <form onSubmit={sendMessage} className="flex">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 sticky p-2 border rounded-l"
        />
        <button type="submit" className="bg-green-600 text-white px-4 rounded-r">
          Send
        </button>
      </form>
    </div>
    </>
  );
};
