import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { useAuth } from "../Context/AuthContext";
import { Nav } from "../Home/Nav";
import { MessageCircle, Search, Users } from "lucide-react";

export const ChatList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [users, setUsers] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [unreadCounts, setUnreadCounts] = useState({});
  const [onlineUsers, setOnlineUsers] = useState({});

  // Fetch all users for the user directory
  useEffect(() => {
    const fetchUsers = async () => {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const usersData = {};
      usersSnapshot.forEach((doc) => {
        usersData[doc.id] = doc.data();
      });
      setUsers(usersData);
    };
    fetchUsers();
  }, []);

  // Listen to online status
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "status"), (snapshot) => {
      const status = {};
      snapshot.forEach((doc) => {
        status[doc.id] = doc.data().state === "online";
      });
      setOnlineUsers(status);
    });
    return () => unsubscribe();
  }, []);

  // Listen to all chats involving current user
  useEffect(() => {
    if (!user) return;

    const chatsRef = collection(db, "chats");
    const unsubscribe = onSnapshot(chatsRef, async (snapshot) => {
      const chatsData = [];
      
      for (const chatDoc of snapshot.docs) {
        const chatId = chatDoc.id;
        const [userId1, userId2] = chatId.split("_");
        
        // Only include chats where current user is participant
        if (userId1 === user.uid || userId2 === user.uid) {
          const otherUserId = userId1 === user.uid ? userId2 : userId1;
          
          // Get last message
          const messagesRef = collection(db, "chats", chatId, "messages");
          const q = query(messagesRef, orderBy("timestamp", "desc"));
          const messagesSnapshot = await getDocs(q);
          
          const lastMessage = messagesSnapshot.docs[0]?.data();
          const unreadCount = messagesSnapshot.docs.filter(
            (doc) => doc.data().receiverId === user.uid && !doc.data().read
          ).length;

          // Get other user info
          let otherUserData = users[otherUserId];
          if (!otherUserData) {
            const userDoc = await getDoc(doc(db, "users", otherUserId));
            otherUserData = userDoc.data() || { email: "Unknown User" };
          }

          chatsData.push({
            chatId,
            otherUserId,
            otherUserEmail: otherUserData.email || "Unknown",
            otherUserName: otherUserData.name || "",
            lastMessage: lastMessage?.text || "No messages yet",
            timestamp: lastMessage?.timestamp,
            unreadCount,
          });
        }
      }

      // Sort by timestamp
      chatsData.sort((a, b) => {
        if (!a.timestamp) return 1;
        if (!b.timestamp) return -1;
        return b.timestamp.toMillis() - a.timestamp.toMillis();
      });

      setConversations(chatsData);
    });

    return () => unsubscribe();
  }, [user, users]);

  const filteredConversations = conversations.filter((conv) => {
    const hay = (conv.otherUserName || conv.otherUserEmail || "").toLowerCase();
    return hay.includes(searchQuery.toLowerCase());
  });

  const totalUnread = conversations.reduce(
    (sum, conv) => sum + conv.unreadCount,
    0
  );

  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto p-4 mt-20">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="border-b p-4 backdrop-blur-sm bg-gray-400/50 text-white rounded-t-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-6 h-6" />
                <h1 className="text-2xl font-bold">Messages</h1>
              </div>
              {totalUnread > 0 && (
                <span className="bg-white text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {totalUnread} unread
                </span>
              )}
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-600" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-1/2 shadow-lg bg-green-600/50 pl-10 pr-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:shadow-green-400 focus:shadow-sm focus:bg-transparent"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="divide-y max-h-[600px] overflow-y-auto ">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conv) => (
                <div
                  key={conv.chatId}
                  onClick={() => navigate(`/chat/${conv.otherUserId}`)}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors flex items-center gap-3"
                >
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold text-lg">
                      {(conv.otherUserName || conv.otherUserEmail).charAt(0).toUpperCase()}
                    </div>
                    {onlineUsers[conv.otherUserId] && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>

                  {/* Chat Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-800 truncate">
                        {conv.otherUserName || conv.otherUserEmail}
                      </h3>
                      {conv.timestamp && (
                        <span className="text-xs text-gray-500 ml-2">
                          {new Date(
                            conv.timestamp.toMillis()
                          ).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600 truncate">
                        {conv.lastMessage}
                      </p>
                      {conv.unreadCount > 0 && (
                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full ml-2">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                <MessageCircle className="w-16 h-16 mx-auto mb-3 text-gray-300" />
                <p className="text-lg font-semibold mb-1">No conversations yet</p>
                <p className="text-sm">
                  Start chatting by messaging blog authors
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
