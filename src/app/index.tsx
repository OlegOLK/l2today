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
import { HeaderComponent } from './components/Header/header';
import { UserDashboardPage } from './containers/UserDashboard/Loadable';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useLocation } from 'react-router-dom';
import { EventsPage } from './containers/EventsPage/Loadable';
import { Footer } from './components/Footer';
import { AdvertisementPage } from './containers/AdvertisementPage/index';

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
      <Box>
        <NavBar />
      </Box>
      <Hidden mdDown>
        <Box mb={1}>
          <HeaderComponent />
        </Box>
      </Hidden>
      {/* <Hidden mdDown>
        <Banner />
      </Hidden> */}

      <Container maxWidth="xl" style={{ minHeight: '500px' }}>
        <Switch>
          <Route path="/addserver" component={AddServerPage} />
          <Route path="/dashboard" component={UserDashboardPage} />
          <Route path="/advertisement" component={AdvertisementPage} />
          <Route path="/events" component={EventsPage} />
          <Route path="/:filterType/:filterValue" component={HomePage} />
          <Route path="/" component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
      <Hidden xsDown>
        <Box mb={1}>
          <Footer />
        </Box>
      </Hidden>
    </>
  );
}
