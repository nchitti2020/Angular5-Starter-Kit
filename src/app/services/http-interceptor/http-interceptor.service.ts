//import { Injectable } from '@angular/core';
//import {
//    HttpRequest,
//    HttpHandler,
//    HttpEvent,
//    HttpInterceptor,//    HttpErrorResponse,
//    HttpHeaders
//} from '@angular/common/http';
////import { GlobalService } from './global.service';
//import { Observable } from 'rxjs/Observable';
////import { LoaderService } from "./loader.service";
////import { ConfigService } from "./config.service";

//@Injectable()
//export class HttpRequestInterceptor implements HttpInterceptor {
//    constructor(
//        //public globalService: GlobalService,
//        //private loaderService: LoaderService,
//        //private configService: ConfigService
//    ) { }

//    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//        //Activate spinner
//        if (this.configService.spinnerEnabled) {
//            this.loaderService.increment();
//        }

//        //HttpHeaders are immutable. We need to reassign the variable otherwise the value of the variable does not change
//        let headers = request.headers;
//        if (headers && !headers.has('x-access-token')) {
//            headers = new HttpHeaders({
//                'Accept': 'application/json',
//                'Content-Type': 'application/json',
//                'x-access-token': `${window.sessionStorage.getItem('JWT')}`,
//                'x-access-user': `${window.sessionStorage.getItem('userName')}`
//            });
//        }

//        request = request.clone({ headers });
//        return next
//            .handle(request)
//            .catch(event => {
//                if (event instanceof HttpErrorResponse) {
//                    const response = event as HttpErrorResponse;
//                    if (response && response.headers && response.headers.get('content-type') &&
//                        (response.headers.get('content-type').toLowerCase() === 'application/json' ||
//                            response.headers.get('content-type').toLowerCase() === 'application/pdf')) {
//                        let errorResponse: HttpErrorResponse = new HttpErrorResponse({
//                            error: JSON.parse(response.error),
//                            headers: response.headers,
//                            status: response.status,
//                            statusText: response.statusText,
//                            url: response.url,
//                        });

//                        return Observable.throw(errorResponse);
//                    }
//                }
//                return Observable.throw(event);
//            })
//            .finally(() => {
//                if (this.configService.spinnerEnabled) {
//                    this.loaderService.decrement();
//                }
//            });

//    }
//}