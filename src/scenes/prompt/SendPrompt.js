import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  getPrompts,
  getResponse,
  sendPromptToLlm,
} from "../../services/promptService";

import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const SendPrompt = ({ text, code }) => {
  const [prompts, setPrompts] = useState([]);
  const [responses, setResponses] = useState([]);
  // const [open, setOpen] = useState(true);
  const [expandedPrompt, setExpandedPrompt] = useState(null);

  // useEffect(() => {
  //   // Fetch prompts from your backend API
  //   getPrompts()
  //     .then(response => {
  //       setPrompts(response.data);
  //     })
  //     .catch(error => {
  //       console.error("Error fetching prompts:", error);
  //     });
  // }, []); // Run once on component mount

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
  };

  // const handleSendToLlm = async () => {
  //   try {
  //     const llmRequest = await sendPromptToLlm();
  //     console.log(llmRequest);
  //   } catch (error) {
  //     console.error("Error creating/sending prompt to LLM:", error);
  //   }
  // };

  console.log(prompts);
  console.log(responses);
  console.log(responses?.[expandedPrompt]);

  // const toggleDrawer = () => {
  //   setOpen(!open);
  // };
  //   return (
  //     <Grid container>
  //       <Grid item xs={3}>
  //         <Drawer
  //           variant="persistent"
  //           open={open}
  //           // onMouseOver={() => setOpen(true)}
  //           // onMouseLeave={() => setOpen(false)}
  //           // sx={{ "& .MuiDrawer-paper": { width: 300 } }}
  //         >
  //           <List>
  //             {/* <IconButton onClick={toggleDrawer}>
  //               <MenuIcon />
  //             </IconButton> */}
  //             {prompts.map((prompt, ix) => (
  //               <Grid item key={ix}>
  //                 <ListItem disablePadding>
  //                   <ListItemButton onClick={() => handleExpand(ix)}>
  //                     <ListItemText primary={`Design ${ix + 1}`} />
  //                     <ExpandMoreIcon
  //                       style={{
  //                         transform:
  //                           expandedPrompt === ix ? "rotate(180deg)" : "",
  //                       }}
  //                     />
  //                   </ListItemButton>
  //                 </ListItem>
  //                 <Collapse
  //                   in={expandedPrompt === ix}
  //                   timeout="auto"
  //                   unmountOnExit>
  //                   <Divider />
  //                   {/* <Typography variant="body2" component="div" sx={{ p: 2 }}>
  //                     {prompt}
  //                   </Typography> */}
  //                 </Collapse>
  //               </Grid>
  //             ))}
  //           </List>
  //         </Drawer>
  //       </Grid>
  //       <Grid item xs={9}>
  //         {/* Your content for the rest of the screen */}
  //         {prompts.map((prompt, ix) => (
  //           <Typography variant="body2" component="div" sx={{ p: 2 }}>
  //             {prompt}
  //           </Typography>
  //         ))}
  //       </Grid>
  //     </Grid>
  //   );
  // };

  // export default SendPrompt;

  // const testHtml = "<p>asdasd</p>";
  // console.log(testHtml);
  return (
    <Grid container>
      <Grid item xs={3}>
        <Drawer
          variant="persistent"
          open
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "black", // Change the color here
              color: "white",
            },
            "& .MuiListItemText-root": {
              color: "inherit", // Ensure button text inherits the color
            },
          }}>
          <List>
            {prompts.map((prompt, ix) => (
              <ListItem disablePadding key={ix}>
                <ListItemButton onClick={() => handleExpand(ix)}>
                  <ListItemText
                    primary={`Design ${ix + 1}`}
                    primaryTypographyProps={{ style: { color: "white" } }}
                  />
                  <ExpandMoreIcon
                    style={{
                      transform: expandedPrompt === ix ? "rotate(180deg)" : "",
                    }}
                  />
                </ListItemButton>
                {/* <Collapse
                  in={expandedPrompt === ix}
                  timeout="auto"
                  unmountOnExit>
                  <Divider />
                  <Typography variant="body2" component="div" sx={{ p: 2 }}>
                    {prompt}
                  </Typography>
                </Collapse> */}
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Grid>
      <Grid item xs={7}>
        <Grid container>
          <Grid
            item
            xs={1}
            sx={{
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
              mt: 5,
            }}>
            <Button
              sx={{ width: 150, ml: -20 }}
              // onClick={handleSendToLlm}
            >
              Send To LLMs
            </Button>
          </Grid>
          <Grid item xs={11}>
            <Typography
              component="div"
              sx={{
                mt: 5,
                textAlign: "justify",
                backgroundColor: expandedPrompt !== null ? "#343541" : "",
                p: 4,
                color: "#fdfdfd",
                border: expandedPrompt !== null ? "1px solid lightblue" : "",
                fontSize: 16,
                borderRadius: "2rem",
              }}
              dangerouslySetInnerHTML={{
                __html:
                  expandedPrompt !== null ? prompts?.[expandedPrompt] : "",
              }}>
              {/* {expandedPrompt !== null ? prompts[expandedPrompt] : ""} */}
            </Typography>
          </Grid>

          <Grid
            item
            xs={9}
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
                }}>
                <SyntaxHighlighter
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
                </SyntaxHighlighter>
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

export default SendPrompt;
