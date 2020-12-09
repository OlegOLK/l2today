import React, { FunctionComponent } from 'react';
import { Grid, Paper } from '@material-ui/core';
type AddServerFormProps = {};

export const AddServerForm: FunctionComponent<AddServerFormProps> = () => {
  return (
    <>
      <Grid container item>
        <Grid item xs={12}>
          <Paper elevation={3}>
            Server name cannot be edited after having been inserted into the
            database, so please add it correctly. Don't add rates/chronicles in
            server name.
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
