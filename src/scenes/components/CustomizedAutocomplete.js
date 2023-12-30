import { Autocomplete, Grid, TextField } from "@mui/material";

export default function CustomizedAutocomplete({
  title,
  placeholder,
  mt,
  fields,
  handleFieldChange,
  isError,
}) {
  const credentials = ["Username", "Email", "Password", "Password Again"];

  return (
    <Grid item xs={12} mt={mt}>
      <Autocomplete
        freeSolo
        onChange={handleFieldChange}
        value={fields || []}
        multiple
        id="tags-outlined"
        options={credentials}
        // filterSelectedOptions
        renderInput={params => (
          <TextField
            {...params}
            error={isError}
            variant="outlined"
            label={title}
            placeholder={placeholder}
          />
        )}
      />
    </Grid>
  );
}
