import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

import { LocalStorageService } from '../../services/local-storage/local-storage';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  const localStorage = inject(LocalStorageService);
  const idToken = localStorage.getItem('id_token');
  if (idToken) {
    const cloned = req.clone({
      headers: req.headers.append('Authorization', 'Bearer ' + idToken),
    });

    return next(cloned);
  } else {
    return next(req);
  }
}
