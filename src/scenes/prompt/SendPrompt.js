import { Grid, TextareaAutosize } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const URL = "http://localhost:3001";

const SendPrompt = () => {
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const getPrompt = async () => {
      try {
        const response = await axios.get(`${URL}/prompt/list`);
        setPrompt(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error showing prompt:", error);
      }
    };
    getPrompt();
  }, []);
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 10,
        }}>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={4}
          readOnly
          defaultValue={prompt}
          style={{
            fontFamily: "inherit",
            fontSize: 20,
            lineHeight: 1.5,
            minWidth: "70vw",
          }}
          type="text"
          // value={inputText}
          // onChange={handleInputChange}
        />
      </Grid>
    </Grid>
  );
};

export default SendPrompt;
