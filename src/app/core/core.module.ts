import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MasterComponent } from './master/master.component';
import { AccountMenuComponent } from './master/account-menu/account-menu.component';
import { SideNavBarComponent } from './master/side-navbar/side-navbar.component';
import { TopNavBarComponent } from './master/top-navbar/top-navbar.component';
import { HeaderComponent } from '@app/core/master/header';
import { FooterComponent } from '@app/core/master/footer';

// Note: Do not use ./ path (ie.,  index.ts) as it will create circular dependency issue
import { RouteReusableStrategy } from './route-reusable-strategy';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { I18nService } from './services/i18n.service';
import { HttpService } from './http/http.service';
import { HttpCacheService } from './http/http-cache.service';
import { ApiPrefixInterceptor } from './http/api-prefix.interceptor';
import { ErrorHandlerInterceptor } from './http/error-handler.interceptor';
import { CacheInterceptor } from './http/cache.interceptor';
import { UserRepositoryService } from './services/user-repository.service';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        TranslateModule,
        NgbModule
    ],
    declarations: [
        TopNavBarComponent,
        SideNavBarComponent,
        AccountMenuComponent,
        HeaderComponent,
        FooterComponent,
        MasterComponent
    ],
    providers: [
        UserRepositoryService,
        AuthenticationService,
        AuthenticationGuard,
        I18nService,
        HttpCacheService,
        ApiPrefixInterceptor,
        ErrorHandlerInterceptor,
        CacheInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiPrefixInterceptor,
          multi: true
        },
        {
          provide: HttpClient,
          useClass: HttpService
        },
        {
          provide: RouteReuseStrategy,
          useClass: RouteReusableStrategy
        }
    ]
})
export class CoreModule { }
