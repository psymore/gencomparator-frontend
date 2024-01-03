import {
  Button,
  Divider,
  FormControl,
  Grid,
  TextareaAutosize,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import Codesandbox from "../sandboxes/Codesandbox";

const SendTemplateOld = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [storeResponse, setStoreResponse] = useState([]);
  const [showSandbox, setShowSandbox] = useState(false);
  const [conversationId, setConversationId] = useState(0);
  const [openCodeBlock, setOpenCodeBlock] = useState([]);

  const toggleCodeBlock = messageId => {
    setOpenCodeBlock(prevState => ({
      ...prevState,
      [messageId]: !prevState[messageId],
    }));
  };

  const PALM_API_KEY = "AIzaSyBj41BXCZzPlNCDDgGaP7DihkaDoAgkflM";

  console.log(storeResponse);
  console.log(messages);

  console.log(conversationId);

  const generateText = async () => {
    if (inputText.trim() === "") {
      return;
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText`;

    const requestData = {
      prompt: {
        text: inputText,
      },

      safetySettings: [
        // {
        //   category: "HARM_CATEGORY_UNSPECIFIED",
        //   threshold: "HARM_BLOCK_THRESHOLD_UNSPECIFIED",
        // },
      ],
      stopSequences: [],
      temperature: 0.1,
      candidateCount: 1,
      // maxOutputTokens: 100,
      topP: 0.95,
      topK: 40,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(
        `${apiUrl}?key=${PALM_API_KEY}`,
        requestData,
        {
          headers,
        }
      );

      if (response.status === 200) {
        if (
          response.data &&
          response.data.candidates &&
          response.data.candidates.length > 0
        ) {
          const botResponse = response.data.candidates[0].output;

          const newUserMessage = {
            id: messages.length + 1,
            text: inputText,
            sender: "user",
            timestamp: new Date().getTime(),
          };

          const newBotMessage = {
            id: messages.length + 2,
            text: botResponse,
            sender: "bot(text-bison-001)",
            timestamp: new Date().getTime(),
          };

          setMessages([...messages, newUserMessage, newBotMessage]);
          setInputText("");

          setStoreResponse([...storeResponse, botResponse]);

          console.log(response);
          console.log(botResponse);
          console.log(messages);
        } else {
          console.error(
            "Response structure is not as expected.",
            response.data
          );
        }
      } else {
        console.error(
          "Google Cloud API request failed with status:",
          response.status
        );
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.log("Error", error.message);
      }

      console.error(
        "An error occurred while making the Google Cloud API request:",
        error
      );
    }
  };

  const handleMessageSubmit = e => {
    e.preventDefault();
    generateText();
  };

  const handleInputChange = e => {
    setInputText(e.target.value);
  };

  return (
    <div style={{ marginBottom: 40 }}>
      <div
        style={{
          border: "4px solid lightgrey",
          borderRadius: "4rem",
          marginTop: "4rem",
          width: "40%",
          marginLeft: "30%",
        }}>
        {messages.map((message, index) => (
          <div key={message.id}>
            {message.sender === "user" && (
              <p
                style={{
                  padding: "10px",
                }}>
                {`${message.sender}: ${message.text}`}
              </p>
            )}

            {message.sender === "bot(text-bison-001)" && (
              <Grid container>
                <Grid item xs={12}>
                  <SyntaxHighlighter
                    showLineNumbers
                    language="javascript"
                    style={dracula}>
                    {message.text
                      ?.replaceAll("```", "")
                      .replace("jsx", "")
                      .replace(/^\s*[\r\n]/gm, "")}
                  </SyntaxHighlighter>
                  {/* )} */}
                </Grid>
                <Grid item xs={12} mt={3}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setShowSandbox(true);
                      setConversationId(Math.floor(index / 2));
                    }}>
                    Open CodeSandbox
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setShowSandbox(false);
                    }}
                    sx={{ ml: 8 }}>
                    Close CodeSandbox
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 4 }} />
                </Grid>
              </Grid>
            )}
          </div>
        ))}

        <FormControl
          style={{
            marginTop: "50px",
            marginBottom: "100px",
          }}>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={4}
            placeholder="Enter your prompt"
            style={{
              fontFamily: "inherit",
              fontSize: 20,
              lineHeight: 1.5,
              height: 100,
              width: 290,
              minWidth: 200,
              minHeight: 50,
            }}
            type="text"
            value={inputText}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{
              marginTop: "16px",
              backgroundColor: "lightcoral",
              "&:hover": { backgroundColor: "lightsalmon" },
            }}
            onClick={handleMessageSubmit}>
            Send
          </Button>
        </FormControl>
      </div>
      {showSandbox && (
        <Codesandbox
          codesandbox
          appJsWork={storeResponse[conversationId]
            ?.replaceAll("```", "")
            .replace("jsx", "")}
        />
      )}
    </div>
  );
};

export default SendTemplateOld;
