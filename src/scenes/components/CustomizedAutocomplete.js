import { Autocomplete, Grid, TextField } from "@mui/material";

export default function CustomizedAutocomplete({
  title,
  placeholder,
  mt,
  field,
  setField,
}) {
  const credentials = ["Username", "Email", "Password", "Password Again"];

  return (
    <Grid item xs={12} mt={mt}>
      <Autocomplete
        freeSolo
        onChange={setField}
        multiple
        id="tags-outlined"
        options={credentials}
        // filterSelectedOptions
        renderInput={params => (
          <TextField
            {...params}
            value={field}
            variant="outlined"
            label={title}
            placeholder={placeholder}
          />
        )}
      />
    </Grid>
  );
}
