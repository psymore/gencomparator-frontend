import { Button, Dialog, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { saveKey } from "../../services/apiKeyService.js";
import CustomDialog from "./CustomDialog.js";

export default function ApiKeysDialog({ open, onClose }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    text: "",
    success: false,
  });
  const [apiKeys, setApiKeys] = useState({
    GeminiKey: "",
    OpenAiKey: "",
    AlephAlphaKey: "",
    // CodyApiKey: "",
  });

  const handleClose = () => {
    setOpenDialog(false);
    onClose(true);
  };

  const handleApiKeyChange = (key, value) => {
    setApiKeys({ ...apiKeys, [key]: value });
  };

  const handleSaveKeys = async () => {
    try {
      const response = await saveKey(apiKeys);
      console.log("API keys saved:", response.data);
      // Handle success or set a success message
      setOpenDialog(true);
      setDialogContent({
        title: "API Keys Successfully Retrieved",
        text: "They are encrypted when retrieved but you can also delete them whenever you want.",
        success: true,
      });
    } catch (error) {
      console.log(error);
      console.error("Error saving API keys:", error);
      setOpenDialog(true);
      setDialogContent({
        title: "Error when saving API Keys",
        text: "Please try again later",
        success: false,
      });
      // Handle error or show an error message
    }
  };
  const apiKeysArray = [
    { label: "Gemini API Key", key: "GeminiKey" },
    { label: "Open AI API Key", key: "OpenAiKey" },
    { label: "Aleph Alpha API Key", key: "AlephAlphaKey" },
    // { label: "Cody API Key", key: "CodyApiKey" },
  ];

  const countEnteredKeys = Object.values(apiKeys).filter(
    key => key !== ""
  ).length;
  const minimumKeysRequired = 1;
  const hasAtLeastTwoKeys = countEnteredKeys >= minimumKeysRequired;

  return (
    <Grid item xs={12}>
      <Dialog open={open} onClose={onClose}>
        {openDialog ? (
          <CustomDialog
            open={openDialog}
            onClose={handleClose}
            title={dialogContent.title}
            text={dialogContent.text}
            success={dialogContent.success}
          />
        ) : (
          <></>
        )}
        <Grid item xs={12} p={3}>
          <Typography>Gencomparator Settings</Typography>
          <Typography
            sx={{ mt: 1, fontSize: 12, color: "red", textAlign: "justify" }}>
            Note: You API keys are stored with a robust encryption. If you
            prefer not to worry about it, installing Gencomparator locally and
            setting your API keys as environment variables is recommended.
          </Typography>

          {apiKeysArray.map(({ label, key }) => (
            <Grid item xs={12} sx={{ mt: 3 }} key={key}>
              <TextField
                fullWidth
                label={label}
                value={apiKeys?.[key] ?? ""}
                onChange={e => handleApiKeyChange(key, e.target.value)}
              />
            </Grid>
          ))}
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Button
            disabled={!hasAtLeastTwoKeys}
            sx={{
              width: "150px",
              fontSize: 14,
              mb: 3,
              backgroundColor: !hasAtLeastTwoKeys ? "whitesmoke" : "",
            }}
            onClick={handleSaveKeys}>
            Submit
          </Button>
        </Grid>
      </Dialog>
    </Grid>
  );
}
