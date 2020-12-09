import React from 'react';
import { Grid } from '@material-ui/core';
//import { Helmet } from 'react-helmet-async';
import { AddServerForm } from '../../components/AddServerForm/index';

export function AddServerPage() {
  return (
    <Grid container direction="row" justify="space-between" spacing={2}>
      <AddServerForm />
    </Grid>
  );
}
