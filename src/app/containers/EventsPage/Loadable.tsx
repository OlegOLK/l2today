/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const EventsPage = lazyLoad(
  () => import('./index'),
  module => module.EventsPage,
);
