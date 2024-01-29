import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
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
import { getPrompts } from "../../services/promptService";

import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useNavigate } from "react-router-dom";
import Codesandbox from "../sandboxes/Codesandbox";

const Collection = () => {
  const [prompts, setPrompts] = useState([]);
  const [llmNames, setLlmNames] = useState([]);
  const [copied, setCopied] = useState(false);
  const [expandedPrompt, setExpandedPrompt] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const [isMui, setIsMui] = useState(false);
  const [titleFound, setTitleFound] = useState(false);
  const [fieldsArray, setFieldsArray] = useState([]);
  const [fieldsFound, setFieldsFound] = useState([]);
  const [fieldsNotFound, setFieldsNotFound] = useState([]);
  const [isFetchingFinished, setIsFetchingFinished] = useState(false);

  const [showSandbox, setShowSandbox] = useState(false);
  const [sandboxCode, setSandboxCode] = useState("");

  const navigate = useNavigate();

  const { style, title, titleExists } =
    prompts?.[expandedPrompt]?.parameters ?? {};

  const trueStyle = style
    ? Object.keys(style).find(key => style[key] === true)
    : "Can not show";

  const searchText = (text, fields) => {
    const foundElements = [];
    const notFoundElements = [];

    fields?.forEach(field => {
      if (!text.includes(field)) {
        notFoundElements.push(field);
      } else {
        foundElements.push(field);
      }
    });

    console.log("Found elements:", foundElements);
    console.log("Not found elements:", notFoundElements);

    // Set the state after the loop is complete
    setFieldsFound(foundElements);
    setFieldsNotFound(notFoundElements);

    console.log(fieldsFound);
  };

  const HighlighterComponent = forwardRef(({ code, ...props }, ref) => {
    const containerRef = useRef(null);

    const codeLineCount = code?.split("\n").length;
    const containsMui = code?.includes("mui");
    const isTitleCorrect = code?.includes(title);

    console.log(codeLineCount);

    useEffect(() => {
      if (ref) {
        ref.current = containerRef.current;
      }

      if (titleExists) {
        setTitleFound(isTitleCorrect);
        return;
      }

      setIsMui(style?.mui === containsMui);
      setLineCount(codeLineCount);

      searchText(currentCode, fieldsArray);

      setSandboxCode(code);
    }, [ref, searchText]);

    // console.log(prompts?.[expandedPrompt]?.promptResponse?.[selectedIndex]?.llmName === "ChatGPT" ? isChatGptFinished);

    return (
      <pre ref={containerRef} style={{ margin: 0, padding: 0 }}>
        {prompts?.[expandedPrompt]?.promptResponse?.[selectedIndex]
          ?.response !== (null || undefined) ? (
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

  const checkChatGptFinished = () => {
    return prompts?.[expandedPrompt]?.promptResponse?.[selectedIndex]?.llmName
      ?.isChatGptFinished;
  };

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const response = await getPrompts();
        setPrompts(response.data);

        const llmNamesArray = response?.data?.[
          expandedPrompt
        ]?.promptResponse.map(item => item.llmName);
        setLlmNames(llmNamesArray);

        const fieldsArraySetter =
          response?.data?.[expandedPrompt]?.parameters?.fields;
        setFieldsArray(fieldsArraySetter);

        setIsFetchingFinished(
          prompts?.[expandedPrompt]?.promptResponse?.[selectedIndex]
            ?.isGeminiFinished ||
            prompts?.[expandedPrompt]?.promptResponse?.[selectedIndex]
              ?.isChatGptFinished
        );
        // console.log(checkGeminiFinished());
        console.log(isFetchingFinished);

        // setGeminiFinished(checkGeminiFinished());
        console.log(fieldsArray);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const intervalId = setInterval(async () => {
      console.log("Fetching prompt...");
      await fetchPrompt();

      if (!isFetchingFinished) {
        console.log("Condition met. Stopping interval.");
        clearInterval(intervalId); // Stop the interval when the condition is met
      }
    }, 2000);

    if (isFetchingFinished) {
      clearInterval(intervalId); // Stop the interval when the condition is met
    }

    fetchPrompt();

    return () => clearInterval(intervalId);
  }, [expandedPrompt]);

  const handleExpand = promptIndex => {
    setExpandedPrompt(prevState =>
      prevState === promptIndex ? null : promptIndex
    );
    setCopied(false);
  };

  const handleButtonClick = index => {
    setSelectedIndex(index);
  };

  // console.log(
  //   prompts?.[expandedPrompt]?.promptResponse?.[selectedIndex].executionTime /
  //     1000
  // );

  // console.log(style.mui);

  const currentCode = prompts?.[expandedPrompt]?.promptResponse?.[
    selectedIndex
  ]?.response
    ?.replaceAll("```", "")
    .replace("jsx", "")
    .replace("javascript", "")
    .replace(/^\s*[\r\n]/gm, "");

  const responseTime =
    prompts?.[expandedPrompt]?.promptResponse?.[selectedIndex]?.executionTime /
    1000;

  return (
    <Grid container>
      <Grid item xs={2}>
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
            <ListItem sx={{ mb: 4, mt: 4, width: 200 }}>
              <ListItemButton
                sx={{
                  "&:hover": {
                    backgroundColor: "#202123",
                  },
                  border: "0.2px dashed lightblue",
                }}
                onClick={() => navigate("/prompt-templates")}>
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
                key={ix}
                disablePadding
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

      <Grid item xs={9}>
        <Grid
          container
          spacing={3}
          mt={5}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}>
          <Grid item xs={6} mt={8.5}>
            <Typography
              component="div"
              sx={{
                textAlign: "justify",
                backgroundColor: expandedPrompt !== null ? "#343541" : "",
                p: 4,
                color: "#ececf1",
                border: expandedPrompt !== null ? "1px solid lightblue" : "",
                fontSize: 13,
                lineHeight: "1.1rem",
                borderRadius: "0.5rem",
              }}
              dangerouslySetInnerHTML={{
                __html:
                  expandedPrompt !== null
                    ? prompts?.[expandedPrompt]?.text
                    : "",
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              {llmNames?.map((llmName, ix) => {
                return (
                  <Grid
                    item
                    xs={6}
                    key={ix}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    {llmName !== null && llmName !== undefined ? (
                      <Button
                        sx={{
                          minWidth: 150,
                          ":hover": { backgroundColor: "" },
                          backgroundColor:
                            prompts?.[expandedPrompt]?.promptResponse?.[
                              selectedIndex
                            ]?.llmName === llmName
                              ? ""
                              : "#202123",
                        }}
                        onClick={() => handleButtonClick(ix)}>
                        {llmName}
                      </Button>
                    ) : (
                      <CircularProgress size={60} />
                    )}
                  </Grid>
                );
              })}
            </Grid>
            <Grid item xs={12} mt={2}>
              <Box
                sx={{
                  border: prompts?.[expandedPrompt]?.promptResponse
                    ? "1px solid lightblue"
                    : "",
                  borderRadius: "0.5rem",
                  mb: 5,
                }}>
                <Grid
                  item
                  xs={12}
                  sx={{
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

                <Grid item>
                  <HighlighterComponent
                    ref={highlighterRef}
                    code={currentCode}
                  />
                  <Grid item xs={12}>
                    <Typography sx={{ color: "#fdfdfd" }}>
                      Evaluation Criteria
                    </Typography>
                    <Divider sx={{ my: 1, backgroundColor: "#b5b5c2" }} />
                    <Typography sx={{ color: "#b5b5c2", mt: 2, fontSize: 17 }}>
                      Lines of Code: {lineCount}
                    </Typography>

                    <Typography sx={{ color: "#b5b5c2", mt: 1, fontSize: 17 }}>
                      {trueStyle?.toUpperCase()} Used: {isMui?.toString()}
                    </Typography>

                    <Typography sx={{ color: "#b5b5c2", mt: 1, fontSize: 17 }}>
                      Page Title:{" "}
                      {!titleExists
                        ? "Not Provided On Prompt"
                        : titleFound?.toString()}
                    </Typography>

                    <Typography sx={{ color: "#b5b5c2", mt: 1, fontSize: 17 }}>
                      Input Fields Found: "Username", "Password"
                    </Typography>

                    <Typography sx={{ color: "#b5b5c2", mt: 1, fontSize: 17 }}>
                      Input Fields Not Found: None
                    </Typography>

                    <Typography sx={{ color: "#b5b5c2", mt: 1, fontSize: 17 }}>
                      Response time: {responseTime}
                    </Typography>

                    <Grid item xs={12} mt={3} mb={2}>
                      <Button
                        variant="contained"
                        sx={{ fontSize: 15 }}
                        onClick={() => {
                          setShowSandbox(true);
                          // setConversationId(Math.floor(index / 2));
                        }}>
                        Open CodeSandbox
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setShowSandbox(false);
                        }}
                        sx={{ fontSize: 15, ml: 8 }}>
                        Close CodeSandbox
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>

          {showSandbox && (
            <Grid item mb={5}>
              <Codesandbox
                // codesandbox
                appJsWork={sandboxCode}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Collection;
