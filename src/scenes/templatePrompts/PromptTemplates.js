import {
  Alert,
  Button,
  Card,
  CardContent,
  Dialog,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiKeysDialog from "../components/ApiKeysDialog";
import CustomizedAutocomplete from "../components/CustomizedAutocomplete.js";
import { useEffect } from "react";

export default function PromptTemplates() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [apiDialog, setApiDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [fields, setFields] = useState([]);
  const [isError, setIsError] = useState(false);
  const [muiActive, setMuiActive] = useState(true);

  const navigate = useNavigate();

  const handleMuiClick = () => {
    setMuiActive(true);
  };

  const handlePlainJsClick = () => {
    setMuiActive(false);
  };

  const handleTitle = e => {
    setTitle(e.target.value);
  };
  const handleFieldChange = (_, value) => {
    setFields(value);
    setIsError(value.length > 0 ? false : true);
  };

  const handleDialogOpen = index => {
    setSelectedCard(index);
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
    setIsError(false);
  };

  const handleApiDialogOpen = () => {
    setApiDialog(true);
  };
  const handleApiDialogClose = () => {
    setApiDialog(false);
  };
  const handleCreatePrompt = async e => {
    e.preventDefault();
    try {
      if (fields.length === 0) {
        setIsError(true);

        console.log(isError);

        return;
      }
      const text = "How are you?";
      const api_key_id = "1";
      const response = await axios.post("http://localhost:3001/prompt", {
        text,
        api_key_id,
      });
      console.log("Created prompt template:", response.data);
      navigate("/send-template");
    } catch (error) {
      console.error("Error creating prompt template:", error);
      // Handle error: Show an error message, log the error, etc.
    }
  };

  const PromptCards = ({ title, explanation, openSelection }) => {
    return (
      <Card
        sx={{
          backgroundColor: "white",
          width: "200px",
          height: "200px",
          border: "1px solid black",
          ml: 3,
          cursor: "pointer",
          ":hover": {
            backgroundColor: "wheat",
          },
        }}
        onClick={openSelection}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "86%",
          }}>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontSize: 20, color: "black" }}>
            {title}
          </Typography>

          <Typography variant="body2" sx={{ fontSize: 18, color: "black" }}>
            {explanation}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  const getPromptTemplates = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/prompt-template/list"
      );
      const promptTemplates = response.data; // Accessing the prompt templates
      console.log(promptTemplates);
    } catch (error) {
      console.error("Error fetching prompt template:", error);
    }
  };

  useEffect(() => {
    getPromptTemplates();
  }, []);

  return (
    <Grid container spacing={0}>
      {apiDialog !== false && (
        <ApiKeysDialog
          open={handleApiDialogOpen}
          onClose={handleApiDialogClose}
        />
      )}
      {selectedCard !== null && dialogOpen && (
        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          sx={{
            ml: "25%",
            width: "50vw",
            maxWidth: "50vw",
          }}>
          <Grid item xs={12} p={3}>
            <Typography>{selectedCard.title}</Typography>
            <Typography sx={{ mt: 3, fontSize: 16 }}>
              {selectedCard.explanation}
            </Typography>

            <Grid item xs={12} sx={{ mt: 3 }}>
              <TextField
                label={"Write a page title here"}
                value={title}
                onChange={handleTitle}
              />

              <CustomizedAutocomplete
                fields={fields}
                isError={isError}
                handleFieldChange={handleFieldChange}
                mt={3}
                title={"You can select multiple input fields"}
                placeholder={"Select input fields"}
              />
              {isError ? (
                <Alert sx={{ mt: 1 }} severity="error">
                  Select at least one field
                </Alert>
              ) : (
                <></>
              )}
            </Grid>
            <Grid
              container
              sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
              <Grid item xs={12}>
                <Typography mb={0.2}>Styling Option</Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={handleMuiClick}
                  sx={{
                    opacity: muiActive ? 1 : 0.5,
                    backgroundColor: "#3349f1",
                    height: 40,
                    color: "white",
                    ":hover": {
                      color: "white",
                      backgroundColor: "#3399ff",
                    },
                  }}>
                  MUI
                </Button>
                <Button
                  variant="contained"
                  onClick={handlePlainJsClick}
                  sx={{
                    opacity: !muiActive ? 1 : 0.5,
                    backgroundColor: "#f0db4f",
                    color: "black",
                    height: 40,
                    ml: 2,
                    ":hover": {
                      backgroundColor: "#f0db9f",
                    },
                  }}>
                  CSS
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <Button
              sx={{ width: "150px", fontSize: 14, mb: 3 }}
              onClick={handleCreatePrompt}>
              Generate Code
            </Button>
          </Grid>
        </Dialog>
      )}

      <Grid item xs={1}></Grid>
      <Grid item xs={10} mt={5}>
        <Grid item xs={12}>
          <Grid container spacing={0}>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", flexDirection: "row-reverse" }}>
              <Button
                sx={{ fontSize: 20, fontWeight: "bold", color: "white" }}
                onClick={handleApiDialogOpen}>
                Insert API Keys
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography
                sx={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
                Select any Template and you can customize them
              </Typography>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              mt: 10,
              display: "flex",
              justifyContent: "center",
            }}>
            <PromptCards
              title={"Login-Register Page"}
              explanation={
                "A switchable login and register page in one function."
              }
              openSelection={() =>
                handleDialogOpen({
                  title: "Login-Register Input Fields",
                  explanation:
                    "A switchable login and register page in one function.",
                })
              }
            />
            <PromptCards
              title={"Album Page"}
              explanation={"An album page which includes image fields."}
              openSelection={() =>
                handleDialogOpen({
                  title: "Album Page",
                  explanation:
                    "A switchable login and register page in one function.",
                })
              }
            />
            <PromptCards
              title={"Ex3"}
              explanation={"An album page which includes image fields."}
              openSelection={() =>
                handleDialogOpen({
                  title: "Album Page",
                  explanation:
                    "A switchable login and register page in one function.",
                })
              }
            />
            <PromptCards
              title={"Ex4"}
              explanation={"An album page which includes image fields."}
              openSelection={() =>
                handleDialogOpen({
                  title: "Album Page",
                  explanation:
                    "A switchable login and register page in one function.",
                })
              }
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={1}></Grid>
    </Grid>
  );
}
