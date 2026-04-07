import { Component, inject, OnInit, signal } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AsyncPipe } from '@angular/common';

import { Spinner } from '@fe/shared';
import { User } from '@fe/user';
import { AuthStore } from '@fe/auth';

@Component({
  selector: 'lib-menu-dropdown',
  imports: [MenuModule, Avatar, ButtonModule, Spinner, AsyncPipe],
  templateUrl: './menu-dropdown.html',
  styleUrl: './menu-dropdown.css',
})
export class MenuDropdown implements OnInit {
  items: MenuItem[] | undefined;
  private _authStore = inject(AuthStore);
  isLoading = this._authStore.isLoading;
  user$ = this._authStore.user$;

  ngOnInit(): void {
    this.items = [
      {
        label: 'My Pawsy Times',
        icon: '🐾',
        routerLink: '/dashboard/pawsy-times',
      },
      {
        label: 'Create AI House',
        icon: '🏠',
        routerLink: '/dashboard/create-ai-house',
      },
      {
        label: 'Sign Out',
        iconClass: 'pi pi-sign-out',
        spinner: this.isLoading(),
        command: (e: MenuItemCommandEvent) => {
          this.signOut();
          e.originalEvent?.preventDefault();
          e.originalEvent?.stopPropagation();
        },
      },
    ];
  }

  signOut() {
    this._authStore.signOut();
  }

  getInitials = (user: User) => {
    return `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase();
  };
}
