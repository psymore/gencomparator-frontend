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
import { useEffect, useState } from "react";
import { getKey } from "../../services/apiKeyService.js";
import { createAndSendPrompt } from "../../services/promptService.js";
import { getPromptTemplateList } from "../../services/promptTemplateService.js";
import ApiKeysDialog from "../components/ApiKeysDialog";
import CustomDialog from "../components/CustomDialog.js";
import CustomizedAutocomplete from "../components/CustomizedAutocomplete.js";
import { useNavigate } from "react-router-dom";
import { logoutAsync } from "../../services/userService.js";
import Codesandbox from "../sandboxes/Codesandbox.js";

export default function PromptTemplates() {
  const [parameterDialogOpen, setParameterDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [apiDialog, setApiDialog] = useState(false);
  const [isError, setIsError] = useState(true);
  const [muiActive, setMuiActive] = useState(true); //for styling of buttons
  const [title, setTitle] = useState("");
  const [titleExists, setTitleExists] = useState(false);
  const [fields, setFields] = useState([]);
  const [style, setStyle] = useState({ mui: true, css: false });
  const [foundApiKeys, setFoundApiKeys] = useState(false);
  const [promptTemplates, setPromptTemplates] = useState([]);
  const [openDialogSuccess, setOpenDialogSuccess] = useState(false);

  const navigate = useNavigate();

  const [successDialogContent, setSuccessDialogContent] = useState({
    title: "",
    text: "",
    success: false,
  });

  const handleCloseSuccess = () => {
    setOpenDialogSuccess(false);
  };

  const handleMuiClick = () => {
    setMuiActive(true);
    setStyle({ mui: true, css: false });
  };

  const handleCssClick = () => {
    setMuiActive(false);
    setStyle({ css: true, mui: false });
  };

  const handleTitle = e => {
    const value = e.target.value;
    setTitle(value);
    setTitleExists(value !== "");
  };
  const handleFieldChange = (_, value) => {
    setFields(value);
    setIsError(value.length === 0 ? true : false);
  };

  const handleParameterDialogOpen = (index, counter) => {
    setSelectedCard(index);
    setSelectedCardIndex(counter);
    setIsError(fields.length === 0);
    setParameterDialogOpen(true);
  };

  const handleParameterDialogClose = () => {
    setParameterDialogOpen(false);
  };

  const handleApiDialogOpen = () => {
    setApiDialog(true);
  };

  const handleApiDialogClose = () => {
    setApiDialog(false);
  };

  const parameters = () => {
    const data = {
      promptTemplateId: promptTemplates[selectedCardIndex]?.id,
      title: title,
      titleExists: titleExists,
      style: style,
      fields: fields,
    };
    return data;
  };

  const handleCreatePrompt = async e => {
    e.preventDefault();

    const requestParameters = parameters();

    if (!foundApiKeys) {
      setSuccessDialogContent({
        title: "No API key found",
        text: "Enter API Keys for generating code",
        success: false,
      });
      setOpenDialogSuccess(true);

      return;
    }

    try {
      if (!isError) {
        const response = await createAndSendPrompt(requestParameters);
        console.log(response);
      }

      setSuccessDialogContent({
        title: "Success Sending Prompt",
        text: "Prompt Sent to LLMs",
        success: true,
      });
      setOpenDialogSuccess(true);
    } catch (error) {
      setSuccessDialogContent({
        title: "No API key found",
        text: "Enter API Keys for generating code",
        success: false,
      });
      setOpenDialogSuccess(true);
      console.error("Error creating/sending prompt:", error);
    }
  };

  useEffect(() => {
    const getPromptTemplates = async () => {
      try {
        const response = await getPromptTemplateList();
        setPromptTemplates(response?.data?.promptTemplates);
      } catch (error) {
        console.error("Error fetching prompt templates:", error);
      }
    };

    const getApiKeys = async () => {
      try {
        const response = await getKey();
        const apiKeys = response.data;
        console.log(apiKeys.length);
        console.log(foundApiKeys);
        setFoundApiKeys(Boolean(apiKeys.length));

        !apiKeys.length && setApiDialog(true);
        // setApiDialog(apiKeys.length === 0 ? false : true);
      } catch (error) {
        console.error("Error fetching API keys:", error);
      }
    };
    console.log(foundApiKeys);

    setIsError(true);

    getPromptTemplates();
    getApiKeys();
  }, []);

  console.log(parameters());

  console.log(foundApiKeys);

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
      <Grid
        container
        spacing={0} // You can adjust the spacing if needed
        sx={{
          mt: 5,

          display: "flex",
          justifyContent: "space-between",
        }}>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            sx={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
              marginRight: "auto",
              width: 200,
              ml: 5,
            }}
            onClick={() => handleApiDialogOpen()}>
            Insert API Keys
          </Button>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            sx={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
              mr: 5,
              width: 200,
            }}
            onClick={() => logoutAsync()}>
            Logout
          </Button>
        </Grid>
      </Grid>

      {apiDialog === true && (
        <ApiKeysDialog
          open={() => handleApiDialogOpen()}
          onClose={() => handleApiDialogClose()}
        />
      )}
      {selectedCard !== null && parameterDialogOpen && (
        <Dialog
          open={parameterDialogOpen}
          onClose={handleParameterDialogClose}
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

              <Alert sx={{ mt: 1 }} severity={isError ? "warning" : "success"}>
                {isError
                  ? "Select at least one input field"
                  : "Ready to generate code"}
              </Alert>
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
            {openDialogSuccess ? (
              <>
                <CustomDialog
                  open={openDialogSuccess}
                  onClose={handleCloseSuccess}
                  title={successDialogContent.title}
                  text={successDialogContent.text}
                  success={successDialogContent.success}
                  nav={!foundApiKeys ? "/collection" : ""}
                  pageName={!foundApiKeys ? "Go to Design Collection" : ""}
                  foundApiKeys={foundApiKeys}
                />
              </>
            ) : (
              <></>
            )}
          </Grid>
        </Dialog>
      )}

      <Grid item xs={1}></Grid>
      <Grid item xs={10} mt={5}>
        <Grid item xs={12}>
          <Grid container spacing={0}>
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
                  handleParameterDialogOpen(
                    {
                      title: template.name,
                      explanation: template.description,
                    },
                    ix
                  )
                }
              />
            ))}
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
            <Button onClick={() => navigate("/collection")}>
              {" "}
              Go to Collection
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={1}></Grid>
    </Grid>
  );
}
