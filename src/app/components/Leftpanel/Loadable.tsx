/**
 * Asynchronously loads the component for Navbar
 */

import { lazyLoad } from 'utils/loadable';

export const LeftPanelComponent = lazyLoad(
  () => import('./index'),
  module => module.LeftPanel,
);
