import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { AuthStore } from '@fe/auth';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'lib-layout',
  imports: [RouterModule, AsyncPipe, Header, Footer, Sidebar],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  private _authStore = inject(AuthStore);
  user = toSignal(this._authStore.user$);
}
