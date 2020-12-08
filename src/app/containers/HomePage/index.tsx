import React from 'react';
import { Grid, Container, Box, Hidden } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import { NavBar } from '../../components/Navbar/index';
import { Banner } from '../../components/Banner/index';
import { LeftPanel } from '../../components/Leftpanel/index';
import { RightPanel } from '../../components/Rightpanel/index';
import CssBaseline from '@material-ui/core/CssBaseline';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <CssBaseline />
      <Hidden mdDown>
        <Banner />
      </Hidden>
      <Box mb={1}>
        <NavBar title="hello" paragraph="test" />
      </Box>
      <Container maxWidth="xl">
        <Grid container direction="row" justify="space-between" spacing={2}>
          <Hidden mdDown>
            <LeftPanel />
          </Hidden>
          <RightPanel />
        </Grid>
      </Container>
    </>
  );
}
