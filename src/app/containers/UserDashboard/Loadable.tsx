/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const UserDashboardPage = lazyLoad(
  () => import('./index'),
  module => module.UserDashboardPage,
);
