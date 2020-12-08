/**
 * Asynchronously loads the component for Navbar
 */

import { lazyLoad } from 'utils/loadable';
// import Skeleton from '@material-ui/lab/Skeleton';

export const RightPanelComponent = lazyLoad(
  () => import('./index'),
  module => module.RightPanel,
);
/*
  {
    fallback: <div>loading...</div>, // (

    //<Skeleton variant="rect" component="div" width={'30vw'} height={'30vh'} />
    //),
  },

  */
