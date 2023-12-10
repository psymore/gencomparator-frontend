import {
  Autocomplete,
  Card,
  CardContent,
  Dialog,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CustomizedAutocomplete from "../utils/CustomizedAutocomplete";

export default function PromptTemplates() {
  const PromptCards = ({ title, explanation, openSelection }) => {
    return (
      <Card
        sx={{
          backgroundColor: "white",
          width: "200px",
          ml: 3,
          cursor: "pointer",
        }}
        onClick={openSelection}>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontSize: 20, color: "black" }}>
            {title}
          </Typography>

          <Typography
            variant="body2"
            sx={{ fontSize: 18, color: "black", mt: 1.5 }}>
            {explanation}
          </Typography>
        </CardContent>
      </Card>
    );
  };
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const credentials = [`"Username"`, `"Email"`];

  const handleDialogOpen = index => {
    setSelectedCard(index);
    setDialogOpen(true);
    console.log(index);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Grid container spacing={0}>
      {dialogOpen && (
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          {selectedCard !== null && (
            <Grid container spacing={2} sx={{ p: 3 }}>
              <Grid item xs={12} sx={{ p: "" }}>
                {selectedCard.title}
                <br />
                <br />
                {selectedCard.explanation}
                <br />
                <br />
                <CustomizedAutocomplete />
              </Grid>
            </Grid>
          )}
        </Dialog>
      )}
      <Grid item xs={1}></Grid>
      <Grid item xs={10} sx={{ display: "flex" }}>
        <PromptCards
          title={"Login-Register Page"}
          explanation={"A switchable login and register page in one function."}
          openSelection={() =>
            handleDialogOpen({
              title: "Login-Register Page",
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
              title: "Login-Register Page",
              explanation:
                "A switchable login and register page in one function.",
            })
          }
        />
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
}
