/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

// import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './containers/HomePage/index';
import { AddServerPage } from './containers/AddServerPage/index';
import { NotFoundPage } from './components/NotFoundPage/Loadable';

import { Container, Box, Hidden } from '@material-ui/core';
import { NavBar } from './components/Navbar/index';
import { Banner } from './components/Banner/index';
import CssBaseline from '@material-ui/core/CssBaseline';

export function App() {
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>
      <CssBaseline />
      <Hidden mdDown>
        <Banner />
      </Hidden>
      <Box mb={1}>
        <NavBar />
      </Box>
      <Container maxWidth="xl">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/:filterType/:filterValue" component={HomePage} />
          <Route path="/addserver" component={AddServerPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>

      {/* <GlobalStyle /> */}
    </BrowserRouter>
  );
}
