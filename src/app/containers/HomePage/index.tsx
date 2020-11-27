import React from 'react';
import { Grid, Container, Box } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet-async';
import { NavbarComponent } from '../../components/Navbar/Loadable';
import { BannerComponent } from '../../components/Banner/Loadable';
import { LeftPanelComponent } from '../../components/Leftpanel/Loadable';
import { RightPanelComponent } from '../../components/Rightpanel/Loadable';

import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

export function HomePage() {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <CssBaseline />
      <BannerComponent />
      <Box mb={1}>
        <NavbarComponent title="hello" paragraph="test" />
      </Box>
      <Container maxWidth="xl">
        <Grid container className={classes.root} spacing={2}>
          <LeftPanelComponent />
          <RightPanelComponent />
        </Grid>
      </Container>
    </>
  );
}
