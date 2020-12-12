/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

// import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './containers/HomePage/index';
import { AddServerPage } from './containers/AddServerPage/index';
import { NotFoundPage } from './components/NotFoundPage/Loadable';

import { Container, Box, Hidden } from '@material-ui/core';
import { NavBar } from './components/Navbar/index';
import { Banner } from './components/Banner/index';
import CssBaseline from '@material-ui/core/CssBaseline';
import ReactGA from 'react-ga';

const DEFAULT_CONFIG = {
  trackingId: 'G-N4DL6EN813',
  debug: true,
  gaOptions: {
    cookieDomain: 'none',
  },
};

export function App() {
  const initReactGA = () => {
    ReactGA.initialize('G-N4DL6EN813', DEFAULT_CONFIG);
  };

  const useEffectOnMount = (effect: React.EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
  };
  useEffectOnMount(() => {
    initReactGA();
  });

  return (
    <BrowserRouter>
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
