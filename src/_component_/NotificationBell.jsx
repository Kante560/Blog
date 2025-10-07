import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  orderBy,
  limit,
} from "firebase/firestore";
import { useAuth } from "../Context/AuthContext";
import { Bell } from "lucide-react";

export const NotificationBell = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    const notificationsRef = collection(db, "notifications");
    const q = query(
      notificationsRef,
      where("userId", "==", user.uid),
      orderBy("timestamp", "desc"),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotifications(notifs);
      setUnreadCount(notifs.filter((n) => !n.read).length);
    });

    return () => unsubscribe();
  }, [user]);

  const handleNotificationClick = async (notification) => {
    // Mark as read
    if (!notification.read) {
      await updateDoc(doc(db, "notifications", notification.id), {
        read: true,
      });
    }

    // Navigate to chat
    if (notification.type === "message") {
      navigate(`/chat/${notification.senderId}`);
    }

    setShowDropdown(false);
  };

  const markAllAsRead = async () => {
    const unreadNotifs = notifications.filter((n) => !n.read);
    await Promise.all(
      unreadNotifs.map((n) =>
        updateDoc(doc(db, "notifications", n.id), { read: true })
      )
    );
  };

  return (
    <div className="relative flex items-center gap-2">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 hover:bg-gray-100 rounded-full transition"
        aria-label={`Notifications ${unreadCount > 0 ? unreadCount + ' unread' : ''}`}
      >
        <Bell className="w-6 h-6 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>
      {unreadCount > 0 && (
        <span className="text-xs font-semibold text-red-600 select-none">{unreadCount}</span>
      )}

      {showDropdown && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowDropdown(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-20 max-h-96 overflow-y-auto">
            <div className="p-3 border-b flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-green-600 hover:underline"
                >
                  Mark all read
                </button>
              )}
            </div>

            {notifications.length > 0 ? (
              <div className="divide-y">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => handleNotificationClick(notif)}
                    className={`p-3 hover:bg-gray-50 cursor-pointer transition ${
                      !notif.read ? "bg-green-50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">
                          New message from {notif.senderEmail}
                        </p>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                          {notif.message}
                        </p>
                        {notif.timestamp && (
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(
                              notif.timestamp.toMillis()
                            ).toLocaleTimeString()}
                          </p>
                        )}
                      </div>
                      {!notif.read && (
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-1"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-400">
                <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No notifications yet</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
