import { Grid, TextareaAutosize, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getPrompt } from "../../services/promptService";
// import DOMPurify from 'dompurify';

const SendPrompt = () => {
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const callPrompt = async () => {
      try {
        const response = await getPrompt();
        setPrompt(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error showing prompt:", error);
      }
    };
    callPrompt();
  }, []);

  // const sanitizedHTML = DOMPurify.sanitize(prompt);

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
        />
        {/* <Typography
          sx={{ color: "white" }}
          dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
        /> */}
      </Grid>
    </Grid>
  );
};

export default SendPrompt;
