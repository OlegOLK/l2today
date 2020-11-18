/**
 * Asynchronously loads the component for Navbar
 */

import { lazyLoad } from 'utils/loadable';

export const BannerComponent = lazyLoad(
  () => import('./index'),
  module => module.Banner,
);
