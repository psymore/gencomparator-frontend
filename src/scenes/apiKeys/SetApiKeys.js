import { Grid } from "@mui/material";
import ApiKeysDialog from "../components/ApiKeysDialog.js";

export default function SetApiKeys() {
  return (
    <Grid item xs={12}>
      <ApiKeysDialog open={true} direct />
    </Grid>
  );
}
