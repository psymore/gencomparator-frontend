import {
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
import CustomizedAutocomplete from "../components/CustomizedAutocomplete";

export default function PromptTemplates() {
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [apiDialog, setApiDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [field, setField] = useState("");
  console.log(field);
  console.log(title);
  const navigate = useNavigate();

  const handleTitle = e => {
    setTitle(e.target.value);
  };
  const handleField = e => {
    setField(e.target.value);
  };

  const handleDialogOpen = index => {
    setSelectedCard(index);
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleApiDialogOpen = () => {
    setApiDialog(true);
  };
  const handleApiDialogClose = () => {
    setApiDialog(false);
  };

  const handleCreatePrompt = async e => {
    e.preventDefault();
    navigate("/evaluation");
    try {
      const text = "How are you?";
      const api_key_id = "1";
      const response = await axios.post(
        "http://localhost:3001/prompt-template",
        { text, api_key_id }
      );
      console.log("Created prompt template:", response.data);
      navigate("/send-template");
    } catch (error) {
      console.error("Error creating prompt template:", error);
      // Handle error: Show an error message, log the error, etc.
    }
  };

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
                value={field}
                onChange={handleField}
                mt={"40px"}
                title={"You can select multiple input fields"}
                placeholder={"Select input fields"}
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
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
