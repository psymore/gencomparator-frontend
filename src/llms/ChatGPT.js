import { useState } from "react";
import axios from "axios";

const ChatGPT = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  // Add your ChatGPT API key here
  const CHATGPT_API_KEY = process.env.CHATGPT_KEY;

  const sendMessage = async () => {
    if (inputText.trim() === "") {
      return;
    }

    const apiUrl = "YOUR_CHATGPT_API_ENDPOINT"; // Replace with your ChatGPT API endpoint

    const requestData = {
      text: inputText,
      // Other parameters needed for your ChatGPT API call
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CHATGPT_API_KEY}`,
    };

    try {
      const response = await axios.post(apiUrl, requestData, { headers });

      if (response.status === 200) {
        const newMessage = {
          id: messages.length + 1,
          text: inputText,
          sender: "user",
          timestamp: new Date().getTime(),
        };

        const botResponse = {
          id: messages.length + 2,
          text: response.data.generated_text,
          sender: "bot",
          timestamp: new Date().getTime(),
        };

        setMessages([...messages, newMessage, botResponse]);
        setInputText("");
      } else {
        console.error(
          "ChatGPT API request failed with status:",
          response.status
        );
      }
    } catch (error) {
      console.error(
        "An error occurred while making the ChatGPT API request:",
        error
      );
    }
  };

  const handleMessageSubmit = e => {
    e.preventDefault();
    sendMessage();
  };

  const handleInputChange = e => {
    setInputText(e.target.value);
  };

  return (
    <div>
      {/* Render messages here */}
      {/* Add a form to input messages */}
      <form onSubmit={handleMessageSubmit}>
        <textarea
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter your message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatGPT;
