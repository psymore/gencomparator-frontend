// CODY_KEY=7aGdkkOd0UVcc2HReQ0JrUJyOm8RhfLCvhcVZmhd84433a86
// bot_id: W4QbY7q30ezq name(botname):First Try
// Conversation id: "QJ0dN5RNmbLO"

import { useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const CodyMessages = () => {
  const [content, setContent] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const CODY_API_KEY = "7aGdkkOd0UVcc2HReQ0JrUJyOm8RhfLCvhcVZmhd84433a86";
  const API_BASE_URL = "https://getcody.ai/api/v1";
  const AUTH_HEADER = `Bearer ${CODY_API_KEY}`;

  const sendMessage = async () => {
    try {
      setLoading(true);

      const requestData = {
        content: content,
        conversation_id: conversationId,
      };

      const response = await axios.post(
        `${API_BASE_URL}/messages`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: AUTH_HEADER,
          },
        }
      );

      if (response.status === 200) {
        setResponseMessage(response.data?.data?.content);
        console.log(response);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 402) {
          setErrorMessage(error.response.data.message);
        } else if (error.response.data && error.response.data.errors) {
          const { errors } = error.response.data;
          console.error("Validation Error:", errors);
          setErrorMessage("Validation failed. Please check your input data.");
        } else {
          setErrorMessage("An error occurred while sending the message.");
        }
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false); // Reset loading state to false after response or error
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name === "content") {
      setContent(value);
    } else if (name === "conversation_id") {
      setConversationId(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div>
      {errorMessage && <p>Error: {errorMessage}</p>}
      {loading && <CircularProgress />}
      {responseMessage && (
        <p style={{ color: "black" }}>Response: {responseMessage}</p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="content"
          value={content}
          onChange={handleInputChange}
          placeholder="Enter message content"
        />
        <input
          type="text"
          name="conversation_id"
          value={conversationId}
          onChange={handleInputChange}
          placeholder="Enter conversation ID"
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default CodyMessages;
