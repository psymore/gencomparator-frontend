import { Button, Dialog, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { saveKey } from "../../services/userService.js";

export default function ApiKeysDialog({ open, onClose }) {
  const [apiKeys, setApiKeys] = useState({
    PalmApiKey: "",
    OpenAiApiKey: "",
    BardApiKey: "",
    CodyApiKey: "",
  });

  const handleApiKeyChange = (key, value) => {
    setApiKeys({ ...apiKeys, [key]: value });
  };

  const handleSaveKeys = async () => {
    try {
      const response = await saveKey(apiKeys);
      console.log("API keys saved:", response.data);
      // Handle success or set a success message
    } catch (error) {
      console.error("Error saving API keys:", error);
      // Handle error or show an error message
    }
  };
  const apiKeysArray = [
    { label: "PaLM API Key", key: "PalmApiKey" },
    { label: "Open AI API Key", key: "OpenAiApiKey" },
    { label: "Bard API Key", key: "BardApiKey" },
    { label: "Cody API Key", key: "CodyApiKey" },
  ];

  return (
    <Grid item xs={12}>
      <Dialog open={open} onClose={onClose}>
        <Grid item xs={12} p={3}>
          <Typography>Gencomparator Settings</Typography>
          <Typography
            sx={{ mt: 1, fontSize: 12, color: "red", textAlign: "justify" }}>
            Note: You API keys are not stored in a cookie, localStorage, or
            server. Because of this, you must set your API keys every time you
            load Gencomparator. If you prefer not to worry about it, installing
            Gencomparator locally and setting your API keys as environment
            variables is recommended.
          </Typography>

          {apiKeysArray.map(({ label, key }) => (
            <Grid item xs={12} sx={{ mt: 3 }} key={key}>
              <TextField
                fullWidth
                label={label}
                value={apiKeys[key]}
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
            type="submit"
            sx={{ width: "150px", fontSize: 14, mb: 3 }}
            onClick={handleSaveKeys}>
            Submit
          </Button>
        </Grid>
      </Dialog>
    </Grid>
  );
}
