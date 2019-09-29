import { Route } from '@angular/router';

import { MenuofVendorComponent } from './';

export const MENUOFVENDOR_ROUTE: Route = {
  path: 'listmenu/:name',
  component: MenuofVendorComponent,
  data: {
    authorities: [],
    pageTitle: 'Welcome, Java Hipster!'
  }
};
