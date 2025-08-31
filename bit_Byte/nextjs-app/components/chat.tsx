"use client";


import { useState } from "react";
import styles from "./chat.module.css";


  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  function sendMessage() {
    if (!message.trim()) return;
    setLoading(true);
    const msg = message;
    setMessage("");
    fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: msg }),
    })
      .then(async (res) => {
        if (res.ok) {
          await res.json().then((data) => {
            setError("");
            setResponse(data.message);
          });
        } else {
          await res.json().then((data) => {
            setError(data.error);
            setResponse("");
          });
        }
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className={styles.chatContainer}>
      <h1 className={styles.title}>Bit_8byte Project</h1>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.response}>{response}</div>
      <div className={styles.inputRow}>
        <input
          className={styles.inputField}
          disabled={loading}
          value={message}
          placeholder="Type your message..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading && message.trim()) {
              sendMessage();
            }
          }}
        />
        <button
          className={styles.sendButton}
          disabled={loading || !message.trim()}
          onClick={sendMessage}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
