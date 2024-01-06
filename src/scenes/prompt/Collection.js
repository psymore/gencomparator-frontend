import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import {
  Box,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import copy from "clipboard-copy";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { getPrompts, getResponse } from "../../services/promptService";

import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const Collection = () => {
  const [prompts, setPrompts] = useState([]);
  const [responses, setResponses] = useState([]);
  const [copied, setCopied] = useState(false);
  const [expandedPrompt, setExpandedPrompt] = useState(null);
  console.log(responses);
  const HighlighterComponent = forwardRef(({ code, ...props }, ref) => {
    const containerRef = useRef(null);

    useEffect(() => {
      if (ref) {
        ref.current = containerRef.current;
      }
    }, [ref]);
    return (
      <pre ref={containerRef} style={{ margin: 0, padding: 0 }}>
        {responses?.[0] === null ? (
          <SyntaxHighlighter
            language="javascript"
            showLineNumbers
            codeTagProps={{
              style: { fontSize: "14px", lineHeight: "0.1rem" },
            }}
            style={dracula}
            {...props}>
            {code}
          </SyntaxHighlighter>
        ) : (
          <CircularProgress size={60} />
        )}
      </pre>
    );
  });

  const highlighterRef = useRef(null);

  const handleCopyClick = () => {
    if (highlighterRef.current) {
      setCopied(true);
      copy(highlighterRef.current.innerText);
      console.log("Code copied to clipboard!");
    }
  };

  useEffect(() => {
    Promise.all([getPrompts(), getResponse()])
      .then(([promptsResponse, responseResponse]) => {
        setPrompts(promptsResponse.data);
        setResponses(responseResponse.data); // Set the other response data
      })
      .catch(error => {
        console.error("Error:", error);
        // Handle any errors that occur in either of the operations
      });
  }, []);

  const handleExpand = promptIndex => {
    setExpandedPrompt(prevState =>
      prevState === promptIndex ? null : promptIndex
    );
    setCopied(false);
  };

  // useEffect(() => {
  //   // Ensure the ref is set after rendering
  //   codeRef.current = document.getElementById("code-highlighter");
  // }, []);

  // console.log(prompts);
  // console.log(responses);
  // console.log(responses?.[expandedPrompt]);

  return (
    <Grid container>
      <Grid item xs={3}>
        <Drawer
          variant="persistent"
          open
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "black", // Change the color here
              color: "#b5b5c2",
            },
            "& .MuiListItemText-root": {
              color: "inherit", // Ensure button text inherits the color
            },
          }}>
          <List>
            <ListItem sx={{ color: "white", mb: 4, mt: 4, width: 200 }}>
              <ListItemButton
                sx={{
                  "&:hover": {
                    backgroundColor: "#202123",
                  },
                  border: "0.2px dashed lightblue",
                }}
                // onClick={() => handleExpand(ix)}
              >
                <ListItemText
                  primary={"New Design"}
                  primaryTypographyProps={{
                    style: { color: "#ececf1" },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </ListItemButton>
            </ListItem>

            {prompts?.map((prompt, ix) => (
              <ListItem
                disablePadding
                key={ix}
                sx={{
                  height: "40px",
                  mb: 0.3,
                  borderRadius: "1rem",
                  "&:hover": {
                    backgroundColor: "#343541",
                  },
                  ...(expandedPrompt === ix && {
                    backgroundColor: "#202123",
                  }),
                }}>
                <ListItemButton onClick={() => handleExpand(ix)}>
                  <ListItemText
                    primary={`Design ${ix + 1}`}
                    primaryTypographyProps={{
                      style: { color: "#a1b8e7" },
                    }}
                  />
                  <ExpandMoreIcon
                    style={{
                      transform: expandedPrompt === ix ? "rotate(180deg)" : "",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Grid>
      <Grid item xs={7}>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              component="div"
              sx={{
                mt: 5,
                textAlign: "justify",
                backgroundColor: expandedPrompt !== null ? "#343541" : "",
                p: 4,
                color: "#fdfdfd",
                border: expandedPrompt !== null ? "1px solid lightblue" : "",
                fontSize: 13,
                lineHeight: "1.1rem",
                borderRadius: "2rem",
              }}
              dangerouslySetInnerHTML={{
                __html:
                  expandedPrompt !== null ? prompts?.[expandedPrompt] : "",
              }}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 5,
            }}>
            {responses?.[expandedPrompt] ? (
              <Box
                sx={{
                  width: "700px",
                  border: responses?.[expandedPrompt]
                    ? "1px solid lightblue"
                    : "",
                  borderRadius: "0.5rem",
                  mb: 5,
                }}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    // display: "flex",
                    // justifyContent: "flex-end",
                    display: "flex",
                    justifyContent: "space-between",
                    height: "30px",
                    background: "#202123",
                    borderTopLeftRadius: "1rem",
                    borderTopRightRadius: "1rem",
                  }}>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "#b5b5c2",
                      display: "flex",
                      alignItems: "center",
                      ml: 2,
                    }}>
                    jsx
                  </Typography>
                  {!copied ? (
                    <IconButton onClick={handleCopyClick}>
                      <ContentPasteIcon
                        style={{
                          color: "lightblue",
                          width: "20px",
                        }}
                      />
                      <Typography sx={{ fontSize: 12, color: "#b5b5c2" }}>
                        Copy Code
                      </Typography>
                    </IconButton>
                  ) : (
                    <IconButton onClick={handleCopyClick}>
                      <TaskAltIcon
                        style={{
                          color: "lightblue",
                          width: "20px",
                        }}
                      />
                      <Typography sx={{ fontSize: 12, color: "#b5b5c2" }}>
                        Copied
                      </Typography>
                    </IconButton>
                  )}
                </Grid>
                {/* <SyntaxHighlighter
                  id="code-highlighter"
                  showLineNumbers
                  language="javascript"
                  codeTagProps={{
                    style: { fontSize: "14px", lineHeight: "0.1rem" },
                  }}
                  style={dracula}>
                  {responses?.[expandedPrompt]
                    ?.replaceAll("```", "")
                    .replace("jsx", "")
                    .replace("javascript", "")
                    .replace(/^\s*[\r\n]/gm, "")}
                </SyntaxHighlighter> */}
                <HighlighterComponent
                  ref={highlighterRef}
                  code={responses?.[expandedPrompt]
                    ?.replaceAll("```", "")
                    .replace("jsx", "")
                    .replace("javascript", "")
                    .replace(/^\s*[\r\n]/gm, "")}
                />
              </Box>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Collection;
