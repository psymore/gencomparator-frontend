import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DoneIcon from "@mui/icons-material/Done";
import { Dialog, Grid, Typography } from "@mui/material";

export default function CustomDialog({ open, onClose, title, text, success }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <Grid item xs={12} p={3}>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
          }}>
          {title}
          {success === true ? (
            <DoneIcon
              sx={{
                mb: 0.6,
                ml: 0.5,
              }}
            />
          ) : (
            <CancelOutlinedIcon
              sx={{
                mb: 0.6,
                ml: 0.5,
              }}
            />
          )}
        </Typography>
        <Typography
          sx={{
            mt: 1,
            fontSize: 15,
            textAlign: "justify",
          }}>
          {text}
        </Typography>
        <Typography
          sx={{
            mt: 3,
            fontSize: 11,
            textAlign: "justify",
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
          }}>
          -- Click outside of this message to close. --
        </Typography>
      </Grid>
    </Dialog>
  );
}
