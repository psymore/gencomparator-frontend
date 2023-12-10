// CODY_KEY=7aGdkkOd0UVcc2HReQ0JrUJyOm8RhfLCvhcVZmhd84433a86
// bot_id: W4QbY7q30ezq name(botname):First Try
// Conversation id: "QJ0dN5RNmbLO"

// Conversation id: "W4QbY7q30ezq"

import { useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";

const CodyConversation = () => {
  const [name, setName] = useState("");
  const [botId, setBotId] = useState("");
  //   const [requestData, setRequestData] = useState({ name: "", bot_id: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const CODY_API_KEY = "7aGdkkOd0UVcc2HReQ0JrUJyOm8RhfLCvhcVZmhd84433a86";
  const API_BASE_URL = "https://getcody.ai/api/v1";
  const AUTH_HEADER = `Bearer ${CODY_API_KEY}`;

  console.log(botId);
  console.log(name);

  const createConversation = async () => {
    try {
      const requestData = {
        name: name,
        bot_id: botId,
      };
      const response = await axios.post(
        `${API_BASE_URL}/conversations`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: AUTH_HEADER,
          },
        }
      );

      if (response.status === 200) {
        console.log("Conversation created:", response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrorMessage(error.response.data.message || "Validation failed.");
        console.error("Validation Error:", error.response.data);
      } else {
        setErrorMessage("An error occurred while creating conversation.");
        console.error("Error:", error);
      }
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "bot_id") {
      setBotId(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    createConversation();
  };

  return (
    <div>
      {errorMessage && <p>Error: {errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          placeholder="Enter conversation name"
        />
        <input
          type="text"
          name="bot_id"
          value={botId}
          onChange={handleInputChange}
          placeholder="Enter bot ID"
        />
        <button type="submit">Create Conversation</button>

        <Typography>Conversation created:</Typography>
      </form>
    </div>
  );
};

export default CodyConversation;
