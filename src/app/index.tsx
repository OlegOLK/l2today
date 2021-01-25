/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

// import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './containers/HomePage/index';
import { AddServerPage } from './containers/AddServerPage/index';
import { NotFoundPage } from './components/NotFoundPage/Loadable';

import { Container, Box, Hidden } from '@material-ui/core';
import { NavBar } from './components/Navbar/index';
import { Banner } from './components/Banner/index';
import { UserDashboardPage } from './containers/UserDashboard/Loadable';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useLocation } from 'react-router-dom';
import { Dashboard } from '@material-ui/icons';
import { EventsPage } from './containers/EventsPage/Loadable';
import { Footer } from './components/Footer';

declare global {
  interface Window {
    gtag: any;
    ga: any;
  }
}

export function App() {
  let { pathname } = useLocation();
  const useEffectOnRouteChange = (effect: React.EffectCallback) => {
    useEffect(effect, [effect, pathname]);
  };
  useEffectOnRouteChange(() => {
    if (!pathname) return;
    if (!window.ga) return;
    window.ga('send', 'pageview', pathname);
  });
  return (
    <>
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
          <Route path="/dashboard" component={UserDashboardPage} />
          <Route path="/events" component={EventsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
      <Box mb={1}>
        <Footer />
      </Box>
    </>
  );
}
