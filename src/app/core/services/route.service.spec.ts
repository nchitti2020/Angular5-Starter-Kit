import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from '../authentication/authentication.service';
import { MockAuthenticationService } from '../authentication/authentication.service.mock';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { MasterComponent } from '../master/master.component';
import { Route } from './route.service';

describe('Route', () => {
  let route: Route;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationGuard,
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        Route
      ]
    });
  });

  beforeEach(inject([Route], (_route: Route) => {
    route = _route;
  }));

  describe('withMaster', () => {
    it('should create routes as children of master', () => {
      // Prepare
      const testRoutes = [{ path: 'test' }];

      // Act
      const result = Route.withMaster(testRoutes);

      // Assert
      expect(result.path).toBe('');
      expect(result.children).toBe(testRoutes);
      expect(result.component).toBe(MasterComponent);
    });
  });
});
