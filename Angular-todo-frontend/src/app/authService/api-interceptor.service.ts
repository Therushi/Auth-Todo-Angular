import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const apiUrl = `http://localhost:3500${request.url}`;
    request = request.clone({
      url: apiUrl,
      setHeaders: {
        'Content-Security-Policy': `frame-ancestors ${environment.security.allowedOrigins}`,
        'X-Frame-Options': `ALLOW-FROM ${environment.security.allowedOrigins}`,
        'X-XSS-Protection': '1; mode=block',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return next.handle(request);
  }
}
