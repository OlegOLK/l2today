/**
 * Asynchronously loads the component for Navbar
 */

import { lazyLoad } from 'utils/loadable';
// import Skeleton from '@material-ui/lab/Skeleton';
// import React from 'react';

export const LeftPanelComponent = lazyLoad(
  () => import('./index'),
  module => module.LeftPanel,
  // {
  //   fallback: (
  //     <Skeleton width={'100%'} variant="rect" component="div" height={64} />
  //   ),
  // },
);
