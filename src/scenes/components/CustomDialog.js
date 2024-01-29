import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DoneIcon from "@mui/icons-material/Done";
import { Button, Dialog, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CustomDialog({
  open,
  onClose,
  title,
  text,
  success,
  nav,
  pageName,
}) {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onClose={onClose}>
      <Grid item xs={12} p={3}>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            fontWeight: "600",
            fontSize: 20,
          }}>
          {title}
          {success === true ? (
            <DoneIcon
              sx={{
                mb: 0.5,
                ml: 0.5,
              }}
            />
          ) : (
            <CancelOutlinedIcon
              sx={{
                mb: 0.5,
                ml: 0.5,
              }}
            />
          )}
        </Typography>
        <Typography
          sx={{
            mt: 1,
            fontSize: 17.8,
            textAlign: "justify",
          }}>
          {text}.
        </Typography>
        {!nav ? (
          <>
            <Typography
              sx={{
                mt: 3,
                fontSize: 14,
                textAlign: "justify",
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
              }}>
              -- Click outside of this message to close. --
            </Typography>
          </>
        ) : (
          <></>
        )}
        {nav ? (
          <Button
            sx={{
              height: "40px",
              mt: 2,
              fontSize: 18,
            }}
            onClick={() => navigate(nav)}>
            {pageName}{" "}
          </Button>
        ) : (
          <></>
        )}
      </Grid>
    </Dialog>
  );
}
