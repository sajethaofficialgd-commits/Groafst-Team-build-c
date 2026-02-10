"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function NotificationsPanel() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const loadHistory = async () => {
      if (!token) return;
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const history = await response.json();
        setMessages(history.map((item) => ({
          id: item._id,
          type: item.type,
          message: item.message
        })));
      }
    };

    loadHistory();

    if (!token) return;
    const socket = io(process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000", {
      transports: ["websocket"],
      auth: { token }
    });

    socket.on("notification", (payload) => {
      setMessages((prev) => [{ id: payload._id || Date.now(), type: payload.type, message: payload.message }, ...prev].slice(0, 5));
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold">Notifications</h3>
      <div className="mt-4 space-y-3 text-sm text-[var(--muted)]">
        {messages.length === 0 ? (
          <p>No updates yet.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="flex flex-col">
              <span className="font-medium text-[var(--text)]">{msg.type}</span>
              <span>{msg.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
