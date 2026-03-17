import { Component, OnInit, signal } from '@angular/core';
import { Avatar } from "primeng/avatar";
import { MenuModule } from 'primeng/menu';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

import { Spinner } from '@fe/shared';

@Component({
  selector: 'lib-menu-dropdown',
  imports: [MenuModule, Avatar, ButtonModule, Spinner],
  templateUrl: './menu-dropdown.html',
  styleUrl: './menu-dropdown.css',
})
export class MenuDropdown implements OnInit {
  items: MenuItem[] | undefined;
  isLoading = signal(false); // TODO: replace with actual loading state for sign out action
  user = signal(true); // TODO: replace with actual user data

  ngOnInit(): void {
    this.items = [
      {
        label: "My Pawsy Times",
        icon: '🐾',
        routerLink: "/dashboard/pawsy-times",
      },
      {
        label: "Create AI House",
        icon: '🏠',
        routerLink: "/dashboard/create-ai-house",
      },
      {
        label: "Sign Out",
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
    console.log('signing out...')
  }

  getInitials = () => {
    const user = {
      firstName: 'Vitalii',
      lastName: 'Andriiovskyi'
    }
    return `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase();
  }
}
