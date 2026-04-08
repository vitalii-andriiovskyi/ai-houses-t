import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Layout } from '@ap/core';

@Component({
  imports: [RouterModule, Layout],
  selector: 'ap-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'admin-panel';
}
