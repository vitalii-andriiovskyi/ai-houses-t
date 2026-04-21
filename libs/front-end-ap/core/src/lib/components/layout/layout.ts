import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { AuthStore } from '@fe/auth';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Sidebar } from '../sidebar/sidebar';
import { GlobalToast } from '../global-toast/global-toast';

@Component({
  selector: 'lib-layout',
  imports: [RouterModule, Header, Footer, Sidebar, GlobalToast],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  private _authStore = inject(AuthStore);
  user = toSignal(this._authStore.user$);
}
