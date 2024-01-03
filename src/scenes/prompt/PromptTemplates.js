import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Dialog,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiKeysDialog from "../components/ApiKeysDialog";
import CustomizedAutocomplete from "../components/CustomizedAutocomplete.js";
import SendPrompt from "./SendPrompt.js";

const URL = "http://localhost:3001";

export default function PromptTemplates() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [apiDialog, setApiDialog] = useState(true);
  const [isError, setIsError] = useState(false);
  const [muiActive, setMuiActive] = useState(true); //for styling of buttons
  const [title, setTitle] = useState("");
  const [titleExists, setTitleExists] = useState(false);
  const [fields, setFields] = useState([]);
  const [style, setStyle] = useState("");
  const [promptTemplates, setPromptTemplates] = useState([]);

  const navigate = useNavigate();

  const handleMuiClick = () => {
    setMuiActive(true);
    setStyle("mui");
  };

  const handleCssClick = () => {
    setMuiActive(false);
    setStyle("css");
  };

  const handleTitle = e => {
    const value = e.target.value;
    setTitle(value);
    console.log(value);
    {
      value !== "" ? setTitleExists(true) : setTitleExists(false);
    }
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

  const handleApiDialogOpen = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api-key/list");
      const apiKeys = response.data;
      console.log(apiKeys);
      // Check if apiKeys is not empty before opening the dialog
      if (apiKeys.length > 0) {
        setApiDialog(true);
      } else {
        // Handle the case where apiKeys is empty (optional)
        console.log("No API keys found.");
        // You can display a message or take other actions if needed.
      }
    } catch (error) {
      console.error("Error fetching API keys:", error);
      // Handle the error, display an error message, etc.
    }
  };

  const handleApiDialogClose = () => {
    setApiDialog(false);
  };

  const parameters = () => {
    const data = {
      title: title,
      titleExists: titleExists,
      style: style,
      fields: fields,
    };
    return data;
  };
  // console.log(parameters());
  console.log(parameters());

  const handleCreatePrompt = async e => {
    e.preventDefault();

    const requestParameters = parameters();
    try {
      const response = await axios.post(`${URL}/prompt`, requestParameters);
      console.log(response);
      <SendPrompt text={response} />;
      navigate("/send-prompt");
    } catch (error) {
      console.error("Error creating prompt:", error);
    }
  };

  useEffect(() => {
    const getPromptTemplates = async () => {
      try {
        const response = await axios.get(`${URL}/prompt-template/list`);
        setPromptTemplates(response.data.promptTemplates);
        console.log(response);
      } catch (error) {
        console.error("Error fetching prompt templates:", error);
      }
    };
    handleApiDialogOpen();
    getPromptTemplates();
  }, []);

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
              <Tooltip
                title=<Typography
                  fontSize={13}
                  sx={{ backgroundColor: "inherit", color: "white" }}>
                  You can leave this field emtpy if you do not want a custom
                  page title appear on top of your page.
                </Typography>
                placement="right"
                arrow
                enterDelay={10}
                leaveDelay={200}
                fontSize={"50px"}>
                <IconButton sx={{ ml: 0.3, mt: 0.8 }}>
                  <InfoOutlinedIcon sx={{ color: "#415ebb" }} />
                </IconButton>
              </Tooltip>

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
                  onClick={handleCssClick}
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
            {promptTemplates.map((template, ix) => (
              <PromptCards
                key={ix}
                title={template.name}
                explanation={template.description}
                openSelection={() =>
                  handleDialogOpen({
                    title: template.name,
                    explanation: template.description,
                  })
                }
              />
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={1}></Grid>
    </Grid>
  );
}
