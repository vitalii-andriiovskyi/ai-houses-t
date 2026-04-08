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
          routerLink: 'pages/home-page',
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
