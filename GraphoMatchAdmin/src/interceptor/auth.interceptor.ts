import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const Auth: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('authToken');

  let authReq = req;
  if (token) {
    const url = req.url;
    if (!url.includes('/auth')) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  }

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        sessionStorage.removeItem('authToken');
        router.navigate(['/login']);
      } else if (error.status === 403) {
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};