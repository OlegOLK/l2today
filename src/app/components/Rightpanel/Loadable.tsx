/**
 * Asynchronously loads the component for Navbar
 */

import { lazyLoad } from 'utils/loadable';

export const RightPanelComponent = lazyLoad(
  () => import('./index'),
  module => module.RightPanel,
);
