import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'lib-sidebar',
  imports: [PanelMenuModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  items: MenuItem[] = [
    {
      label: 'Pages',
      icon: 'pi pi-folder',
      items: [
        {
          label: 'Home Page',
          routerLink: 'pages/landing',
        },
      ],
    },
    {
      label: 'AI House',
      icon: 'pi pi-home',
      items: [
        {
          label: 'All AI Houses',
          routerLink: 'pages/ai-houses',
        },
        {
          label: 'Create AI House',
          routerLink: 'pages/ai-houses/create',
        },
      ],
    },
    {
      label: 'Vehicle',
      icon: 'pi pi-car',
      items: [
        {
          label: 'All Vehicles',
          routerLink: 'pages/vehicles',
        },
        {
          label: 'Create Vehicle',
          routerLink: 'pages/vehicles/create',
        },
      ],
    },
    {
      label: 'Files',
      icon: 'pi pi-file',
      items: [
        {
          label: 'Documents',
          icon: 'pi pi-file',
          items: [
            {
              label: 'Invoices',
              icon: 'pi pi-file-pdf',
              items: [
                {
                  label: 'Pending',
                  icon: 'pi pi-stop',
                },
                {
                  label: 'Paid',
                  icon: 'pi pi-check-circle',
                },
              ],
            },
            {
              label: 'Clients',
              icon: 'pi pi-users',
            },
          ],
        },
        {
          label: 'Images',
          icon: 'pi pi-image',
          items: [
            {
              label: 'Logos',
              icon: 'pi pi-image',
            },
          ],
        },
      ],
    },
  ];
}
