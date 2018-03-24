import { Route as ngRoute, Routes } from '@angular/router';

import { MasterComponent } from '../master/master.component';
import { AuthenticationGuard } from '../authentication/authentication.guard';

/**
 * Provides helper methods to create routes.
 */
export class Route {

  /**
   * Creates routes using the master component and authentication.
   * @param routes The routes to add.
   * @return {Route} The new route using master as the base.
   */
  static withMaster(routes: Routes): ngRoute {
    return {
      path: '',
      component: MasterComponent,
      children: routes,
      canActivate: [AuthenticationGuard],
      // Reuse MasterComponent instance when navigating between child views
      data: { reuse: true }
    };
  }

}
