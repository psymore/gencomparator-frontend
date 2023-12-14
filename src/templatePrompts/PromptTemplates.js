import {
  Button,
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
              <TextField label={"Write a page title here"} />

              <CustomizedAutocomplete
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
            <Button sx={{ width: "150px", fontSize: 14, mb: 3 }}>
              Create Prompts
            </Button>
          </Grid>
        </Dialog>
      )}

      <Grid item xs={1}></Grid>
      <Grid item xs={10} mt={5}>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Typography
              sx={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
              Select any Template and you can customize them
            </Typography>
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
